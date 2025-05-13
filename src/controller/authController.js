const { Op, Sequelize } = require("sequelize");
const { User } = require("../models/fetchModel");
const { registerSchema, loginSchema } = require("../middleware/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_KEY = "ProyekWS";

const register = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password, name, email } = value;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return res.status(409).json({
        message:
          existingUser.username === username
            ? 'Username sudah terdaftar'
            : 'Email sudah terdaftar',
      });
    }

    // const { username, password, name, email } = req.body;
    const time = new Date();

    const hashedPassword = await bcrypt.hash(password, 10);



    const query = await User.create({
      username: username,
      password: hashedPassword,
      name: name,
      email: email,
      saldo: 0,
      createdAt: time,
      updatedAt: time,
    });
    return res
      .status(200)
      .json({ message: `Berhasil Register dengan Username ${username}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {

    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { username, password } = value;

    const findUser = await User.findOne({
      where: { username: username },
    });
    if (findUser) {
      const isPasswordMatch = await bcrypt.compare(password, findUser.password);
      if (!isPasswordMatch) {
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
