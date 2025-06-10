const { model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define(
    "asset",
    {
      id_asset: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      description: DataTypes.TEXT,
      symbol: DataTypes.STRING,
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "asset",
      timestamps: true,
    }
  );

  return Asset;
};
