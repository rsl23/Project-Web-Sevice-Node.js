const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const folderName = "uploads";

    if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName, { recursive: true });
    }

    callback(null, folderName);
  },
  filename: (req, file, callback) => {
    const fileExt = path.extname(file.originalname);
    const filename = Date.now() + "-" + file.originalname;
    callback(null, filename); 
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
}).single("gambar"); 

const uploadBuktiTF = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload gagal", error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Tidak ada file yang diupload" });
    }

    console.log("Single File: ", req.file);
    res.json({ message: "File berhasil diupload", file: req.file });
  });
};

module.exports = { uploadBuktiTF };
