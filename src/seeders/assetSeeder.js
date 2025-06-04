"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "assets",
      [
        {
          id_asset: "bitcoin",
          name: "Bitcoin",
          price: 69840.5,
          symbol: "btc",
          image:
            "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
          is_deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("assets", null, {});
  },
};
