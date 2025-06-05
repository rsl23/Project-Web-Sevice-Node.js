"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Pastikan Anda memiliki user dengan id_user 1, 2, dan 3
    return queryInterface.bulkInsert(
      "portofolio",
      [
        {
          id_user: 1,
          id_asset: "bitcoin",
          avg_price: 69840.5,
          jumlah: 0.01,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("portofolio", null, {});
  },
};
