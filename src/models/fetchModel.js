const db = {};
const pool = require("../database/connection");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Transaction = require("./Transaction");
const Portofolio = require("./Portofolio");

db.User = User(pool, DataTypes);
db.Transaction = Transaction(pool, DataTypes);
db.Portofolio = Portofolio(pool, DataTypes);

module.exports = db;
