const { Sequelize } = require("sequelize");

const {
  database,
  username,
  password,
  port,
  dialect,
  host,
} = require("../config/db");

const sequelize = new Sequelize(database, username, password, {
  dialect: dialect,
  host: host,
  port: port,
});

module.exports = sequelize;
