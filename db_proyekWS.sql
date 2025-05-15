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

/*Table structure for table `payment_method` */

DROP TABLE IF EXISTS `payment_method`;

CREATE TABLE `payment_method` (
  `id_payment` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_payment`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `payment_method` */

insert  into `payment_method`(`id_payment`,`name`) values 
(1,'Gopay'),
(2,'Dana'),
(3,'Bank Transfer');

/*Table structure for table `portofolio` */

DROP TABLE IF EXISTS `portofolio`;

CREATE TABLE `portofolio` (
  `id_portofolio` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_asset` varchar(255) DEFAULT NULL,
  `avg_price` double DEFAULT NULL,
  `jumlah` double DEFAULT NULL,
  PRIMARY KEY (`id_portofolio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `portofolio` */

/*Table structure for table `transaksi` */

DROP TABLE IF EXISTS `transaksi`;

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) DEFAULT NULL,
  `id_asset` varchar(255) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `harga` double DEFAULT NULL,
  `status` enum('Buy','Sell') DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_transaksi`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `transaksi` */

insert  into `transaksi`(`id_transaksi`,`id_user`,`id_asset`,`jumlah`,`harga`,`status`,`createdAt`,`updatedAt`) values 
(1,5,'bitcoin',5,520540,'Buy','2025-05-13 16:32:33','2025-05-13 16:32:33'),
(2,4,'mantle',2,1.52874,'Buy','2025-05-15 07:12:35','2025-05-15 07:12:35'),
(3,4,'mantle',2147483647,76437000000,'Buy','2025-05-15 07:13:10','2025-05-15 07:13:10');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `saldo` decimal(11,0) DEFAULT NULL,
  `asset_slot` int(11) DEFAULT NULL,
  `subscription` enum('Free','Pro') DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `user` */

insert  into `user`(`id_user`,`username`,`password`,`email`,`name`,`saldo`,`asset_slot`,`subscription`,`createdAt`,`updatedAt`) values 
(1,'Kevin','12345678','kevin.c23@mhs.istts.ac.id','KEVIN',0,5,'Free','2025-05-12 09:44:53','2025-05-12 09:44:53'),
(3,'rsl','$2b$10$zA1zbRRWo6b7Ltk2fnrPJ.kndfJnYO3bdI4UVk9XY3ewk5u0i3j.y','rasl@gmail.com','RASOLL',0,5,'Free','2025-05-13 07:36:09','2025-05-13 07:36:09'),
(4,'rslaBaru','$2b$10$U/xaZZ3jd.mGQfVcYas8p.d/QgQWhFPWIhCXXv4LTEIDwH6R3bvWy','rasl33@gmail.com','RASOLL',0,5,'Free','2025-05-13 07:58:34','2025-05-13 07:58:34'),
(5,'Kace','$2b$10$G8kanKvFCiUb1nj1bpts8.qKB1PYTejwxp.zYN5NrZ6A5iw2B4r8S','Kevin.c24@mhs.istts.ac.id','KEVIN',100000,5,'Free','2025-05-13 12:26:57','2025-05-15 07:05:52');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
