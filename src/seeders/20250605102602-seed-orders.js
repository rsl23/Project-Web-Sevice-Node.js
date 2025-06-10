"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const currentDate = new Date();
    const date1 = new Date();
    date1.setHours(currentDate.getHours() - 2);

    return queryInterface.bulkInsert(
      "orders",
      [
        {
          user_id: 1,
          id_asset: "bitcoin",
          type: "market",
          side: "buy",
          price: 69840.5,
          amount: 0.01,
          filled_amount: 0.01,
          total: 698.405,
          status: "filled",
          createdAt: date1,
          updatedAt: date1,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("orders", null, {});
  },
};
