const express = require("express");
const { register, login, profile, requestPasswordReset, updatePassword } = require("../controller/authController");
const { verifyToken } = require("../middleware/authMiddleware");
const { fetchCoin, detailAsset } = require("../controller/assetController");
<<<<<<< HEAD
const { BuyTransaction } = require("../controller/transactionController");
=======
const { price, coinPrice, marketTrending } = require("../controller/priceController");
>>>>>>> ef77066d39796436aaf9e11446daeec5ec985560
const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", verifyToken, profile);

// -----------------------------------------------------------------------
router.post("/auth/request_verification", requestPasswordReset);
router.post("/auth/reset_password", updatePassword);
// -----------------------------------------------------------------------

router.get("/assets", fetchCoin);
router.get("/assets/:id", detailAsset);

<<<<<<< HEAD
router.post("/transaction/buy", verifyToken, BuyTransaction);
=======
router.get("/prices", price);
router.get("/prices/:coin", coinPrice);
router.get("/market/trending", marketTrending);
>>>>>>> ef77066d39796436aaf9e11446daeec5ec985560

module.exports = router;
