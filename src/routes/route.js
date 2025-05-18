const express = require("express");
const {
  register,
  login,
  profile,
  requestPasswordReset,
  updatePassword,
} = require("../controller/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { fetchCoin, detailAsset } = require("../controller/marketController");
const {
  BuyTransaction,
  SellTransaction,
  getAllTransactions,
  getTransactionById,
  topup,
} = require("../controller/transactionController");

const {
  fetchPorto,
  detailPorto,
} = require("../controller/portofolioController");

const {
  price,
  coinPrice,
  marketTrending
} = require("../controller/priceController");

const {
  buyMarket, buyLimit, sellMarket, sellLimit
} = require("../controller/orderController");

const { getAssets, deleteAssets, updateAssets, newAssets } = require("../controller/assetController")

const router = express.Router();



//==================================== LOGIN & REGISTER ==================================================
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", verifyToken, profile);

router.post("/auth/request_verification", requestPasswordReset);
router.post("/auth/reset_password", updatePassword);

//===================================== MARKET ==============================================================
router.get("/market", fetchCoin); //list coin
router.get("/market/:id", detailAsset);//detail coin

//=========================================== TRANSACTION =====================================================

router.post("/transaction/buy", verifyToken, BuyTransaction);
router.post("/transaction/sell", verifyToken, SellTransaction);
router.get("/transaction", verifyToken, getAllTransactions);
router.get("/transaction/:id_transaksi", verifyToken, getTransactionById);
router.post("/topup", verifyToken, topup);

//============================================ PORTO ===================================
router.get("/portofolio/getAll", verifyToken, fetchPorto);
router.get("/portofolio/getDetailPorto", verifyToken, detailPorto);
//============================================Market Price===================================
router.get("/prices", price);//dapetin coin + price + marketcap dll
router.get("/price/:coin", coinPrice);//harga coin tertentu
router.get("market/trending", marketTrending);//dapetin market trending

//======================================== ASSET ============================================
router.get("/assets", getAssets); //menampilkan semua asset yang ada di database + axios
router.post("/assets", newAssets); //nambah asset ke database bisa dari axios atau buat sendiri
router.put("/assets/:id", updateAssets); //update asset yang ada di database
router.delete("/assets/:id", deleteAssets); //delete suatu asset

//======================================= MARKET ORDER & MARKET LIMIT ========================
router.post("/order/buyMarket", verifyToken, buyMarket); //beli dengan harga terbaik di market - sellLimit
router.post("/order/buyLimit", verifyToken, buyLimit); //beli dengan pasang harga beli - sellMarket
router.post("/order/sellMarket", verifyToken, sellMarket); //jual dengan harga terbaik di market - buyLimit
router.post("/order/sellLimit", verifyToken, sellLimit); //jual dengan pasang harga jual - butMarket


module.exports = router;
