const express = require("express");
const {
  register,
  login,
  profile,
  requestPasswordReset,
  updatePassword,
} = require("../controller/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { fetchCoin, detailAsset } = require("../controller/assetController");
const {
  BuyTransaction,
  SellTransaction,
  getAllTransactions,
  getTransactionById,
  topup,
} = require("../controller/transactionController");

const { fetchPorto } = require("../controller/portofolioController");
const router = express.Router();

//==================================== LOGIN & REGISTER ==================================================
router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", verifyToken, profile);

router.post("/auth/request_verification", requestPasswordReset);
router.post("/auth/reset_password", updatePassword);

//===================================== ASSET ==============================================================
router.get("/assets", fetchCoin);
router.get("/assets/:id", detailAsset);

//=========================================== TRANSACTION =====================================================

router.post("/transaction/buy", verifyToken, BuyTransaction);
router.post("/transaction/sell", verifyToken, SellTransaction);
router.get("/transaction", verifyToken, getAllTransactions);
router.get("/transaction/:id", verifyToken, getTransactionById);
router.post("/topup", verifyToken, topup);

//============================================ PORTO ===================================
router.get("/portofolio/getAll", verifyToken, fetchPorto);

module.exports = router;
