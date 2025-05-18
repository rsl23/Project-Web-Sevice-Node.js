const db = require("../models/fetchModel");
const { Order } = db;
const { Op } = require('sequelize');

const buyMarket = async (req, res) => {
    try {
        const { id_user } = req.user;
        const { id_asset, total } = req.body;

        if (!total || !id_asset) {
            return res.status(400).json({ message: "Harus isi id_asset dan total (USD)" });
        }

        const sellOrders = await Order.findAll({
            where: {
                id_asset,
                type: "limit",
                side: "sell",
                status: { [Op.in]: ['open', 'partial'] },
                user_id: { [Op.ne]: id_user },
            },
            order: [["price", "ASC"], ["created_at", "ASC"]],
        });

        if (!sellOrders.length) {
            return res.status(404).json({ message: "Tidak ada sell order yang tersedia di market saat ini" });
        }

        let remainingUSD = parseFloat(total);
        let totalBought = 0;
        let totalSpent = 0;
        const priceDetails = [];

        for (const sellOrder of sellOrders) {
            if (remainingUSD <= 0) break;

            const remainingSellAmount = sellOrder.amount - sellOrder.filled_amount;
            const price = sellOrder.price;
            const maxBuyableAtThisLevel = parseFloat((remainingUSD / price).toFixed(8));

            const amountMatched = Math.min(remainingSellAmount, maxBuyableAtThisLevel);
            const cost = parseFloat((amountMatched * price).toFixed(2));

            if (amountMatched <= 0) continue;

            // Update sell order
            sellOrder.filled_amount += amountMatched;
            sellOrder.status = sellOrder.filled_amount >= sellOrder.amount ? "filled" : "partial";
            await sellOrder.save();

            priceDetails.push({ price, amount: amountMatched });

            totalBought += amountMatched;
            totalSpent += cost;
            remainingUSD -= cost;
        }

        if (totalBought === 0) {
            return res.status(400).json({ message: "Tidak ada koin yang tersedia untuk dibeli di market saat ini" });
        }

        // Buat satu market buy order
        await Order.create({
            user_id: id_user,
            id_asset,
            side: "buy",
            type: "market",
            price: priceDetails[0].price,
            amount: totalBought,
            total: totalSpent,
            status: totalSpent < total ? "partial" : "filled",
        });

        const message = totalSpent < total
            ? `Order partial: hanya berhasil membeli ${totalBought} ${id_asset} senilai $${totalSpent}. Sisa saldo $${(total - totalSpent).toFixed(2)} akan dikembalikan ke portfolio.`
            : "Buy market berhasil";

        return res.status(200).json({
            message,
            amount_bought: totalBought,
            total_spent: totalSpent,
            details: priceDetails,
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


const buyLimit = async (req, res) => {
    try {
        const { id_user } = req.user;
        const { id_asset, price, total, amount } = req.body;

        if (!id_asset || !price || (!total && !amount)) {
            return res.status(400).json({ message: "Data tidak lengkap" });
        }

        let finalAmount = amount;
        let finalTotal = total;

        if (!amount) {
            finalAmount = parseFloat((total / price).toFixed(8));
        } else if (!total) {
            finalTotal = parseFloat((amount * price).toFixed(2));
        }

        await Order.create({
            user_id: id_user,
            id_asset,
            side: "buy",
            type: "limit",
            price,
            amount: finalAmount,
            total: finalTotal,
            status: "open",
        });

        return res.status(201).json({ message: "Buy limit order dibuat", price, finalAmount });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const sellMarket = async (req, res) => {
    try {
        const { id_user } = req.user;
        const { id_asset, amount: amountToSellRequested } = req.body;

        if (!id_asset || !amountToSellRequested || amountToSellRequested <= 0) {
            return res.status(400).json({ message: "Harus isi id_asset dan amount (coin) lebih dari 0" });
        }

        let remainingToSell = parseFloat(amountToSellRequested);
        let totalSold = 0;
        let totalEarned = 0;
        const priceLevels = [];

        const buyOrders = await Order.findAll({
            where: {
                id_asset,
                type: "limit",
                side: "buy",
                status: { [Op.in]: ['open', 'partial'] },
                user_id: { [Op.ne]: id_user },
            },
            order: [
                ['price', 'DESC'],
                ['created_at', 'ASC'],
            ],
        });

        if (!buyOrders.length) {
            return res.status(404).json({ message: "Tidak ada buy order yang cocok" });
        }

        for (const buyOrder of buyOrders) {
            if (remainingToSell <= 0) break;

            const remainingBuyAmount = buyOrder.amount - buyOrder.filled_amount;
            if (remainingBuyAmount <= 0) continue;

            const amountMatched = Math.min(remainingToSell, remainingBuyAmount);
            const price = buyOrder.price;
            const earned = parseFloat((amountMatched * price).toFixed(2));

            buyOrder.filled_amount += amountMatched;
            buyOrder.status = buyOrder.filled_amount >= buyOrder.amount ? "filled" : "partial";
            await buyOrder.save();

            priceLevels.push({ price, amount: amountMatched });
            totalSold += amountMatched;
            totalEarned += earned;
            remainingToSell -= amountMatched;
        }

        if (totalSold === 0) {
            return res.status(400).json({ message: "Tidak ada buy order yang cukup untuk menjual koin" });
        }

        await Order.create({
            user_id: id_user,
            id_asset,
            side: "sell",
            type: "market",
            price: priceLevels[0].price,
            amount: totalSold,
            total: totalEarned,
            status: totalSold < amountToSellRequested ? "partial" : "filled",
        });

        const isPartial = totalSold < amountToSellRequested;

        const message = isPartial
            ? `Order partial: hanya berhasil menjual ${totalSold} dari ${amountToSellRequested} koin. ` +
            `Sisa ${amountToSellRequested - totalSold} koin akan dikembalikan ke portfolio.`
            : "Sell market berhasil";

        return res.status(200).json({
            message,
            total_sold: totalSold,
            total_earned: totalEarned,
            details: priceLevels,
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const sellLimit = async (req, res) => {
    try {
        const { id_user } = req.user;
        const { id_asset, price, amount, total } = req.body;

        if (!id_asset || !price || (!amount && !total)) {
            return res.status(400).json({ message: "Data tidak lengkap" });
        }

        let finalAmount = amount;
        let finalTotal = total;

        if (!amount) {
            finalAmount = parseFloat((total / price).toFixed(8));
        } else if (!total) {
            finalTotal = parseFloat((amount * price).toFixed(2));
        }

        await Order.create({
            user_id: id_user,
            id_asset,
            side: "sell",
            type: "limit",
            price,
            amount: finalAmount,
            total: finalTotal,
            status: "open",
        });

        return res.status(201).json({ message: "Sell limit order dibuat", price, finalAmount });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = { buyMarket, buyLimit, sellMarket, sellLimit };
