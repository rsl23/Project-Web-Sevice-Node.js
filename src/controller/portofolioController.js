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

// const addPortofolio = async (req, res) => {
//   try {
//     const { username } = req.user;
//     const { currency, balance } = req.body;
//     const time = new Date();

//     const query = await Wallets.create({
//       user_id: username,
//       currency: currency,
//       balance: balance,
//       createdAt: time,
//     });
//     return res.status(200).json({ message: Berhasil menambahkan Wallet });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

module.exports = { fetchPorto };
