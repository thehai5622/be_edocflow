-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 09, 2025 at 11:26 AM
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
-- Table structure for table `field`
--

CREATE TABLE `field` (
  `uuid` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_removed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `field`
--

INSERT INTO `field` (`uuid`, `name`, `created_at`, `updated_at`, `is_removed`) VALUES
('1c159b67-fccd-11ef-b13b-089798d3', 'Giải trí', '2025-03-09 16:58:54', '2025-03-09 17:00:56', 0),
('2e307e6b-fccd-11ef-b13b-089798d3', 'Truyền thống - Văn hóa', '2025-03-09 16:59:24', '2025-03-09 16:59:24', 0),
('324cf553-fccd-11ef-b13b-089798d3', 'Nghệ thuật', '2025-03-09 16:59:31', '2025-03-09 16:59:31', 0);

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `uuid` tinyint(1) NOT NULL,
  `name` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `permission`
--

INSERT INTO `permission` (`uuid`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Quản trị viên', '2025-03-01 21:37:55', '2025-03-01 21:37:55');

-- --------------------------------------------------------

--
-- Table structure for table `templatefile`
--

CREATE TABLE `templatefile` (
  `uuid` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `typetemplatefile_id` char(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `file` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `type` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `note` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_removed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `templatefile`
--

INSERT INTO `templatefile` (`uuid`, `user_id`, `name`, `file`, `type`, `status`, `note`, `created_at`, `updated_at`, `typetemplatefile_id`, `is_removed`) VALUES
('7f3cd833-fbc7-11ef-8991-309c23d7', '8c951845-fb31-11ef-8991-309c23d7', 'Một file mẫu khác', 'resources/somefile.txt', 1, 1, 'Một đoạn mô tả khác', '2025-03-08 09:46:09', '2025-03-09 16:04:21', '9bdc8ea4-fcba-11ef-b13b-089798d3', 0),
('a03eb04c-fbc7-11ef-8991-309c23d7', '8c951845-fb31-11ef-8991-309c23d7', 'Một file mẫu khác nhưng là cá nhân', 'resources/somefile.txt', 0, 1, 'Một đoạn mô tả khác nhưng là cá nhân', '2025-03-08 09:47:05', '2025-03-09 16:04:25', '9bdc8ea4-fcba-11ef-b13b-089798d3', 0),
('e85dd89d-fbc4-11ef-8991-309c23d7', 'edd70544-f73e-11ef-9eb4-089798d3', 'File mẫu nào đó', 'resources/somefile.txt', 1, 1, 'Ghi chú nào đó', '2025-03-08 09:27:37', '2025-03-09 16:01:26', '886419de-fcba-11ef-b13b-089798d3', 0),
('f99141d0-fcc4-11ef-b13b-089798d3', 'edd70544-f73e-11ef-9eb4-089798d3', 'Một tờ trình nào đó', 'resources/somefile.txt', 1, 1, 'Mô tả tờ trình nào đó', '2025-03-09 16:00:40', '2025-03-09 16:00:40', '886419de-fcba-11ef-b13b-089798d3', 0);

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `uuid` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `access_token` char(181) COLLATE utf8_unicode_ci NOT NULL,
  `refresh_token` char(181) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`uuid`, `user_id`, `access_token`, `refresh_token`) VALUES
('38cc22ac-fbd0-11ef-8991-309c23d7', '8c951845-fb31-11ef-8991-309c23d7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjOTUxODQ1LWZiMzEtMTFlZi04OTkxLTMwOWMyM2Q3IiwiaWF0IjoxNzQxNDA1NzE2LCJleHAiOjE3NDE0MDc1MTZ9.x5DDOsQqg-ICGPKlxjlFZpvMSowxCFyRfSF7TqPLKJw', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjOTUxODQ1LWZiMzEtMTFlZi04OTkxLTMwOWMyM2Q3IiwiaWF0IjoxNzQxNDA1NzE2LCJleHAiOjE3NDM5OTc3MTZ9.tDhdzLcartmlNhIJqiIwXGyIoe3r-lZ2ONBP3teZuvg'),
('742dfbd6-fcca-11ef-b13b-089798d3', 'edd70544-f73e-11ef-9eb4-089798d3', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkZDcwNTQ0LWY3M2UtMTFlZi05ZWI0LTA4OTc5OGQzIiwiaWF0IjoxNzQxNTEzMTkzLCJleHAiOjE3NDE1MTQ5OTN9.o3bjHt7DWfKFq1yzHYwDAvSvE9snL9KT4vLOamdNF0M', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkZDcwNTQ0LWY3M2UtMTFlZi05ZWI0LTA4OTc5OGQzIiwiaWF0IjoxNzQxNTEzMTkzLCJleHAiOjE3NDQxMDUxOTN9.0CKzKAdvxZAQv2z-A9tb7ku1KxbVBqrZ68szewkitUc');

-- --------------------------------------------------------

--
-- Table structure for table `typetemplatefile`
--

CREATE TABLE `typetemplatefile` (
  `uuid` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_removed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `typetemplatefile`
--

INSERT INTO `typetemplatefile` (`uuid`, `name`, `created_at`, `updated_at`, `is_removed`) VALUES
('886419de-fcba-11ef-b13b-089798d3', 'Tờ trình', '2025-03-09 14:45:55', '2025-03-09 14:45:55', 0),
('886a0fd6-fcc7-11ef-b13b-089798d3', 'Chương trình', '2025-03-09 16:18:58', '2025-03-09 16:18:58', 0),
('9bdc8ea4-fcba-11ef-b13b-089798d3', 'Nghị quyết', '2025-03-09 14:46:28', '2025-03-09 16:16:40', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uuid` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `permission_id` tinyint(1) DEFAULT NULL,
  `name` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `birth_day` date DEFAULT NULL,
  `phone` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uuid`, `permission_id`, `name`, `gender`, `birth_day`, `phone`, `email`, `username`, `password`, `created_at`, `updated_at`) VALUES
('8c951845-fb31-11ef-8991-309c23d7', 1, 'Nào đó', 1, NULL, '0123789456', 'naodo@gmail.com', 'some1', 'some1', '2025-03-07 15:52:48', '2025-03-07 15:52:48'),
('edd70544-f73e-11ef-9eb4-089798d3', 1, 'Quản Trị Viên', NULL, NULL, '0326090580', 'luonghai5622@gmail.com', 'admin', '1234abcd', '2025-03-02 15:18:32', '2025-03-08 09:10:30');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `field`
--
ALTER TABLE `field`
  ADD PRIMARY KEY (`uuid`);

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
  ADD KEY `templatefile_user` (`user_id`),
  ADD KEY `templatefile_typetemplatefile` (`typetemplatefile_id`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `token_user` (`user_id`);

--
-- Indexes for table `typetemplatefile`
--
ALTER TABLE `typetemplatefile`
  ADD PRIMARY KEY (`uuid`);

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
  ADD CONSTRAINT `templatefile_typetemplatefile` FOREIGN KEY (`typetemplatefile_id`) REFERENCES `typetemplatefile` (`uuid`) ON UPDATE CASCADE,
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
