const { Op, Sequelize } = require("sequelize");
const { User } = require("../models/fetchModel");

const register = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    const time = new Date();

    const query = await User.create({
      username: username,
      password: password,
      name: name,
      saldo: 0,
      createdAt: time,
      updatedAt: time,
    });
    return res
      .status(200)
      .json({ message: `Berhasil Register dengan Usernmae ${username}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register };
