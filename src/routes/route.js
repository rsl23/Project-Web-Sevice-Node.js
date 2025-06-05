const express = require("express");
const {
  register,
  login,
  profile,
  requestPasswordReset,
  updatePassword,
} = require("../controller/authController");
const { verifyToken, verifyAdmin } = require("../middleware/authMiddleware");
const { fetchCoin, detailAsset } = require("../controller/marketController");
const {
  BuySubscription,
  topup,
  getConvert,
  convertAll,
} = require("../controller/transactionController");

const {
  fetchPorto,
  detailPorto,
  profits,
  loss,
} = require("../controller/portofolioController");

const {
  price,
  coinPrice,
  marketTrending,
} = require("../controller/priceController");

const {
  buyMarket,
  buyLimit,
  sellMarket,
  sellLimit,
  getOrderHistory,
  cancelLimitOrder,
} = require("../controller/orderController");

const {
  addToWatchlist,
  getWatchlist,
  softDeleteWatchlist,
} = require("../controller/watchlistController");

const {
  getAssets,
  deleteAssets,
  updateAssets,
  newAssets,
  syncAssets,
} = require("../controller/assetController");

const { registerAdmin, loginAdmin } = require("../controller/adminController");

const router = express.Router();

//==================================== LOGIN & REGISTER ==================================================
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", verifyToken, profile);

router.post("/auth/request_verification", requestPasswordReset);
router.post("/auth/reset_password", updatePassword);

//===================================== MARKET ==============================================================
router.get("/market", fetchCoin); //list coin
router.get("/market/:id", detailAsset); //detail coin

//=========================================== TRANSACTION =====================================================
router.post("/topup", verifyToken, topup);
router.get("/convert", verifyToken, getConvert);
router.post("/convert-all", verifyToken, convertAll);
router.post("/subscribe", verifyToken, BuySubscription); //beli subscription

//============================================ PORTO ===================================
router.get("/portofolio/getAll", verifyToken, fetchPorto);
router.get("/portofolio/getDetailPorto", verifyToken, detailPorto);
router.get("/portofolio/getProfits", verifyToken, profits);
router.get("/portofolio/getLoss", verifyToken, loss);

//============================================Market Price===================================
router.get("/prices", price); //dapetin coin + price + marketcap dll
router.get("/prices/:coinId", coinPrice); //harga coin tertentu
router.get("/market/trending", marketTrending); //dapetin market trending //belum bisa

//======================================== ASSET ============================================
router.get("/assets", verifyAdmin, getAssets); //menampilkan semua asset yang ada di database + axios
router.post("/assets", verifyAdmin, newAssets); //nambah asset ke database bisa dari axios atau buat sendiri
router.put("/assets/:id", verifyAdmin, updateAssets); //update asset yang ada di database
router.delete("/assets/:id", verifyAdmin, deleteAssets); //delete suatu asset
router.get("/assets/fetchAsset", verifyAdmin, syncAssets); // masukkin asset ke database dari API CoinGecko


//======================================= MARKET ORDER & MARKET LIMIT ========================
router.post("/order/buyMarket", verifyToken, buyMarket); //beli dengan harga terbaik di market - sellLimit // belum
router.post("/order/buyLimit", verifyToken, buyLimit); //beli dengan pasang harga beli - sellMarket
router.post("/order/sellMarket", verifyToken, sellMarket); //jual dengan harga terbaik di market - buyLimit //belum
router.post("/order/sellLimit", verifyToken, sellLimit); //jual dengan pasang harga jual - butMarket
router.get("/order/getHistory", verifyToken, getOrderHistory);
router.delete("/order/cancel-market/:order_id", verifyToken, cancelLimitOrder);

//==========================================WATCHLIST=========================================
router.post("/addwatchlist", verifyToken, addToWatchlist);
router.get("/getwatchlist", verifyToken, getWatchlist);
router.delete("/removewatchlist", verifyToken, softDeleteWatchlist);


//==========================================ADMIN=============================================
router.post("/registeradmin", registerAdmin);
router.post("/loginadmin", loginAdmin);

module.exports = router;
