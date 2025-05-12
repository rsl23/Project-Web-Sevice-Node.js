const { Op, Sequelize } = require("sequelize");
const { User } = require("../models/fetchModel");

const register = async (req, res) => {
  try {
    const { username, password, name } = req.body;

    const query = await User.create({
      username: username,
      password: password,
      name: name,
      saldo: 0,
    });
  } catch (err) {
    console.log(err.message);
  }
};
