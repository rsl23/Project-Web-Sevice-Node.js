# 🚀 Cryptocurrency Trading Platform API

Platform trading cryptocurrency yang dibangun dengan Node.js, Express.js, dan MySQL. API ini menyediakan fitur lengkap untuk trading crypto, manajemen portfolio, watchlist, dan sistem administrasi.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi](#teknologi)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi](#instalasi)
- [Konfigurasi](#konfigurasi)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [API Endpoints](#api-endpoints)
- [Database](#database)
- [Struktur Proyek](#struktur-proyek)
- [Contributing](#contributing)
- [License](#license)

## ✨ Fitur Utama

### 🔐 Autentikasi & Autorisasi
- Registrasi dan login pengguna
- JWT token authentication
- Reset password functionality
- Role-based access (User & Admin)

### 💹 Trading & Market
- Market order (beli/jual dengan harga terbaik)
- Limit order (beli/jual dengan harga yang ditentukan)
- Real-time market data dari CoinGecko API
- Trending cryptocurrency tracking
- Order history management

### 💼 Portfolio Management
- Portfolio tracking & monitoring
- Profit/Loss calculation
- Asset allocation overview
- Transaction history

### 📊 Market Data
- Live cryptocurrency prices
- Market capitalization data
- Price charts and trends
- Asset details dan informasi lengkap

### 👀 Watchlist
- Add/remove cryptocurrency to watchlist
- Monitor favorite coins
- Quick access to tracked assets

### 💰 Wallet & Transactions
- Top-up balance functionality
- Currency conversion
- Subscription purchases
- Transaction history

### 🔧 Admin Panel
- Asset management (CRUD operations)
- User management
- System monitoring
- Data synchronization dengan external APIs

## 🛠 Teknologi

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Token)
- **Password Encryption**: bcrypt
- **File Upload**: Multer
- **External API**: CoinGecko API
- **Validation**: Joi
- **Environment Variables**: dotenv

## 📋 Persyaratan Sistem

- Node.js >= 16.0.0
- MySQL >= 5.7
- npm atau yarn

## 🚀 Instalasi

1. **Clone repository**
```bash
git clone https://github.com/KevinCS0609/ProyekWS.git
cd Project-Web-Sevice-Node.js
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
# Buat file .env di root directory
cp .env.example .env
```

4. **Konfigurasi database**
Sesuaikan konfigurasi database di `src/config/db.js`

## ⚙️ Konfigurasi

Buat file `.env` di root directory dengan konfigurasi berikut:

```env
# Database Configuration
DB_HOST=localhost
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=db_proyekWS
DB_PORT=3306

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Server Configuration
PORT=3000
NODE_ENV=development

# External API
COINGECKO_API_BASE_URL=https://api.coingecko.com/api/v3
```

## 🔄 Database Setup

1. **Buat database**
```sql
CREATE DATABASE db_proyekWS;
```

2. **Jalankan migrations**
```bash
npm run migrate
```

3. **Seed data (opsional)**
```bash
npm run seed
```

### Database Management Commands

```bash
# Migration commands
npm run migrate              # Jalankan semua migrations
npm run migrate:production   # Migration untuk production
npm run migrate:undo         # Undo migration terakhir
npm run migrate:undo:all     # Undo semua migrations
npm run migrate:status       # Cek status migrations

# Seeder commands
npm run seed                 # Jalankan semua seeders
npm run seed:production      # Seeder untuk production
npm run seed:undo            # Undo seeder terakhir
npm run seed:undo:all        # Undo semua seeders
```

## 🏃‍♂️ Menjalankan Aplikasi

### Development
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

### Production
```bash
NODE_ENV=production npm start
```

## 📡 API Endpoints

Base URL: `http://localhost:3000/cuan`

### 🔐 Authentication
```
POST   /auth/register              - Registrasi user baru
POST   /auth/login                 - Login user
GET    /auth/me                    - Get user profile
POST   /auth/request_verification  - Request reset password
POST   /auth/reset_password        - Reset password
```

### 💹 Market & Trading
```
GET    /market                     - List semua cryptocurrency
GET    /market/:id                 - Detail cryptocurrency
GET    /prices                     - Get prices dengan market data
GET    /prices/:coinId             - Get price coin tertentu
GET    /market/trending            - Get trending cryptocurrencies
```

### 📊 Portfolio
```
GET    /portofolio/getAll          - Get semua portfolio
GET    /portofolio/getDetailPorto  - Get detail portfolio
GET    /portofolio/getProfits      - Get profit summary
GET    /portofolio/getLoss         - Get loss summary
```

### 💰 Transactions
```
POST   /topup                      - Top-up balance
GET    /convert                    - Get conversion rates
POST   /convert-all                - Convert currencies
POST   /subscribe                  - Buy subscription
```

### 🛒 Orders
```
POST   /order/buyMarket            - Buy market order
POST   /order/buyLimit             - Buy limit order
POST   /order/sellMarket           - Sell market order
POST   /order/sellLimit            - Sell limit order
GET    /order/getHistory           - Get order history
DELETE /order/cancel-market/:id    - Cancel limit order
```

### 👀 Watchlist
```
POST   /addwatchlist               - Add to watchlist
GET    /getwatchlist               - Get watchlist
DELETE /removewatchlist            - Remove from watchlist
```

### 🔧 Admin (Requires Admin Access)
```
POST   /registeradmin              - Register admin
POST   /loginadmin                 - Login admin
GET    /assets                     - Get all assets
POST   /assets                     - Create new asset
PUT    /assets/:id                 - Update asset
DELETE /assets/:id                 - Delete asset
GET    /assets/fetchAsset          - Sync assets from CoinGecko
```

## 🗄️ Database

### Tables
- **users** - User accounts dan profiles
- **admin** - Admin accounts
- **assets** - Cryptocurrency assets data
- **portofolio** - User portfolio holdings
- **transaksi** - Transaction records
- **orders** - Trading orders
- **watchlist** - User watchlists

### Migrations
Migrations terletak di `src/migrations/` dan dijalankan secara berurutan:
1. User migration
2. Asset migration
3. Admin migration
4. Portfolio migration
5. Transaction migration
6. Order migration
7. Watchlist migration

## 📁 Struktur Proyek

```
├── src/
│   ├── config/          # Database dan app configuration
│   ├── controller/      # Request handlers
│   ├── middleware/      # Custom middleware
│   ├── migrations/      # Database migrations
│   ├── models/          # Sequelize models
│   ├── routes/          # API routes
│   └── seeders/         # Database seeders
├── uploads/             # File upload directory
├── index.js             # Application entry point
├── package.json         # Dependencies dan scripts
└── README.md           # Project documentation
```

### Key Components

- **Controllers**: Handle business logic untuk setiap endpoint
- **Models**: Sequelize models untuk database tables
- **Middleware**: Authentication, validation, dan request processing
- **Routes**: API endpoint definitions
- **Migrations**: Database schema changes
- **Seeders**: Sample data untuk development

## 🔒 Security Features

- JWT-based authentication
- Password hashing dengan bcrypt
- Role-based access control
- Input validation dengan Joi
- Secure file upload handling

## 🚀 Deployment

### Using PM2 (Recommended)
```bash
npm install -g pm2
pm2 start index.js --name "crypto-trading-api"
```

### Using Docker
```dockerfile
# Dockerfile example
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

Distributed under the ISC License. See `LICENSE` for more information.

## 📞 Contact

Project Link: [https://github.com/KevinCS0609/ProyekWS](https://github.com/KevinCS0609/ProyekWS)

---

⭐ Jangan lupa untuk memberikan star jika project ini membantu!