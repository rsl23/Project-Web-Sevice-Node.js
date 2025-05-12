const express = require("express");
const { register } = require("../controller/controller");
const router = express.Router();

router.get("/register", register);
