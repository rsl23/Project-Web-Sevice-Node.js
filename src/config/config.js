const db = require("../config/db");

module.exports = {
  development: {
    username: db.username,
    password: db.password,
    database: db.database,
    host: db.host,
    dialect: db.dialect,
    port: db.port,
    seederStorage: "sequelize",
    seederStorageTableName: "sequelize_seeds",
  },
  test: {
    username: db.username,
    password: db.password,
    database: db.database,
    host: db.host,
    dialect: db.dialect,
    port: db.port,
  },
  production: {
    username: db.username,
    password: db.password,
    database: db.database,
    host: db.host,
    dialect: db.dialect,
    port: db.port,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
