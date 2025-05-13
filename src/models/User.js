const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Transaction, {
        foreignKey: "id_user",
        sourceKey: "id_user",
      });
    }
  }
  User.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("name", value.toUpperCase());
        },
        allowNull: false,
      },
      saldo: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      asset_slot: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
      },
      subscription: {
        type: DataTypes.STRING,
        defaultValue: "Free",
      },
      createdAt: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "user",
      timestamps: true,
      name: {
        singular: "User",
        plural: "User",
      },
    }
  );
  return User;
};
