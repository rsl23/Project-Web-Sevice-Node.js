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

    const totalBuy = await Transaction.sum('jumlah', {
      where: {
        id_user: acc.id_user,
        id_asset: id,
        status: 'Buy'
      }
    });

    const totalSell = await Transaction.sum('jumlah', {
      where: {
        id_user: acc.id_user,
        id_asset: id,
        status: 'Sell'
      }
    });

    const ownedAsset = (totalBuy || 0) - (totalSell || 0);

    if (ownedAsset < quantity) {
      return res.status(400).json({
        message: `Gagal menjual. Anda hanya memiliki ${ownedAsset} unit ${id}`,
      });
    }

    acc.saldo += totalValue;
    await acc.save();

    const transaksi = await Transaction.create({
      id_user: acc.id_user,
      id_asset: id,
      jumlah: quantity,
      harga: totalValue,
      status: "Sell",
    });

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
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({ transaksi });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};


const getTransactionById = async (req, res) => {
  const user = req.user;
  const { id_transaksi } = req.params.id;

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
      return res.status(404).json({ message: "Transaksi tidak ditemukan atau bukan milik Anda" });
    }

    return res.status(200).json({ transaksi });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};




module.exports = { BuyTransaction, SellTransaction, getAllTransactions, getTransactionById };
