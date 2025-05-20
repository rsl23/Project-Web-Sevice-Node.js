/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 10.4.32-MariaDB : Database - proyekWS
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`proyekWS` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `proyekWS`;


DROP TABLE IF EXISTS `payment_method`;

CREATE TABLE `payment_method` (
  `id_payment` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id_payment`)
) ENGINE=INNODB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT  INTO `payment_method`(`id_payment`,`name`) VALUES 
(1,'Gopay'),
(2,'Dana'),
(3,'Bank Transfer');


DROP TABLE IF EXISTS `portofolio`;

CREATE TABLE `portofolio` (
  `id_portofolio` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user` INT(11) DEFAULT NULL,
  `id_asset` VARCHAR(255) DEFAULT NULL,
  `avg_price` DOUBLE DEFAULT NULL,
  `jumlah` DOUBLE DEFAULT NULL,
  PRIMARY KEY (`id_portofolio`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `transaksi`;

CREATE TABLE `transaksi` (
  `id_transaksi` INT(11) NOT NULL AUTO_INCREMENT,
  `id_user` INT(11) DEFAULT NULL,
  `id_asset` VARCHAR(255) DEFAULT NULL,
  `jumlah` INT(11) DEFAULT NULL,
  `harga` DOUBLE DEFAULT NULL,
  `status` ENUM('Buy','Sell') DEFAULT NULL,
  `createdAt` DATETIME DEFAULT NULL,
  `updatedAt` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id_transaksi`)
) ENGINE=INNODB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT  INTO `transaksi`(`id_transaksi`,`id_user`,`id_asset`,`jumlah`,`harga`,`status`,`createdAt`,`updatedAt`) VALUES 
(1,5,'bitcoin',5,520540,'Buy','2025-05-13 16:32:33','2025-05-13 16:32:33'),
(2,4,'mantle',2,1.52874,'Buy','2025-05-15 07:12:35','2025-05-15 07:12:35'),
(3,4,'mantle',2147483647,76437000000,'Buy','2025-05-15 07:13:10','2025-05-15 07:13:10');

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id_user` INT(11) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) DEFAULT NULL,
  `password` VARCHAR(255) DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `saldo` DECIMAL(11,0) DEFAULT NULL,
  `asset_slot` INT(11) DEFAULT NULL,
  `subscription` ENUM('Free','Pro') DEFAULT NULL,
  `createdAt` DATETIME DEFAULT NULL,
  `updatedAt` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=INNODB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT  INTO `user`(`id_user`,`username`,`password`,`email`,`name`,`saldo`,`asset_slot`,`subscription`,`createdAt`,`updatedAt`) VALUES 
(1,'Kevin','12345678','kevin.c23@mhs.istts.ac.id','KEVIN',0,5,'Free','2025-05-12 09:44:53','2025-05-12 09:44:53'),
(3,'rsl','$2b$10$zA1zbRRWo6b7Ltk2fnrPJ.kndfJnYO3bdI4UVk9XY3ewk5u0i3j.y','rasl@gmail.com','RASOLL',0,5,'Free','2025-05-13 07:36:09','2025-05-13 07:36:09'),
(4,'rslaBaru','$2b$10$U/xaZZ3jd.mGQfVcYas8p.d/QgQWhFPWIhCXXv4LTEIDwH6R3bvWy','rasl33@gmail.com','RASOLL',0,5,'Free','2025-05-13 07:58:34','2025-05-13 07:58:34'),
(5,'Kace','$2b$10$G8kanKvFCiUb1nj1bpts8.qKB1PYTejwxp.zYN5NrZ6A5iw2B4r8S','Kevin.c24@mhs.istts.ac.id','KEVIN',100000,5,'Free','2025-05-13 12:26:57','2025-05-15 07:05:52');

DROP TABLE IF EXISTS `asset`;
CREATE TABLE `asset` (
  `id_asset` VARCHAR(255) NOT NULL, -- ID bisa dari user input (contoh: 'bitcoin', 'eth', 'abc123')
  `name` VARCHAR(255) NOT NULL,     -- Nama lengkap asset (contoh: 'Bitcoin', 'Ethereum')
  `price` DOUBLE DEFAULT NULL,      -- Harga saat ini
  `description` TEXT DEFAULT NULL,  -- Deskripsi opsional
  `symbol` VARCHAR(50) DEFAULT NULL, -- Simbol ticker (contoh: BTC, ETH)
  `is_deleted` BOOLEAN DEFAULT FALSE,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_asset`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS `orders`;
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  id_asset VARCHAR(50),
  TYPE ENUM('market', 'limit'),
  side ENUM('buy', 'sell'),
  price DOUBLE,
  amount DOUBLE,
  filled_amount DOUBLE DEFAULT 0,
  total DOUBLE,
  STATUS ENUM('open', 'partial', 'filled', 'cancelled') DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS watchlist;
CREATE TABLE watchlist (
  id INT AUTO_INCREMENT PRIMARY KEY,
  id_user VARCHAR(255) NOT NULL,
  id_asset VARCHAR(255) NOT NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_watch (id_user, id_asset)
);

CREATE TABLE `admin` (
  `id_admin` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `is_deleted` BOOLEAN DEFAULT FALSE,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_admin`)
) ENGINE=INNODB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
