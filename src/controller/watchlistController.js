const db = require("../models/fetchModel");
const { watchlist, asset, Portofolio } = db;

const addToWatchlist = async (req, res) => {
    try {
        const user = req.user;
        const { id_asset } = req.body;

        const id_user = user.id_user; 
        if (!id_asset) {
            return res.status(400).json({ message: "id_asset wajib diisi" });
        }

        // Cek asset ada di DB dan tidak dihapus
        const assetExists = await asset.findOne({
            where: { id_asset, is_deleted: false }
        });

        if (!assetExists) {
            return res.status(404).json({ message: "Asset tidak ditemukan" });
        }

        // Cek sudah ada di watchlist atau belum
        const existing = await watchlist.findOne({
            where: { id_user, id_asset }
        });

        if (existing) {
            return res.status(400).json({ message: "Asset sudah ada di watchlist" });
        }

        // Tambah ke watchlist
        await watchlist.create({ id_user, id_asset });

        return res.status(201).json({ message: "Berhasil menambahkan asset ke watchlist" });
    } catch (error) {
        console.error("Error addToWatchlist:", error);
        return res.status(500).json({ message: "Gagal menambahkan asset ke watchlist", error: error.message });
    }
};

const getWatchlist = async (req, res) => {
    try {
        const { id_user } = req.user;

        // Ambil daftar watchlist user (hanya id_asset)
        const watchlistAssets = await watchlist.findAll({
            where: { id_user, is_deleted: false },
            attributes: ['id_asset']
        });

        if (!watchlistAssets.length) {
            return res.json({ watchlist: [] });
        }

        // Ambil data asset yang ada di watchlist
        const assetIds = watchlistAssets.map(w => w.id_asset);

        const assets = await asset.findAll({
            where: { id_asset: assetIds },
            attributes: ['id_asset', 'name', 'price', 'description', 'symbol']
        });

        // Ambil portofolio user untuk asset-asset tersebut
        const portfolios = await Portofolio.findAll({
            where: { id_user, id_asset: assetIds },
            attributes: ['id_asset', 'jumlah', 'avg_price']
        });

        // Buat map portofolio untuk akses cepat
        const portfolioMap = {};
        portfolios.forEach(p => {
            portfolioMap[p.id_asset] = p;
        });

        // Gabungkan data dan hitung pnl
        const watchlistData = assets.map(asset => {
            const port = portfolioMap[asset.id_asset];
            let pnl = null;
            if (port && port.avg_price > 0 && asset.price) {
                pnl = (((asset.price - port.avg_price) / port.avg_price) * 100).toFixed(2);
                pnl = parseFloat(pnl);
            }

            return {
                id_asset: asset.id_asset,
                name: asset.name,
                price: asset.price,
                pnl
            };
        });

        return res.json({ watchlist: watchlistData });

    } catch (error) {
        console.error("Error fetching watchlist:", error);
        return res.status(500).json({ message: "Gagal mengambil watchlist" });
    }
};

const softDeleteWatchlist = async (req, res) => {
    try {
        const { id_user } = req.user; // dari token auth
        const { id_asset } = req.body;

        if (!id_asset) {
            return res.status(400).json({ message: "id_asset wajib diisi" });
        }

        // Update is_deleted menjadi true
        const result = await watchlist.update(
            { is_deleted: true },
            {
                where: {
                    id_user,
                    id_asset,
                    is_deleted: false
                }
            }
        );

        if (result[0] === 0) {
            return res.status(404).json({ message: "Watchlist tidak ditemukan atau sudah dihapus" });
        }

        return res.status(200).json({ message: "Watchlist berhasil dihapus (soft delete)" });
    } catch (error) {
        console.error("Error soft delete watchlist:", error);
        return res.status(500).json({ message: "Gagal menghapus watchlist", error: error.message });
    }
};

module.exports = { addToWatchlist, getWatchlist, softDeleteWatchlist };
