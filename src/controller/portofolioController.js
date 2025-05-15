const { Sequelize } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const { User, Portofolio } = require("../models/fetchModel");
const { port } = require("../config/db");

const fetchPorto = async (req, res) => {
  try {
    const { username } = req.user;
    const acc = await User.findOne({ where: { username: username } });
    const porto = await Portofolio.findAll({ where: { id_user: acc.id_user } });
    let sumpnl = 0;

    const tempporto = await Promise.all(
      porto.map(async (item) => {
        const url = `https://api.coingecko.com/api/v3/coins/${item.id_asset}`;
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-cg-pro-api-key": `${process.env.API_KEY}`,
          },
        };
        try {
          const response = await axios(url, options);
          const price = response.data.market_data?.current_price?.usd;
          const Pnl = parseFloat(
            ((price - item.avg_price) * item.jumlah).toFixed(2)
          );
          sumpnl = sumpnl + Pnl;
          return {
            Asset: item.id_asset,
            Price: price,
            Jumlah: item.jumlah,
            AvgPrice: item.avg_price,
            Pnl: Pnl,
          };
        } catch (err) {
          return {
            Asset: item.id_asset,
            Price: null,
            Jumlah: item.jumlah,
            AvgPrice: item.avg_price,
            Error: "Gagal mengambil harga",
          };
        }
      })
    );
    return res.status(200).json({ porto: tempporto, Today_PnL: sumpnl });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const detailPorto = async (req, res) => {
  try {
    const { id } = req.query;
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": `${process.env.API_KEY}`,
      },
    };
    const asset = await Portofolio.findOne({
      where: { id_asset: id },
    });
    const response = await axios(url, options);
    const price = response.data.market_data?.current_price?.usd;
    const Pnl = parseFloat(
      ((price - asset.avg_price) * asset.jumlah).toFixed(2)
    );
    const temp = {
      Asset: asset.id_asset,
      Price: price,
      Jumlah: asset.jumlah,
      AvgPrice: asset.avg_price,
      Pnl: Pnl,
    };

    return res.status(200).json({ Asset: temp });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { fetchPorto, detailPorto };
