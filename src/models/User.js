const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
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
        allowNull: false,
        defaultValue: 5,
      },
      subscription: {
        type: DataTypes.STRING,
        allowNull: false,
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
