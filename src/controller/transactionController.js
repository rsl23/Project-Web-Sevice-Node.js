const { Op, Sequelize } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const { User, Transaction, Portofolio } = require("../models/fetchModel");

const BuyTransaction = async (req, res) => {
  const user = req.user;
  const { id } = req.query;
  const { quantity } = req.body;
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": `${process.env.API_KEY}`,
      },
    };
    const response = await axios(url, options);
    const price = parseFloat(response.data.market_data?.current_price?.usd);
    const sumPrice = price * quantity;

    const acc = await User.findOne({
      where: { username: user.username },
    });

    console.log(acc.saldo);

    if (acc.saldo < sumPrice) {
      return res.status(400).json({
        message: "Saldo anda tidak mencukupi, silahkan topup terlebih dahulu",
      });
    }

    acc.saldo -= sumPrice;
    await acc.save();

    const transaksi = await Transaction.create({
      id_user: acc.id_user,
      id_asset: response.data.id,
      jumlah: quantity,
      harga: sumPrice,
      status: "Buy",
    });

    const existing = await Portofolio.findOne({
      where: {
        id_user: acc.id_user,
        id_asset: id,
      },
    });

    if (existing) {
      const totalJumlahLama = existing.jumlah;
      const avgLama = existing.avg_price;
      const totalHargaLama = totalJumlahLama * avgLama;
      const totalJumlahBaru = totalJumlahLama + Number(quantity);
      const totalHargaBaru = totalHargaLama + sumPrice;
      const avgBaru = totalHargaBaru / totalJumlahBaru;

      existing.jumlah = totalJumlahBaru;
      existing.avg_price = avgBaru;
      await existing.save();
      console.log(totalJumlahBaru);
      console.log(avgBaru);
    } else {
      await Portofolio.create({
        id_user: acc.id_user,
        id_asset: id,
        jumlah: quantity,
        avg_price: price,
      });
    }

    return res.status(200).json({ transaksi });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const SellTransaction = async (req, res) => {
  const user = req.user;
  const { id } = req.query;
  const { quantity } = req.body;

  try {
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": `${process.env.API_KEY}`,
      },
    };
    const response = await axios(url, options);
    const price = parseFloat(response.data.market_data?.current_price?.usd);
    const totalValue = price * quantity;

    const acc = await User.findOne({
      where: { username: user.username },
    });

    const portofolio = await Portofolio.findOne({
      where: {
        id_user: acc.id_user,
        id_asset: id,
      },
    });

    const ownedAsset = portofolio ? portofolio.jumlah : 0;

    if (ownedAsset < quantity) {
      return res.status(400).json({
        message: `Gagal menjual. Anda hanya memiliki ${ownedAsset} unit ${id}`,
      });
    }

    acc.saldo = parseFloat(acc.saldo) + totalValue;
    await acc.save();

    const transaksi = await Transaction.create({
      id_user: acc.id_user,
      id_asset: id,
      jumlah: quantity,
      harga: totalValue,
      status: "Sell",
    });

    const sisaJumlah = ownedAsset - quantity;
    if (sisaJumlah === 0) {
      await Portofolio.destroy({
        where: {
          id_user: acc.id_user,
          id_asset: id,
        },
      });
    } else {
      portofolio.jumlah = sisaJumlah;
      await portofolio.save();
    }

    return res.status(200).json({
      message: `Berhasil menjual ${quantity} unit ${id}`,
      transaksi,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const getAllTransactions = async (req, res) => {
  const user = req.user;

  try {
    const acc = await User.findOne({
      where: { username: user.username },
    });

    if (!acc) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const transaksi = await Transaction.findAll({
      where: {
        id_user: acc.id_user,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ transaksi });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const getTransactionById = async (req, res) => {
  const user = req.user;
  const { id_transaksi } = req.params;

  try {
    const acc = await User.findOne({
      where: { username: user.username },
    });

    if (!acc) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const transaksi = await Transaction.findOne({
      where: {
        id_transaksi: id_transaksi,
        id_user: acc.id_user,
      },
    });

    if (!transaksi) {
      return res
        .status(404)
        .json({ message: "Transaksi tidak ditemukan atau bukan milik Anda" });
    }

    return res.status(200).json({ transaksi });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const topup = async (req, res) => {
  const user = req.user;
  const { topup } = req.body;
  try {
    const acc = await User.findOne({
      where: { username: user.username },
    });

    if (!acc) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    if (!topup) {
      return res
        .status(400)
        .json({ message: "Tolong masukan jumlah saldo yang valid" });
    }

    const update = await User.update(
      {
        saldo: parseFloat(acc.saldo) + parseFloat(topup),
      },
      {
        where: { username: user.username },
      }
    );

    console.log(parseFloat(topup));

    return res.status(200).json({ message: "Berhasil topup" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  BuyTransaction,
  SellTransaction,
  getAllTransactions,
  getTransactionById,
  topup,
};
