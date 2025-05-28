const { Op, Sequelize } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const { User, Transaction, Portofolio } = require("../models/fetchModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
// const BuyTransaction = async (req, res) => {
//   const user = req.user;
//   const { id } = req.query;
//   const { quantity } = req.body;
//   try {
//     const url = `https://api.coingecko.com/api/v3/coins/${id}`;
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         "x-cg-pro-api-key": `${process.env.API_KEY}`,
//       },
//     };
//     const response = await axios(url, options);
//     const price = parseFloat(response.data.market_data?.current_price?.usd);
//     const sumPrice = price * quantity;

//     const acc = await User.findOne({
//       where: { username: user.username },
//     });

//     console.log(acc.saldo);

//     if (acc.saldo < sumPrice) {
//       return res.status(400).json({
//         message: "Saldo anda tidak mencukupi, silahkan topup terlebih dahulu",
//       });
//     }

//     acc.saldo -= sumPrice;
//     await acc.save();

//     const transaksi = await Transaction.create({
//       id_user: acc.id_user,
//       id_asset: response.data.id,
//       jumlah: quantity,
//       harga: sumPrice,
//       status: "Buy",
//     });

//     const existing = await Portofolio.findOne({
//       where: {
//         id_user: acc.id_user,
//         id_asset: id,
//       },
//     });

//     if (existing) {
//       const totalJumlahLama = existing.jumlah;
//       const avgLama = existing.avg_price;
//       const totalHargaLama = totalJumlahLama * avgLama;
//       const totalJumlahBaru = totalJumlahLama + Number(quantity);
//       const totalHargaBaru = totalHargaLama + sumPrice;
//       const avgBaru = totalHargaBaru / totalJumlahBaru;

//       existing.jumlah = totalJumlahBaru;
//       existing.avg_price = avgBaru;
//       await existing.save();
//       console.log(totalJumlahBaru);
//       console.log(avgBaru);
//     } else {
//       await Portofolio.create({
//         id_user: acc.id_user,
//         id_asset: id,
//         jumlah: quantity,
//         avg_price: price,
//       });
//     }

//     return res.status(200).json({ transaksi });
//   } catch (err) {
//     return res.status(500).json({ message: err.message });
//   }
// };

// const SellTransaction = async (req, res) => {
//   const user = req.user;
//   const { id } = req.query;
//   const { quantity } = req.body;

//   try {
//     const url = `https://api.coingecko.com/api/v3/coins/${id}`;
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         "x-cg-pro-api-key": `${process.env.API_KEY}`,
//       },
//     };
//     const response = await axios(url, options);
//     const price = parseFloat(response.data.market_data?.current_price?.usd);
//     const totalValue = price * quantity;

//     const acc = await User.findOne({
//       where: { username: user.username },
//     });

//     const portofolio = await Portofolio.findOne({
//       where: {
//         id_user: acc.id_user,
//         id_asset: id,
//       },
//     });

//     const ownedAsset = portofolio ? portofolio.jumlah : 0;

//     if (ownedAsset < quantity) {
//       return res.status(400).json({
//         message: `Gagal menjual. Anda hanya memiliki ${ownedAsset} unit ${id}`,
//       });
//     }

//     acc.saldo = parseFloat(acc.saldo) + totalValue;
//     await acc.save();

//     const transaksi = await Transaction.create({
//       id_user: acc.id_user,
//       id_asset: id,
//       jumlah: quantity,
//       harga: totalValue,
//       status: "Sell",
//     });

//     const sisaJumlah = ownedAsset - quantity;
//     if (sisaJumlah === 0) {
//       await Portofolio.destroy({
//         where: {
//           id_user: acc.id_user,
//           id_asset: id,
//         },
//       });
//     } else {
//       portofolio.jumlah = sisaJumlah;
//       await portofolio.save();
//     }

//     return res.status(200).json({
//       message: `Berhasil menjual ${quantity} unit ${id}`,
//       transaksi,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: err.message });
//   }
// };

// const getAllTransactions = async (req, res) => {
//   const user = req.user;

//   try {
//     const acc = await User.findOne({
//       where: { username: user.username },
//     });

//     if (!acc) {
//       return res.status(404).json({ message: "User tidak ditemukan" });
//     }

//     const transaksi = await Transaction.findAll({
//       where: {
//         id_user: acc.id_user,
//       },
//       order: [["createdAt", "DESC"]],
//     });

//     return res.status(200).json({ transaksi });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: err.message });
//   }
// };

// const getTransactionById = async (req, res) => {
//   const user = req.user;
//   const { id_transaksi } = req.params;

//   try {
//     const acc = await User.findOne({
//       where: { username: user.username },
//     });

//     if (!acc) {
//       return res.status(404).json({ message: "User tidak ditemukan" });
//     }

//     const transaksi = await Transaction.findOne({
//       where: {
//         id_transaksi: id_transaksi,
//         id_user: acc.id_user,
//       },
//     });

//     if (!transaksi) {
//       return res
//         .status(404)
//         .json({ message: "Transaksi tidak ditemukan atau bukan milik Anda" });
//     }

//     return res.status(200).json({ transaksi });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: err.message });
//   }
// };
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
      return res.status(400).json({ message: "Upload gagal", error: err.message });
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
        return res.status(400).json({ message: "Masukkan jumlah topup yang valid" });
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

module.exports = {
  // BuyTransaction,
  // SellTransaction,
  // getAllTransactions,
  // getTransactionById,
  topup,
  getConvert,
  convertAll,
};
