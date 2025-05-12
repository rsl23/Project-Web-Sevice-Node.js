const jwt = require("jsonwebtoken");
const JWT_KEY = "ProyekWS";

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ message: "Token tidak ditemukan" });
    }

    const decoded = jwt.verify(token, JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token tidak valid" });
  }
};

module.exports = { verifyToken };
