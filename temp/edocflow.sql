-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 02, 2025 at 04:39 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edocflow`
--

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `uuid` tinyint(1) NOT NULL,
  `name` varchar(75) NOT NULL,
  `create_at` datetime DEFAULT current_timestamp(),
  `update_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`uuid`, `name`, `create_at`, `update_at`) VALUES
(1, 'Quản trị viên', '2025-03-01 21:37:55', '2025-03-01 21:37:55');

-- --------------------------------------------------------

--
-- Table structure for table `templatefile`
--

CREATE TABLE `templatefile` (
  `uuid` char(32) NOT NULL,
  `user_id` char(32) DEFAULT NULL,
  `name` varchar(75) NOT NULL,
  `file` varchar(100) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `note` varchar(500) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `templatefile`
--

INSERT INTO `templatefile` (`uuid`, `user_id`, `name`, `file`, `type`, `status`, `note`, `created_at`, `updated_at`) VALUES
('7f3cd833-fbc7-11ef-8991-309c23d7', '8c951845-fb31-11ef-8991-309c23d7', 'Một file mẫu khác', 'resources/somefile.txt', 1, 1, 'Một đoạn mô tả khác', '2025-03-08 09:46:09', '2025-03-08 10:15:18'),
('a03eb04c-fbc7-11ef-8991-309c23d7', '8c951845-fb31-11ef-8991-309c23d7', 'Một file mẫu khác nhưng là cá nhân', 'resources/somefile.txt', 0, 1, 'Một đoạn mô tả khác nhưng là cá nhân', '2025-03-08 09:47:05', '2025-03-08 09:47:05'),
('e85dd89d-fbc4-11ef-8991-309c23d7', '8c951845-fb31-11ef-8991-309c23d7', 'File mẫu nào đó', 'resources/somefile.txt', 1, 1, 'Ghi chú nào đó', '2025-03-08 09:27:37', '2025-03-08 10:22:26');

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `uuid` char(32) NOT NULL,
  `user_id` char(32) NOT NULL,
  `access_token` char(181) NOT NULL,
  `refresh_token` char(181) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`uuid`, `user_id`, `access_token`, `refresh_token`) VALUES
('38cc22ac-fbd0-11ef-8991-309c23d7', '8c951845-fb31-11ef-8991-309c23d7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjOTUxODQ1LWZiMzEtMTFlZi04OTkxLTMwOWMyM2Q3IiwiaWF0IjoxNzQxNDA1NzE2LCJleHAiOjE3NDE0MDc1MTZ9.x5DDOsQqg-ICGPKlxjlFZpvMSowxCFyRfSF7TqPLKJw', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjOTUxODQ1LWZiMzEtMTFlZi04OTkxLTMwOWMyM2Q3IiwiaWF0IjoxNzQxNDA1NzE2LCJleHAiOjE3NDM5OTc3MTZ9.tDhdzLcartmlNhIJqiIwXGyIoe3r-lZ2ONBP3teZuvg'),
('ea7e37e7-fbc7-11ef-8991-309c23d7', 'edd70544-f73e-11ef-9eb4-089798d3', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkZDcwNTQ0LWY3M2UtMTFlZi05ZWI0LTA4OTc5OGQzIiwiaWF0IjoxNzQxNDAyMTQ5LCJleHAiOjE3NDE0MDM5NDl9.e6g40PliNNOkhM-R2JsrqsscQATEo5ZP-QikgPRqfYk', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkZDcwNTQ0LWY3M2UtMTFlZi05ZWI0LTA4OTc5OGQzIiwiaWF0IjoxNzQxNDAyMTQ5LCJleHAiOjE3NDM5OTQxNDl9.oHFMqo3cwdp1imoYZ1koPa0BxEXPtbB6wD60YMVY8kE');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uuid` char(32) NOT NULL,
  `permission_id` tinyint(1) DEFAULT NULL,
  `name` varchar(75) NOT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `birth_day` date DEFAULT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(75) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `create_at` datetime DEFAULT current_timestamp(),
  `update_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uuid`, `permission_id`, `name`, `gender`, `birth_day`, `phone`, `email`, `username`, `password`, `create_at`, `update_at`) VALUES
('8c951845-fb31-11ef-8991-309c23d7', 1, 'Nào đó', 1, NULL, '0123789456', 'naodo@gmail.com', 'some1', 'some1', '2025-03-07 15:52:48', '2025-03-07 15:52:48'),
('edd70544-f73e-11ef-9eb4-089798d3', 1, 'Quản Trị Viên', NULL, NULL, '0326090580', 'luonghai5622@gmail.com', 'admin', '1234abcd', '2025-03-02 15:18:32', '2025-03-08 09:10:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `permission`
--
ALTER TABLE `permission`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `templatefile`
--
ALTER TABLE `templatefile`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `templatefile_user` (`user_id`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `token_user` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `user_permission_pk1` (`permission_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `templatefile`
--
ALTER TABLE `templatefile`
  ADD CONSTRAINT `templatefile_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`uuid`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `token`
--
ALTER TABLE `token`
  ADD CONSTRAINT `token_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_permission_pk1` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`uuid`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
