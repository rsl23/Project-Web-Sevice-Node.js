const { Op, Sequelize } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_KEY = "ProyekWS";

const BuyTransaction = async (req, res) => {
  const user = req.user;
  const { id } = req.query;
  try {
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": `${process.env.API_KEY}`,
      },
    };
    const response = await axios(url, options);
    const price = parseFloat(response.data.market_data?.current_price?.usd);

    return res.status(200).json({ price });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { BuyTransaction };
