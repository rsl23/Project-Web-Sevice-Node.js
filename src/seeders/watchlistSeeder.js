"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("watchlist", [], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("watchlist", null, {});
  },
};
