const db = require("../models/fetchModel");
const { Order, asset, User, Portofolio } = db;
const { Op } = require("sequelize");

const axios = require("axios");

const buyMarket = async (req, res) => {
  try {
    const { id_user } = req.user;
    const { id_asset, total } = req.body;

    if (!total || !id_asset) {
      return res
        .status(400)
        .json({ message: "Harus isi id_asset dan total (USD)" });
    }

    const user = await User.findOne({ where: { id_user } });
    if (!user) {
      return res.status(400).json({ message: "User tidak ditemukan" });
    }
    if ((parseFloat(user.saldo) ?? 0) < parseFloat(total)) {
      return res.status(400).json({ message: "Saldo tidak cukup" });
    }

    const normalizedIdAsset = id_asset.toLowerCase();

    // Cek asset slot jika user subscription Free
    if (user.subscription === "Free") {
      // Hitung asset yang user sudah miliki di portfolio
      const userAssetCount = await Portofolio.count({
        where: {
          id_user,
          jumlah: { [Op.gt]: 0 },
        },
      });

      // Cek apakah user sudah memiliki aset ini
      const existingAsset = await Portofolio.findOne({
        where: { id_user, id_asset: normalizedIdAsset },
      });

      // Jika user belum punya aset ini dan jumlah aset sudah mencapai limit
      if (!existingAsset && userAssetCount >= user.asset_slot) {
        return res.status(400).json({
          message: `Subscription Free hanya bisa memiliki ${user.asset_slot} jenis aset. Upgrade ke Pro untuk slot tidak terbatas.`,
        });
      }
    }

    let assetData = await asset.findOne({
      where: { id_asset: normalizedIdAsset, is_deleted: false },
    });
    if (!assetData) {
      return res
        .status(404)
        .json({ message: "Asset tidak ditemukan di database" });
    }

    const sellOrders = await Order.findAll({
      where: {
        id_asset: normalizedIdAsset,
        type: "limit",
        side: "sell",
        status: { [Op.in]: ["open", "partial"] },
        user_id: { [Op.ne]: id_user },
      },
      order: [
        ["price", "ASC"],
        ["created_at", "ASC"],
      ],
    });

    if (!sellOrders.length) {
      return res
        .status(404)
        .json({
          message: "Tidak ada sell order yang tersedia di market saat ini",
        });
    }

    let remainingUSD = parseFloat(total);
    let totalBought = 0;
    let totalSpent = 0;
    const priceDetails = [];

    for (const sellOrder of sellOrders) {
      if (remainingUSD <= 0) break;

      const remainingSellAmount = sellOrder.amount - sellOrder.filled_amount;
      const price = sellOrder.price;
      const maxBuyableAtThisLevel = parseFloat(
        (remainingUSD / price).toFixed(8)
      );

      const amountMatched = Math.min(
        remainingSellAmount,
        maxBuyableAtThisLevel
      );
      const cost = parseFloat((amountMatched * price).toFixed(2));

      if (amountMatched <= 0) continue;

      sellOrder.filled_amount += amountMatched;
      sellOrder.status =
        sellOrder.filled_amount >= sellOrder.amount ? "filled" : "partial";
      await sellOrder.save();

      const seller = await User.findOne({
        where: { id_user: sellOrder.user_id },
      });
      if (seller) {
        seller.saldo = (parseFloat(seller.saldo) || 0) + cost;
        await seller.save();
      }

      const sellerPortfolio = await Portofolio.findOne({
        where: { id_user: sellOrder.user_id, id_asset: normalizedIdAsset },
      });

      if (sellerPortfolio) {
        sellerPortfolio.jumlah -= amountMatched;
        if (sellerPortfolio.jumlah < 0) sellerPortfolio.jumlah = 0; // safety
        await sellerPortfolio.save();
      }

      priceDetails.push({ price, amount: amountMatched });

      totalBought += amountMatched;
      totalSpent += cost;
      remainingUSD -= cost;
    }

    if (totalBought === 0) {
      return res
        .status(400)
        .json({
          message:
            "Tidak ada koin yang tersedia untuk dibeli di market saat ini",
        });
    }

    if (parseFloat(user.saldo) < totalSpent) {
      return res
        .status(400)
        .json({ message: "Saldo tidak cukup setelah proses matching order" });
    }
    user.saldo = parseFloat(user.saldo) - totalSpent;
    await user.save();

    await Order.create({
      user_id: id_user,
      id_asset: normalizedIdAsset,
      side: "buy",
      type: "market",
      price: priceDetails[0].price,
      amount: totalBought,
      total: totalSpent,
      status: totalSpent < total ? "partial" : "filled",
    });

    let portfolio = await Portofolio.findOne({
      where: { id_user, id_asset: normalizedIdAsset },
    });

    if (!portfolio) {
      portfolio = await Portofolio.create({
        id_user,
        id_asset: normalizedIdAsset,
        avg_price: totalSpent / totalBought,
        jumlah: totalBought,
      });
    } else {
      const oldTotalAmount = portfolio.jumlah || 0;
      const oldAvgPrice = portfolio.avg_price || 0;

      const newTotalAmount = oldTotalAmount + totalBought;
      const newAvgPrice =
        (oldAvgPrice * oldTotalAmount + totalSpent) / newTotalAmount;

      portfolio.avg_price = newAvgPrice;
      portfolio.jumlah = newTotalAmount;
      await portfolio.save();
    }

    assetData.price = priceDetails[0].price;
    await assetData.save();

    const message =
      totalSpent < total
        ? `Order partial: hanya berhasil membeli ${totalBought} ${normalizedIdAsset} senilai $${totalSpent}. Sisa saldo $${(
            total - totalSpent
          ).toFixed(2)} akan dikembalikan ke portfolio.`
        : "Buy market berhasil";

    return res.status(200).json({
      message,
      amount_bought: totalBought,
      total_spent: totalSpent,
      details: priceDetails,
    });
  } catch (err) {
    console.error("Error di buyMarket:", err);
    return res.status(500).json({ message: err.message });
  }
};

const buyLimit = async (req, res) => {
  try {
    const { id_user } = req.user;
    const { id_asset, price, total, amount } = req.body;

    if (!id_asset || !price || (!total && !amount)) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const normalizedIdAsset = id_asset.toLowerCase();

    // Cek asset slot jika user bersubscription Free
    const user = await User.findOne({ where: { id_user } });
    if (user.subscription === "Free") {
      // Hitung asset yang user sudah miliki di portfolio
      const userAssetCount = await Portofolio.count({
        where: {
          id_user,
          jumlah: { [Op.gt]: 0 },
        },
      });

      // Cek apakah user sudah memiliki aset ini
      const existingAsset = await Portofolio.findOne({
        where: { id_user, id_asset: normalizedIdAsset },
      });

      // Jika user belum punya aset ini dan jumlah aset sudah mencapai limit
      if (!existingAsset && userAssetCount >= user.asset_slot) {
        return res.status(400).json({
          message: `Subscription Free hanya bisa memiliki ${user.asset_slot} jenis aset. Upgrade ke Pro untuk slot tidak terbatas.`,
        });
      }
    }

    const assetData = await asset.findOne({
      where: { id_asset: normalizedIdAsset, is_deleted: false },
    });
    if (!assetData) {
      return res
        .status(404)
        .json({ message: "Asset tidak ditemukan di database" });
    }

    let finalAmount = amount;
    let finalTotal = total;

    if (!amount) {
      finalAmount = parseFloat((total / price).toFixed(8));
    } else if (!total) {
      finalTotal = parseFloat((amount * price).toFixed(2));
    }

    await Order.create({
      user_id: id_user,
      id_asset: normalizedIdAsset,
      side: "buy",
      type: "limit",
      price,
      amount: finalAmount,
      total: finalTotal,
      status: "open",
    });

    return res.status(201).json({
      message: "Buy limit order dibuat",
      price,
      amount: finalAmount,
      total: finalTotal,
    });
  } catch (err) {
    console.error("Error di buyLimit:", err);
    return res.status(500).json({ message: err.message });
  }
};

const sellMarket = async (req, res) => {
  try {
    const { id_user } = req.user;
    const { id_asset, amount: amountToSellRequested } = req.body;

    if (!id_asset || !amountToSellRequested || amountToSellRequested <= 0) {
      return res
        .status(400)
        .json({ message: "Harus isi id_asset dan amount (coin) lebih dari 0" });
    }

    const normalizedIdAsset = id_asset.toLowerCase();

    let assetData = await asset.findOne({
      where: { id_asset: normalizedIdAsset, is_deleted: false },
    });

    if (!assetData) {
      return res
        .status(404)
        .json({ message: "Asset tidak ditemukan di database" });
    }

    const sellerPortfolio = await Portofolio.findOne({
      where: { id_user, id_asset: normalizedIdAsset },
    });

    if (
      !sellerPortfolio ||
      (sellerPortfolio.jumlah ?? 0) < amountToSellRequested
    ) {
      return res
        .status(400)
        .json({
          message: "Jumlah koin di portofolio tidak mencukupi untuk dijual",
        });
    }

    let remainingToSell = parseFloat(amountToSellRequested);
    let totalSold = 0;
    let totalEarned = 0;
    const priceLevels = [];

    const buyOrders = await Order.findAll({
      where: {
        id_asset: normalizedIdAsset,
        type: "limit",
        side: "buy",
        status: { [Op.in]: ["open", "partial"] },
        user_id: { [Op.ne]: id_user },
      },
      order: [
        ["price", "DESC"],
        ["created_at", "ASC"],
      ],
    });

    if (!buyOrders.length) {
      return res
        .status(404)
        .json({ message: "Tidak ada buy order yang cocok" });
    }

    for (const buyOrder of buyOrders) {
      if (remainingToSell <= 0) break;

      const remainingBuyAmount = buyOrder.amount - buyOrder.filled_amount;
      if (remainingBuyAmount <= 0) continue;

      const amountMatched = Math.min(remainingToSell, remainingBuyAmount);
      const price = buyOrder.price;
      const earned = parseFloat((amountMatched * price).toFixed(2));

      buyOrder.filled_amount += amountMatched;
      buyOrder.status =
        buyOrder.filled_amount >= buyOrder.amount ? "filled" : "partial";
      await buyOrder.save();

      const buyer = await User.findOne({
        where: { id_user: buyOrder.user_id },
      });
      if (buyer) {
        const buyerBalance = parseFloat(buyer.saldo ?? 0); // parsing saldo ke float

        if (buyerBalance < earned) {
          return res
            .status(400)
            .json({
              message: `Saldo user ${buyOrder.user_id} tidak cukup saat matching`,
            });
        }

        buyer.saldo = buyerBalance - earned;
        await buyer.save();

        let buyerPortfolio = await Portofolio.findOne({
          where: { id_user: buyOrder.user_id, id_asset: normalizedIdAsset },
        });

        if (!buyerPortfolio) {
          await Portofolio.create({
            id_user: buyOrder.user_id,
            id_asset: normalizedIdAsset,
            jumlah: amountMatched,
            avg_price: price,
          });
        } else {
          const oldAmount = buyerPortfolio.jumlah ?? 0;
          const oldAvg = buyerPortfolio.avg_price ?? 0;
          const newTotal = oldAmount + amountMatched;
          const newAvg =
            (oldAvg * oldAmount + amountMatched * price) / newTotal;

          buyerPortfolio.jumlah = newTotal;
          buyerPortfolio.avg_price = newAvg;
          await buyerPortfolio.save();
        }
      }

      priceLevels.push({ price, amount: amountMatched });
      totalSold += amountMatched;
      totalEarned += earned;
      remainingToSell -= amountMatched;
    }

    if (totalSold === 0) {
      return res
        .status(400)
        .json({ message: "Tidak ada buy order yang cukup untuk menjual koin" });
    }

    await Order.create({
      user_id: id_user,
      id_asset: normalizedIdAsset,
      side: "sell",
      type: "market",
      price: priceLevels[0].price,
      amount: totalSold,
      total: totalEarned,
      status: totalSold < amountToSellRequested ? "partial" : "filled",
    });

    sellerPortfolio.jumlah -= totalSold;
    await sellerPortfolio.save();

    const seller = await User.findOne({ where: { id_user } });
    if (seller) {
      const currentBalance = parseFloat(seller.saldo ?? 0);
      seller.saldo = currentBalance + totalEarned;
      await seller.save();
    }

    if (assetData) {
      assetData.price = priceLevels[0].price;
      await assetData.save();
    }

    const isPartial = totalSold < amountToSellRequested;
    const message = isPartial
      ? `Order partial: hanya berhasil menjual ${totalSold} dari ${amountToSellRequested} koin. Sisa ${
          amountToSellRequested - totalSold
        } koin tetap di portofolio.`
      : "Sell market berhasil";

    return res.status(200).json({
      message,
      total_sold: totalSold,
      total_earned: totalEarned,
      details: priceLevels,
    });
  } catch (err) {
    console.error("Error di sellMarket:", err);
    return res.status(500).json({ message: err.message });
  }
};

const sellLimit = async (req, res) => {
  try {
    const { id_user } = req.user;
    const { id_asset, price, amount, total } = req.body;

    if (!id_asset || !price || (!amount && !total)) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    let finalAmount = amount;
    let finalTotal = total;

    if (!amount) {
      finalAmount = parseFloat((total / price).toFixed(8));
    } else if (!total) {
      finalTotal = parseFloat((amount * price).toFixed(2));
    }

    const portfolio = await Portofolio.findOne({
      where: { id_user, id_asset },
    });

    if (!portfolio || (portfolio.jumlah ?? 0) < finalAmount) {
      return res
        .status(400)
        .json({
          message:
            "Jumlah koin tidak tersedia di portofolio atau tidak mencukupi untuk menjual",
        });
    }

    await Order.create({
      user_id: id_user,
      id_asset,
      side: "sell",
      type: "limit",
      price,
      amount: finalAmount,
      total: finalTotal,
      status: "open",
    });

    return res
      .status(201)
      .json({ message: "Sell limit order dibuat", price, amount: finalAmount });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const { id_user } = req.user;

    const historyOrders = await Order.findAll({
      where: {
        user_id: id_user,
        [Op.or]: [
          {
            type: "limit",
            status: "filled",
          },
          {
            type: "market",
            status: {
              [Op.in]: ["filled", "partial"],
            },
          },
        ],
      },
      order: [["created_at", "DESC"]],
    });

    return res.status(200).json({
      message: "Riwayat order berhasil diambil",
      data: historyOrders,
    });
  } catch (err) {
    console.error("Error getOrderHistory:", err);
    return res
      .status(500)
      .json({ message: "Gagal mengambil riwayat order", error: err.message });
  }
};

const cancelLimitOrder = async (req, res) => {
  try {
    const { id_user } = req.user;
    const { order_id } = req.params;

    // Cari order milik user yang bertipe limit, status masih open/partial
    const order = await Order.findOne({
      where: {
        id: order_id,
        user_id: id_user,
        type: "limit",
        status: { [Op.in]: ["open", "partial"] },
      },
    });

    if (!order) {
      return res.status(404).json({
        message:
          "Order tidak ditemukan, bukan limit order, atau statusnya sudah tidak bisa dibatalkan",
      });
    }

    order.status = "cancelled";
    await order.save();

    return res.status(200).json({
      message: "Limit order berhasil dibatalkan",
      cancelled_order_id: order.id,
    });
  } catch (err) {
    console.error("Error saat cancelLimitOrder:", err);
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: err.message });
  }
};

module.exports = {
  buyMarket,
  buyLimit,
  sellMarket,
  sellLimit,
  getOrderHistory,
  cancelLimitOrder,
};
