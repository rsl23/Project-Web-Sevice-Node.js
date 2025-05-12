const { Op, Sequelize } = require("sequelize");
const { User } = require("../models/fetchModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = "ProyekWS";

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

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const findUser = await User.findOne({
      where: { username: username },
    });
    if (findUser) {
      if (findUser.password !== password) {
        return res.status(400).json({ message: "Password Salah" });
      } else {
        const token = jwt.sign(
          {
            username: username,
          },
          JWT_KEY,
          {
            expiresIn: "24h",
          }
        );
        return res.status(200).json({
          message: `Selamat ${username} berhasil melakukan login!`,
          token: token,
        });
      }
    } else {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.user.username },
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const profile = {
      username: user.username,
      name: user.name,
      total_porto: user.saldo,
    };

    return res.status(200).json({ Profile: profile });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login, profile };
