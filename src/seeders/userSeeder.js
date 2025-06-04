"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    };

    return queryInterface.bulkInsert(
      "user",
      [
        {
          username: "Kevin",
          password: await hashPassword("Kevin@12345678"),
          email: "Kevin.c23@mhs.istts.ac.id",
          name: "Kace",
          saldo: 100000,
          asset_slot: 5,
          subscription: "Free",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  },
};
