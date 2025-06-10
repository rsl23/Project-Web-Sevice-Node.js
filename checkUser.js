// checkUser.js
require("dotenv").config();
const { Sequelize } = require("sequelize");
const db = require("./src/config/db");

async function checkUser() {
  try {
    console.log("Connecting to database...");
    const sequelize = new Sequelize(db.database, db.username, db.password, {
      host: db.host,
      dialect: db.dialect,
      port: db.port,
    });

    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    console.log("Checking user data...");
    const [users] = await sequelize.query("SELECT * FROM user");
    console.log("User data:");
    console.log(users);

    await sequelize.close();
    console.log("Database connection closed.");
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

checkUser();
