const { Op, Sequelize } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const { User, Transaction, Portofolio } = require("../models/fetchModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const folderName = "uploads";

    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName, { recursive: true });
    }

    callback(null, folderName);
  },
  filename: (req, file, callback) => {
    const fileExt = path.extname(file.originalname);
    const filename = Date.now() + "-" + file.originalname;
    callback(null, filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).single("gambar");

const topup = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "Upload gagal", error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Bukti transfer wajib diupload" });
    }

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
          .json({ message: "Masukkan jumlah topup yang valid" });
      }

      await User.update(
        {
          saldo: parseFloat(acc.saldo) + parseFloat(topup),
        },
        {
          where: { username: user.username },
        }
      );

      // Berhasil
      return res.status(200).json({
        message: "Topup berhasil",
        topup: parseFloat(topup),
        bukti: req.file.filename,
        path: req.file.path,
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
};

const getConvert = async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount) {
    return res
      .status(400)
      .json({ error: "Parameter from, to, dan amount wajib diisi" });
  }

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: from,
          vs_currencies: to,
        },
      }
    );

    const rate = response.data[from]?.[to];
    if (!rate) {
      return res
        .status(400)
        .json({ error: "Kombinasi koin tidak ditemukan atau tidak valid" });
    }

    const converted = rate * parseFloat(amount);
    res.json({
      from,
      to,
      amount: parseFloat(amount),
      rate,
      result: converted,
    });
  } catch (err) {
    res.status(500).json({ error: "Gagal mengambil data dari API" });
  }
};

const convertAll = async (req, res) => {
  const { target, coins } = req.body;

  if (!target || !Array.isArray(coins) || coins.length === 0) {
    return res
      .status(400)
      .json({ error: "Harap masukkan target dan daftar coins yang valid" });
  }

  const coinIds = coins.map((c) => c.id).join(",");

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: coinIds,
          vs_currencies: target,
        },
      }
    );

    let total = 0;
    const details = coins.map((coin) => {
      const rate = response.data[coin.id]?.[target];
      const value = rate ? rate * coin.amount : 0;
      total += value;
      return {
        id: coin.id,
        amount: coin.amount,
        rate: rate || 0,
        value,
      };
    });

    res.json({
      target,
      total_value: parseFloat(total.toFixed(2)),
      details,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Gagal menghubungi CoinGecko API" });
  }
};

const BuySubscription = async (req, res) => {
  const user = req.user;
  try {
    if (user.subscription === "Premium") {
      return res
        .status(400)
        .json({ message: "Kamu sudah berlangganan Premium!" });
    } else {
      if (user.saldo < 99000) {
        return res
          .status(400)
          .json({ message: "Saldo tidak cukup untuk berlangganan" });
      } else {
        const updatedUser = await User.update({
          subscription: "Premium",
          saldo: user.saldo - 99000,
        });

        return res
          .status(200)
          .json({ message: "Berhasil berlangganan Premium" });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  topup,
  getConvert,
  convertAll,
  BuySubscription,
};
