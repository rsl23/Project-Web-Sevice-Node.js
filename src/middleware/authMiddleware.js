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

const verifyAdmin = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Akses ditolak' });

    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid' });
  }
};

module.exports = { verifyToken, verifyAdmin };
