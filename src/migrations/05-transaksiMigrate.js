"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("transaksi", {
      id_transaksi: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id_user",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_asset: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      jumlah: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      harga: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Buy", "Sell"),
        allowNull: false,
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
    await queryInterface.dropTable("transaksi");
  },
};
