"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Pastikan Anda memiliki user dengan id_user 1, 2, dan 3
    return queryInterface.bulkInsert("portofolio", [], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("portofolio", null, {});
  },
};
