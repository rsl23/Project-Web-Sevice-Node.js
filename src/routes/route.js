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
const { BuyTransaction } = require("../controller/transactionController");
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

module.exports = router;
