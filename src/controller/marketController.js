const { Op, Sequelize } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const db = require("../models/fetchModel");
const { asset } = db;

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

    const dbAsset = await asset.findByPk(id, {
      attributes: ["id_asset", "name", "symbol", "description", "price"],
    });

    if (dbAsset && !dbAsset.is_deleted) {
      const data = {
        id_asset: dbAsset.id_asset,
        name: dbAsset.name,
        symbol: dbAsset.symbol,
        description: dbAsset.description,
        price: `$${dbAsset.price}`,
      };
      return res.status(200).json({ AssetDetail: data });
    }

    const url = `https://api.coingecko.com/api/v3/coins/${id}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-pro-api-key": process.env.API_KEY,
      },
    };
    const response = await axios(url, options);
    const temp = response.data;

    const assetFromApi = {
      id_asset: temp.id,
      name: temp.name,
      symbol: temp.symbol,
      description: temp.description?.en || null,
      price: `$${temp.market_data?.current_price?.usd || null}`,
    };

    return res.status(200).json({ AssetDetail: assetFromApi });
  } catch (err) {
    console.error("Error response:", err.response?.data || err.message);
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { fetchCoin, detailAsset };
