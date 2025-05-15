const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Portofolio extends Model {
    static associate(models) {
      Portofolio.belongsTo(models.User, {
        foreignKey: "id_user",
        sourceKey: "id_user",
      });
    }
  }
  Portofolio.init(
    {
      id_portofolio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      id_asset: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avg_price: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
      jumlah: {
        type: DataTypes.DOUBLE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Portofolio",
      tableName: "portofolio",
      timestamps: false,
    }
  );
  return Portofolio;
};
