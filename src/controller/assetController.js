const { Op, Sequelize } = require("sequelize");
const axios = require("axios");

const fetchCoin = async (req, res) => {
  try {
    const url = "https://api.coingecko.com/api/v3/coins/list";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": "CG-Difbd7y1YycHVAVvyUDzocDu",
      },
    };

    const response = await axios(url, options);
    console.log(response.data);
    return res.status(200).json({ Assets: response.data });
  } catch (err) {
    console.error("Error response:", err.response?.data || err.message);
    return res.status(500).json({ message: err.message });
  }
};

const detailAsset = async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": "CG-Difbd7y1YycHVAVvyUDzocDu",
      },
    };

    const response = await axios(url, options);
    return res.status(200).json({ AssetDetail: response.data });
  } catch (err) {
    console.error("Error response:", err.response?.data || err.message);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { fetchCoin, detailAsset };
