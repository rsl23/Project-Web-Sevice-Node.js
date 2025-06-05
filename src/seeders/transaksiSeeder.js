"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentDate = new Date();
    // Buat beberapa tanggal yang berbeda untuk transaksi
    const date1 = new Date();
    date1.setDate(currentDate.getDate() - 1); // 1 hari yang lalu

    const date2 = new Date();
    date2.setDate(currentDate.getDate() - 3); // 3 hari yang lalu

    const date3 = new Date();
    date3.setDate(currentDate.getDate() - 7); // 7 hari yang lalu

    return queryInterface.bulkInsert(
      "transaksi",
      [
        {
          id_user: 1,
          id_asset: "bitcoin",
          type: "buy",
          side: "buy",
          price: 69840.5,
          amount: 0.01,
          total: 698.405,
          status: "completed",
          createdAt: date1,
          updatedAt: date1,
          
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("transaksi", null, {});
  },
};
