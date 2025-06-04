"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("portofolio", {
      id_portofolio: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "user",
          key: "id_user",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      id_asset: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      avg_price: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      jumlah: {
        type: Sequelize.DOUBLE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("portofolio");
  },
};
