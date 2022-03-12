-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2022 at 02:56 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_live`
--

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `itemName` varchar(255) DEFAULT NULL,
  `itemType` varchar(255) DEFAULT NULL,
  `manufactureDate` datetime DEFAULT NULL,
  `expiryDate` datetime DEFAULT NULL,
  `manufacturerId` int(11) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `itemName`, `itemType`, `manufactureDate`, `expiryDate`, `manufacturerId`, `price`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Bag', 'Letter', '2020-10-12 00:00:00', '2021-05-11 18:30:00', 1, 1200, 'https://picsum.photos/200/300?grayscale', '2022-03-06 07:35:09', '2022-03-06 07:35:09'),
(3, 'teblet', 'electronic', '2020-10-12 00:00:00', '2022-10-12 00:00:00', 3, 15500, 'https://picsum.photos/seed/picsum/200/300', '2022-03-06 07:39:15', '2022-03-06 07:39:15'),
(4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2022-03-11 00:57:58', '2022-03-11 00:57:58'),
(5, 'teblet', 'electronic', '2020-10-12 00:00:00', '2022-10-12 00:00:00', 3, 15500, 'https://picsum.photos/seed/picsum/200/300', '2022-03-11 00:59:54', '2022-03-11 00:59:54'),
(7, 'bike', 'electronic', '2020-10-12 00:00:00', '2022-10-12 00:00:00', 3, 155000, 'https://picsum.photos/seed/picsum/200/300', '2022-03-12 01:49:50', '2022-03-12 01:49:50');

-- --------------------------------------------------------

--
-- Table structure for table `manufactures`
--

CREATE TABLE `manufactures` (
  `id` int(11) NOT NULL,
  `manufactureName` varchar(255) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `manufactures`
--

INSERT INTO `manufactures` (`id`, `manufactureName`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'L&T', 4, '2022-03-06 07:21:41', '2022-03-06 07:21:41'),
(2, 'IBM', 1, '2022-03-06 07:24:07', '2022-03-06 07:24:07'),
(3, 'Wipro', 3, '2022-03-06 07:26:03', '2022-03-06 07:26:03');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `orderNo` int(11) DEFAULT NULL,
  `orderDate` datetime DEFAULT NULL,
  `itemId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `status` enum('Delivered','Dispatched','Pending','Canceled','Ordered') DEFAULT 'Pending',
  `quantity` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `orderNo`, `orderDate`, `itemId`, `userId`, `status`, `quantity`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2020-12-15 00:00:00', 1, 1, 'Pending', 12, '2022-03-06 07:58:55', '2022-03-06 07:58:55'),
(3, 2, '2020-12-15 00:00:00', 3, 3, 'Pending', 12, '2022-03-06 08:00:09', '2022-03-06 08:00:09'),
(4, 4, '2020-10-20 00:00:00', 3, 10, 'Ordered', 10, '2022-03-06 13:07:26', '2022-03-06 13:07:26'),
(5, 5, '2020-10-20 00:00:00', 3, 2, 'Ordered', 10, '2022-03-06 13:10:22', '2022-03-06 13:10:22'),
(6, NULL, '2020-10-20 00:00:00', 3, 2, 'Ordered', 10, '2022-03-11 00:56:46', '2022-03-11 00:56:46'),
(7, NULL, '2020-10-20 00:00:00', 3, 2, 'Ordered', 10, '2022-03-11 00:56:56', '2022-03-11 00:56:56'),
(8, NULL, '2020-10-20 00:00:00', 5, 10, 'Ordered', 45, '2022-03-11 01:56:47', '2022-03-11 01:56:47');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin', '2022-03-06 07:55:19', '2022-03-06 07:55:19'),
(2, 'Customer', '2022-03-06 07:55:19', '2022-03-06 07:55:19'),
(3, 'Manufacturer', '2022-03-06 07:56:07', '2022-03-06 07:56:07');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('Admin','Customer','Manufacturer') DEFAULT NULL,
  `status` enum('Active','Deactive') DEFAULT NULL,
  `isVerify` int(11) DEFAULT NULL,
  `otp` int(11) DEFAULT NULL,
  `expiryOtpTime` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `gender`, `password`, `role`, `status`, `isVerify`, `otp`, `expiryOtpTime`, `createdAt`, `updatedAt`) VALUES
(1, 'jay', 'jay@gmail.com', 'male', '$2a$08$wSLdZ9baSsMkytIDWYkj3.206DtYxjnD1zCbQG5mW3YXUtBMvFlDC', 'Admin', 'Active', 0, NULL, NULL, '2022-03-06 07:02:10', '2022-03-06 07:02:10'),
(2, 'komal', 'komal@gmail.com', 'female', '$2a$08$Y1pZjOVqiqPOJUf1tQMuPe8jBpBU90fHNfPtkIz.j5iuxXSJ3zQc6', 'Customer', 'Active', 0, NULL, NULL, '2022-03-06 07:05:03', '2022-03-06 07:05:03'),
(3, 'komal2', 'komal2@gmail.com', 'female', '$2a$08$40kQnL4fvK8SIqAYyLuQ2ekNU9V87f8Tb8ZqkH4CG6JKd/Wuvj3wm', 'Customer', 'Active', 1, NULL, NULL, '2022-03-06 07:07:17', '2022-03-06 07:07:17'),
(4, 'deep', 'deep@gmail.com', 'male', '$2a$08$qGsJhOZgmpW5X4yBje3t.eXbsFX2uPkn1ERSQ41wj1hbz5MrRUG9e', 'Manufacturer', 'Active', 0, NULL, NULL, '2022-03-06 07:09:22', '2022-03-06 07:09:22'),
(5, 'deep2', 'deep2@gmail.com', 'male', '$2a$08$r4yQQ2j.tHvNi2DDraiuLedd0FtOhrno.y6iRYosqyZmYAwaeQEES', 'Manufacturer', 'Active', 0, NULL, NULL, '2022-03-06 07:10:21', '2022-03-06 07:10:21'),
(6, 'deep3', 'deep3@gmail.com', 'male', '$2a$08$EI83VW5GEjG/ptxvYHdoC.U6N5OZCNr1u5OllfBbbG27iReHlRd22', 'Manufacturer', 'Deactive', 1, NULL, NULL, '2022-03-06 07:11:07', '2022-03-06 07:11:07'),
(7, 'jay', NULL, NULL, '$2a$08$J84ntwaB1K1WzEhe6hcRbuX.WRb9PXTcuV.AxGois3NIh0slKqJUS', NULL, NULL, NULL, NULL, NULL, '2022-03-06 12:01:40', '2022-03-06 12:01:40'),
(8, 'jay', NULL, NULL, '$2a$08$rr3VfOaKf4G.OGJ2GDYBdeRjpLZ3tO..vs/laLR.yRT19FftQjJKW', NULL, NULL, NULL, NULL, NULL, '2022-03-06 12:03:26', '2022-03-06 12:03:26'),
(9, 'jaydeep', 'jaydeep@gmail.com', 'male', '$2a$08$p.evoo.OZg171D7Ue87BVOpFoqd69L.JHUTnfVE6fmb52G2v6p88q', NULL, 'Active', 1, NULL, NULL, '2022-03-06 12:11:54', '2022-03-06 12:11:54'),
(10, 'jaydeep_sang', 'jaydeepSang@gmail.com', 'male', '$2a$08$5Bc2D4OdMmf0piXRe6s2wOnCSabEbx3m8Owf0YfXMC12Du8OunOom', 'Customer', 'Active', 1, NULL, NULL, '2022-03-06 12:58:51', '2022-03-06 12:58:51'),
(11, 'mohit', 'mohit@gmail.com', 'male', '$2a$08$DCvmwPDkgfCJB7KiZNPcjeX5pfB3YAC3gFKwVtQrPCkH.ChgarbUe', 'Manufacturer', 'Active', 0, NULL, NULL, '2022-03-11 00:54:29', '2022-03-11 00:54:29');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `roleId` int(11) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`createdAt`, `updatedAt`, `roleId`, `userId`) VALUES
('2022-03-06 07:02:10', '2022-03-06 07:02:10', 1, 1),
('2022-03-06 07:05:03', '2022-03-06 07:05:03', 1, 2),
('2022-03-06 07:10:21', '2022-03-06 07:10:21', 1, 5),
('2022-03-06 07:11:07', '2022-03-06 07:11:07', 1, 6),
('2022-03-11 00:54:29', '2022-03-11 00:54:29', 1, 11),
('2022-03-06 07:07:17', '2022-03-06 07:07:17', 2, 3),
('2022-03-06 12:58:51', '2022-03-06 12:58:51', 2, 10),
('2022-03-06 07:09:22', '2022-03-06 07:09:22', 3, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `items_ibfk_5` (`manufacturerId`);

--
-- Indexes for table `manufactures`
--
ALTER TABLE `manufactures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_ibfk_8` (`userId`),
  ADD KEY `orders_ibfk_9` (`itemId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`roleId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `manufactures`
--
ALTER TABLE `manufactures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`manufacturerId`) REFERENCES `manufactures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `items_ibfk_2` FOREIGN KEY (`manufacturerId`) REFERENCES `manufactures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `items_ibfk_3` FOREIGN KEY (`manufacturerId`) REFERENCES `manufactures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `items_ibfk_4` FOREIGN KEY (`manufacturerId`) REFERENCES `manufactures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `items_ibfk_5` FOREIGN KEY (`manufacturerId`) REFERENCES `manufactures` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `manufactures`
--
ALTER TABLE `manufactures`
  ADD CONSTRAINT `manufactures_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_10` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_11` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_12` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_6` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_7` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_8` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_9` FOREIGN KEY (`itemId`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
