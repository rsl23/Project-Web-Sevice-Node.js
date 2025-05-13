const db = {};
const pool = require("../database/connection");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Transaction = require("./Transaction");

db.User = User(pool, DataTypes);
db.Transaction = Transaction(pool, DataTypes);

module.exports = db;
