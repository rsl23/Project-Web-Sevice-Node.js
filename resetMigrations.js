// resetMigrations.js
require("dotenv").config();
const { Sequelize } = require("sequelize");
const db = require("./src/config/db");

async function resetSequelizeMeta() {
  try {
    console.log("Connecting to database...");
    const sequelize = new Sequelize(db.database, db.username, db.password, {
      host: db.host,
      dialect: db.dialect,
      port: db.port,
    });

    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    console.log("Dropping SequelizeMeta table...");
    await sequelize.query("DROP TABLE IF EXISTS `SequelizeMeta`;");
    console.log("SequelizeMeta table dropped successfully.");

    console.log("Creating new SequelizeMeta table...");
    await sequelize.query(
      "CREATE TABLE IF NOT EXISTS `SequelizeMeta` " +
        "(`name` VARCHAR(255) NOT NULL, PRIMARY KEY (`name`)) " +
        "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"
    );
    console.log("SequelizeMeta table created successfully.");

    await sequelize.close();
    console.log("Database connection closed.");

    console.log("Migration reset complete. You can now run migrations again.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

resetSequelizeMeta();
