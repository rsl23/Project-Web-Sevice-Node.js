const db = {};
const pool = require("../database/connection");
const { DataTypes } = require("sequelize");
const User = require("./User");
const Transaction = require("./Transaction");
const Portofolio = require("./Portofolio");
const assetModel = require("./assetModel");
const orderModel = require("./orderModel");
const watchListModel = require("./watchListModel");
const adminModel = require("./adminModel");

db.User = User(pool, DataTypes);
db.Transaction = Transaction(pool, DataTypes);
db.Portofolio = Portofolio(pool, DataTypes);
db.asset = assetModel(pool, DataTypes);
db.Order = orderModel(pool, DataTypes);
db.watchlist = watchListModel(pool, DataTypes);
db.admin = adminModel(pool, DataTypes);

module.exports = db;
