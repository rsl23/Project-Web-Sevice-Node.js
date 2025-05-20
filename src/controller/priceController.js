const axios = require("axios");

const price = async (req, res) => {
    try {
        const params = {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 250,
            page: 1,
            sparkline: false
        };

        const response = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
            params
        });

        const filteredData = response.data.map(coin => ({
            id: coin.id,
            symbol: coin.symbol,
            name: coin.name,
            image: coin.image,
            current_price: coin.current_price,
            market_cap: coin.market_cap,
            market_cap_rank: coin.market_cap_rank,
            total_volume: coin.total_volume,
            high_24h: coin.high_24h,
            low_24h: coin.low_24h,
            price_change_24h: coin.price_change_24h,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            ath: coin.ath,
            ath_change_percentage: coin.ath_change_percentage,
            atl: coin.atl,
            atl_change_percentage: coin.atl_change_percentage,
            circulating_supply: coin.circulating_supply,
            total_supply: coin.total_supply,
            max_supply: coin.max_supply,
            last_updated: coin.last_updated
        }));

        res.json(filteredData);
    } catch (error) {
        console.error("Error from CoinGecko:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch prices" });
    }
};


const coinPrice = async (req, res) => {
    const coinId = req.query.coinId;

    if (!coinId) {
        return res.status(400).json({ error: "coinId query parameter is required" });
    }

    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
            params: {
                ids: coinId,
                vs_currencies: "usd"
            }
        });
        if (response.data[coinId]) {
            res.json(response.data);
        } else {
            res.status(404).json({ error: `Coin with ID '${coinId}' not found` });
        }
    } catch (error) {
        console.error("Error fetching coin price:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch coin price" });
    }
};

const marketTrending = async (req, res) => {
    try {
        const response = await axios.get("https://api.coingecko.com/api/v3/search/trending");

        const trendingCoins = response.data.coins.map((coin) => {
            const coinData = coin.item;
            return {
                id: coinData.id,
                name: coinData.name,
                symbol: coinData.symbol,
                market_cap_rank: coinData.market_cap_rank,
                score: coinData.score
            };
        });

        res.json({ trendingCoins });
    } catch (error) {
        console.error("Error fetching trending data:", error);
        res.status(500).json({ error: "Failed to fetch trending data" });
    }
};

module.exports = {
    price,
    coinPrice,
    marketTrending
};