"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      return bcrypt.hash(password, salt);
    };

    return queryInterface.bulkInsert(
      "admin",
      [
        {
          username: "Kevin",
          password: await hashPassword("Kevin@12345678"),
          is_deleted: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("admin", null, {});
  },
};
