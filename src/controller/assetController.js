const { Sequelize } = require("sequelize");
const axios = require("axios");
require("dotenv").config();
const db = require("../models/fetchModel");
const { asset } = db;

const fetchCoinGeckoPrices = async () => {
    const params = {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 250,
        page: 1,
        sparkline: false
    };

    const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", { params });
    return response.data;
};

const newAssets = async (req, res) => {
    try {
        const { id_asset, name, price, description, symbol } = req.body;

        if (!id_asset || !name) {
            return res.status(400).json({ message: "id_asset and name are required." });
        }

        const existing = await asset.findByPk(id_asset);
        if (existing) {
            return res.status(409).json({ message: "Asset with this ID already exists." });
        }

        const newAsset = await asset.create({
            id_asset,
            name,
            price,
            description,
            symbol
        });

        return res.status(201).json({ message: "Asset created", data: newAsset });
    } catch (err) {
        console.error("Error creating asset:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
};

const updateAssets = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const targetAsset = await asset.findByPk(id);
        if (!targetAsset) {
            return res.status(404).json({ message: "Asset not found." });
        }

        await targetAsset.update(updateData);

        return res.status(200).json({ message: "Asset updated successfully.", data: targetAsset });
    } catch (err) {
        console.error("Update asset error:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
};

const deleteAssets = async (req, res) => {
    try {
        const { id } = req.params;

        const targetAsset = await asset.findByPk(id);

        if (!targetAsset) {
            return res.status(404).json({ message: "Asset not found." });
        }

        if (targetAsset.is_deleted) {
            return res.status(400).json({ message: "Asset is already deleted." });
        }

        await targetAsset.update({ is_deleted: true });

        return res.status(200).json({ message: "Asset soft-deleted successfully." });
    } catch (err) {
        console.error("Delete asset error:", err);
        return res.status(500).json({ message: "Internal server error." });
    }
};

const getAssets = async (req, res) => {
    try {
        const coinGeckoData = await fetchCoinGeckoPrices();

        const dbAssets = await asset.findAll({
            where: { is_deleted: false },
            attributes: ['id_asset', 'name', 'price', 'description', 'symbol'],
            raw: true
        });

        const dbAssetsMap = new Map(dbAssets.map(a => [a.id_asset, a]));

        const coinGeckoMap = new Map(coinGeckoData.map(c => [c.id, c]));

        const mergedAssets = [...dbAssets];

        for (const coin of coinGeckoMap.values()) {
            if (!dbAssetsMap.has(coin.id)) {
                mergedAssets.push({
                    id_asset: coin.id,
                    name: coin.name,
                    price: coin.current_price,
                    description: null,
                    symbol: coin.symbol
                });
            }
        }

        return res.json(mergedAssets);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to fetch assets" });
    }
};

module.exports = { getAssets, deleteAssets, updateAssets, newAssets };
