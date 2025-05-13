const { Op, Sequelize } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const { User, Transaction } = require("../models/fetchModel");

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

    console.log(acc);

    if (user.saldo < sumPrice) {
      return res.status(400).json({
        message: "Saldo anda tidak mencukupi, silahkan topup terlebih dahulu",
      });
    }
    const transaksi = await Transaction.create({
      id_user: acc.id_user,
      id_asset: response.data.id,
      jumlah: quantity,
      harga: sumPrice,
      status: "Buy",
    });

    return res.status(200).json({ transaksi });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { BuyTransaction };
