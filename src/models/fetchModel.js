const db = {};
const pool = require("../database/connection");
const { DataTypes } = require("sequelize");
const User = require("./User");

db.User = User(pool, DataTypes);

module.exports = db;
