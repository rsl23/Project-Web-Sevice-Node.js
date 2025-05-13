const express = require("express");
const { register, login, profile } = require("../controller/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { fetchCoin, detailAsset } = require("../controller/assetController");
const { BuyTransaction } = require("../controller/transactionController");
const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", verifyToken, profile);

router.get("/assets", fetchCoin);
router.get("/assets/:id", detailAsset);

router.post("/transaction/buy", verifyToken, BuyTransaction);

module.exports = router;
