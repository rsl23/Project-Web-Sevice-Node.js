"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const currentDate = new Date();
    const date1 = new Date();
    date1.setHours(currentDate.getHours() - 2);

    return queryInterface.bulkInsert(
      "orders",
      [

      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("orders", null, {});
  },
};
