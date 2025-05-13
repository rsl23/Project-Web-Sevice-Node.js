const express = require("express");
const { register, login, profile } = require("../controller/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { fetchCoin, detailAsset } = require("../controller/assetController");
const { price, coinPrice, marketTrending } = require("../controller/priceController");
const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", verifyToken, profile);

router.get("/assets", fetchCoin);
router.get("/assets/:id", detailAsset);

router.get("/prices", price);
router.get("/prices/:coin", coinPrice);
router.get("/market/trending", marketTrending);

module.exports = router;
