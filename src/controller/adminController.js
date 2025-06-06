const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require("../models/fetchModel");
const { admin } = db;
const JWT_KEY = "ProyekWS";

const registerAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existing = await admin.findOne({ where: { username } });
        if (existing) return res.status(400).json({ message: 'Username sudah digunakan' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await admin.create({
            username,
            password: hashedPassword
        });

        const adminData = {
            id: newAdmin.id_admin,
            username: newAdmin.username,
      
        };

        return res.status(201).json({ message: 'Admin berhasil didaftarkan', admin: adminData });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Terjadi kesalahan saat registrasi admin' });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existing = await admin.findOne({ where: { username, is_deleted: false } });
        if (!existing) return res.status(401).json({ message: 'Admin tidak ditemukan' });

        const match = await bcrypt.compare(password, existing.password);
        if (!match) return res.status(401).json({ message: 'Password salah' });

        const token = jwt.sign(
            { id_admin: existing.id_admin, username: existing.username, role: 'admin' },
            JWT_KEY,
            { expiresIn: '1d' }
        );

        return res.json({ message: `Admin ${username}, Login berhasil`, token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Login gagal' });
    }
};

module.exports = { registerAdmin, loginAdmin };