"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "asset",
      [
        {
          id_asset: "bitcoin",
          name: "Bitcoin",
          symbol: "BTC",
          price: 61000.5,
          image:
            "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_asset: "ethereum",
          name: "Ethereum",
          symbol: "ETH",
          price: 3500.75,
          image:
            "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_asset: "tether",
          name: "Tether",
          symbol: "USDT",
          price: 1.0,
          image:
            "https://assets.coingecko.com/coins/images/325/large/Tether.png",
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_asset: "binancecoin",
          name: "Binance Coin",
          symbol: "BNB",
          price: 570.25,
          image:
            "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id_asset: "solana",
          name: "Solana",
          symbol: "SOL",
          price: 140.8,
          image:
            "https://assets.coingecko.com/coins/images/4128/large/solana.png",
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("asset", null, {});
  },
};
