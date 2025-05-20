const { Sequelize } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const { User, Portofolio } = require("../models/fetchModel");
const { port } = require("../config/db");
const db = require("../models/fetchModel");
const { asset } = db;

const fetchPorto = async (req, res) => {
  try {
    const { username } = req.user;
    const acc = await User.findOne({ where: { username } });
    const porto = await Portofolio.findAll({ where: { id_user: acc.id_user } });

    let sumpnl = 0;
    let totalValue = 0;
    let sumpnlPercentTotalValue = 0;

    const tempporto = await Promise.all(
      porto.map(async (item) => {
        const dbAsset = await asset.findOne({ where: { id_asset: item.id_asset } });

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
        const Pnl = parseFloat(((price - item.avg_price) * item.jumlah).toFixed(2));
        const pnlPercent = parseFloat((((price - item.avg_price) / item.avg_price) * 100).toFixed(2));

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

    const Today_PnL_Percent = totalValue ? parseFloat((sumpnlPercentTotalValue / totalValue).toFixed(2)) : 0;

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
      return res.status(404).json({ message: "Current price not found in asset table" });
    }

    const price = assetData.price;
    const avgPrice = portfolio.avg_price;
    const jumlah = portfolio.jumlah;

    const pnl = parseFloat(((price - avgPrice) * jumlah).toFixed(2));
    const pnlPercent = parseFloat((((price - avgPrice) / avgPrice) * 100).toFixed(2));

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

module.exports = { fetchPorto, detailPorto };
