const { Sequelize } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const { User, Portofolio } = require("../models/fetchModel");
const { port } = require("../config/db");
const db = require("../models/fetchModel");
const { asset } = db;

const fetchPorto = async (req, res) => {
  try {
    const user = req.user;
    const username = user.username;
    const acc = await User.findOne({ where: { username } });
    const porto = await Portofolio.findAll({ where: { id_user: acc.id_user } });

    let sumpnl = 0;
    let totalValue = 0;
    let sumpnlPercentTotalValue = 0;

    const tempporto = await Promise.all(
      porto.map(async (item) => {
        const dbAsset = await asset.findOne({
          where: { id_asset: item.id_asset },
        });

        if (!dbAsset || dbAsset.price === null) {
          return {
            Asset: item.id_asset,
            Price: null,
            Jumlah: item.jumlah,
            AvgPrice: item.avg_price,
            Pnl: null,
            PnlPercent: null,
            Error: "Gagal mengambil harga dari database",
          };
        }

        const price = dbAsset.price;
        const Pnl = parseFloat(
          ((price - item.avg_price) * item.jumlah).toFixed(2)
        );
        const pnlPercent = parseFloat(
          (((price - item.avg_price) / item.avg_price) * 100).toFixed(2)
        );

        const valueInvested = item.avg_price * item.jumlah;
        totalValue += valueInvested;
        sumpnl += Pnl;
        sumpnlPercentTotalValue += pnlPercent * valueInvested;

        return {
          Asset: item.id_asset,
          Price: price,
          Jumlah: item.jumlah,
          AvgPrice: item.avg_price,
          Pnl,
          PnlPercent: pnlPercent,
        };
      })
    );

    const Today_PnL_Percent = totalValue
      ? parseFloat((sumpnlPercentTotalValue / totalValue).toFixed(2))
      : 0;

    return res.status(200).json({
      porto: tempporto,
      Today_PnL: sumpnl,
      Today_PnL_Percent: `${Today_PnL_Percent}%`,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const detailPorto = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Missing asset id in query" });
    }

    const portfolio = await Portofolio.findOne({
      where: { id_asset: id },
    });

    if (!portfolio) {
      return res.status(404).json({ message: "Asset not found in portfolio" });
    }

    const assetData = await asset.findOne({
      where: { id_asset: id },
    });

    if (!assetData || assetData.price === null) {
      return res
        .status(404)
        .json({ message: "Current price not found in asset table" });
    }

    const price = assetData.price;
    const avgPrice = portfolio.avg_price;
    const jumlah = portfolio.jumlah;

    const pnl = parseFloat(((price - avgPrice) * jumlah).toFixed(2));
    const pnlPercent = parseFloat(
      (((price - avgPrice) / avgPrice) * 100).toFixed(2)
    );

    const result = {
      Asset: id,
      Price: price,
      Jumlah: jumlah,
      AvgPrice: avgPrice,
      Pnl: pnl,
      PnlPercent: pnlPercent,
    };

    return res.status(200).json({ Asset: result });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const loss = async (req, res) => {
  try {
    const { nama, harga_sekarang, target_harga } = req.query;

    if (!nama || !harga_sekarang || !target_harga) {
      return res.status(400).json({
        error: "Parameter nama, harga_sekarang, dan target_harga wajib diisi.",
      });
    }

    const currentPrice = parseFloat(harga_sekarang);
    const targetPrice = parseFloat(target_harga);

    if (isNaN(currentPrice) || isNaN(targetPrice)) {
      return res.status(400).json({
        error: "harga_sekarang dan target_harga harus berupa angka.",
      });
    }

    const lossValue = currentPrice - targetPrice;
    const percentage = ((lossValue / currentPrice) * 100).toFixed(2); // dua desimal
    const status = lossValue > 0 ? "Rugi" : lossValue < 0 ? "Untung" : "Impasse";

    res.json({
      crypto: nama,
      harga_sekarang: currentPrice,
      target_harga: targetPrice,
      loss: lossValue > 0 ? lossValue : 0,
      persentase: lossValue !== 0 ? `${Math.abs(percentage)}%` : "0%",
      status: status,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const profits = async (req, res) => {
  try {
    const { nama, harga_sekarang, target_harga } = req.query;

    if (!nama || !harga_sekarang || !target_harga) {
      return res.status(400).json({
        error: "Parameter nama, harga_sekarang, dan target_harga wajib diisi.",
      });
    }

    const currentPrice = parseFloat(harga_sekarang);
    const targetPrice = parseFloat(target_harga);

    if (isNaN(currentPrice) || isNaN(targetPrice)) {
      return res.status(400).json({
        error: "harga_sekarang dan target_harga harus berupa angka.",
      });
    }

    const profit = targetPrice - currentPrice;
    const percentage = ((profit / currentPrice) * 100).toFixed(2); // dua angka desimal
    const status = profit > 0 ? "Untung" : profit < 0 ? "Rugi" : "Impasse";

    res.json({
      crypto: nama,
      harga_sekarang: currentPrice,
      target_harga: targetPrice,
      selisih: profit,
      persentase: `${percentage}%`,
      status: status,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


module.exports = { fetchPorto, detailPorto, profits, loss };
