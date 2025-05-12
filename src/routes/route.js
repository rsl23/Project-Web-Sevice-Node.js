const express = require("express");
const { register, login, profile } = require("../controller/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { fetchCoin } = require("../controller/assetController");
const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", verifyToken, profile);

router.get("/assets", fetchCoin);

module.exports = router;
