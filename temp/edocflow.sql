-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2025 at 08:18 PM
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
-- Table structure for table `administrativelevel`
--

CREATE TABLE `administrativelevel` (
  `uuid` tinyint(1) NOT NULL,
  `name` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `administrativelevel`
--

INSERT INTO `administrativelevel` (`uuid`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Trung ương', '2025-05-08 19:49:02', '2025-05-08 19:49:02'),
(2, 'Cấp tỉnh', '2025-05-08 19:49:02', '2025-05-08 19:49:02'),
(3, 'Cấp huyện', '2025-05-08 19:49:02', '2025-05-08 19:49:02'),
(4, 'Cấp xã', '2025-05-08 19:49:02', '2025-05-08 19:49:02');

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
('324cf553-fccd-11ef-b13b-089798d3', 'Nghệ thuật', '2025-03-09 16:59:31', '2025-04-13 18:19:39', 0),
('97cea305-187a-11f0-bb92-089798d3', 'Công nghiệp', '2025-04-13 22:18:46', '2025-04-14 20:03:28', 0);

-- --------------------------------------------------------

--
-- Table structure for table `issuingauthority`
--

CREATE TABLE `issuingauthority` (
  `uuid` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `administrativelevel_id` tinyint(1) DEFAULT NULL
  `name` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_removed` tinyint(1) DEFAULT 0,
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `issuingauthority`
--

INSERT INTO `issuingauthority` (`uuid`, `name`, `created_at`, `updated_at`, `is_removed`, `administrativelevel_id`) VALUES
('41691e42-2cf2-11f0-9674-089798d3', 'Bộ trưởng, Thủ trưởng cơ quan ngang bộ', '2025-05-09 23:25:43', '2025-05-09 23:25:43', 0, 1),
('4822cfd0-2cf2-11f0-9674-089798d3', 'Tổng Kiểm toán Nhà nước', '2025-05-09 23:25:55', '2025-05-09 23:25:55', 0, 1),
('4eef6746-2cf2-11f0-9674-089798d3', 'Hội đồng thẩm phán TAND tối cao', '2025-05-09 23:26:06', '2025-05-09 23:26:06', 0, 1),
('53c2b8d5-2cf2-11f0-9674-089798d3', 'Chánh án TAND tối cao', '2025-05-09 23:26:14', '2025-05-09 23:26:14', 0, 1),
('5b144b5c-2cf2-11f0-9674-089798d3', 'Viện trưởng VKSND tối cao', '2025-05-09 23:26:26', '2025-05-09 23:26:26', 0, 1),
('6af857b7-2cf1-11f0-9674-089798d3', 'Quốc hội', '2025-05-09 23:19:44', '2025-05-09 23:19:44', 0, 1),
('76014082-2cf1-11f0-9674-089798d3', 'Ủy ban thường vụ Quốc hội', '2025-05-09 23:20:02', '2025-05-09 23:20:02', 0, 1),
('7e271345-2cf1-11f0-9674-089798d3', 'Chủ tịch nước', '2025-05-09 23:20:16', '2025-05-09 23:20:16', 0, 1),
('e6dbe80d-2cf1-11f0-9674-089798d3', 'Thủ tướng Chính phủ', '2025-05-09 23:23:12', '2025-05-09 23:23:12', 0, 1),
('ea7a876b-fcd2-11ef-b13b-089798d3', 'Sở thông tin Truyền thông', '2025-03-09 17:40:27', '2025-05-12 01:10:08', 0, 3),
('f1aed81d-fcd2-11ef-b13b-089798d3', 'Sở Giao thông Vận tái', '2025-03-09 17:40:39', '2025-05-12 01:11:54', 0, 4);

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
('98745c41-2e92-11f0-9674-089798d3', 'edd70544-f73e-11ef-9eb4-089798d3', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkZDcwNTQ0LWY3M2UtMTFlZi05ZWI0LTA4OTc5OGQzIiwiaWF0IjoxNzQ2OTg2NzYwLCJleHAiOjE3NDY5ODg1NjB9.HgxM5OwfKTkDQxgIFESjFNKjtjF_Wn5r_R5hrgjDH7M', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkZDcwNTQ0LWY3M2UtMTFlZi05ZWI0LTA4OTc5OGQzIiwiaWF0IjoxNzQ2OTg2NzYwLCJleHAiOjE3NDk1Nzg3NjB9.uorNENvDjQasKXqWyj8sF3Qnu_NKMuOhhBuSeMMAFeY'),
('d0d2d9c2-2e07-11f0-9674-089798d3', '8c951845-fb31-11ef-8991-309c23d7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjOTUxODQ1LWZiMzEtMTFlZi04OTkxLTMwOWMyM2Q3IiwiaWF0IjoxNzQ2OTI3MTU0LCJleHAiOjE3NDY5Mjg5NTR9.4SDdLsGaH4350OJmdaP2CA_Gmfx0I0SgPYZ0iB2K4nY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjOTUxODQ1LWZiMzEtMTFlZi04OTkxLTMwOWMyM2Q3IiwiaWF0IjoxNzQ2OTI3MTU1LCJleHAiOjE3NDk1MTkxNTV9.2hpriVsUMRIRtxuuocMGf28K43bB3_SllmTyD9gI8jg');

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
('9bdc8ea4-fcba-11ef-b13b-089798d3', 'Nghị quyết', '2025-03-09 14:46:28', '2025-03-09 16:16:40', 0),
('e7fc979a-1935-11f0-991b-089798d3', 'Thông tư', '2025-04-14 20:39:36', '2025-04-14 20:47:17', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uuid` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `permission_id` tinyint(1) DEFAULT NULL,
  `issuingauthority_id` char(32) COLLATE utf8_unicode_ci DEFAULT NULL
  `name` varchar(75) COLLATE utf8_unicode_ci NOT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `birth_day` date DEFAULT NULL,
  `phone` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(75) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `avatar` varchar(75) COLLATE utf8_unicode_ci DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uuid`, `permission_id`, `name`, `gender`, `birth_day`, `phone`, `email`, `username`, `password`, `created_at`, `updated_at`, `avatar`, `issuingauthority_id`) VALUES
('8c951845-fb31-11ef-8991-309c23d7', 1, 'Nào đó', 1, NULL, '0123789456', 'naodo@gmail.com', 'some1', 'ef73781effc5774100f87fe2f437a435', '2025-03-07 15:52:48', '2025-05-05 21:29:19', 'resources/ae6e246332d700ce171e7ca066e19a27.jpg', NULL),
('edd70544-f73e-11ef-9eb4-089798d3', 1, 'Quản Trị Viên', 0, '1998-01-25', '0326090580', 'luonghai5622@gmail.com', 'admin', 'ef73781effc5774100f87fe2f437a435', '2025-03-02 15:18:32', '2025-05-06 21:35:08', 'resources/d35a42d2866569014927e893dfb5b656.jpg', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrativelevel`
--
ALTER TABLE `administrativelevel`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `field`
--
ALTER TABLE `field`
  ADD PRIMARY KEY (`uuid`);

--
-- Indexes for table `issuingauthority`
--
ALTER TABLE `issuingauthority`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `issuingauthority_administrativelevel` (`administrativelevel_id`);

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
  ADD KEY `user_permission_pk1` (`permission_id`),
  ADD KEY `user_issuingauthority` (`issuingauthority_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `issuingauthority`
--
ALTER TABLE `issuingauthority`
  ADD CONSTRAINT `issuingauthority_administrativelevel` FOREIGN KEY (`administrativelevel_id`) REFERENCES `administrativelevel` (`uuid`) ON UPDATE CASCADE;

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
  ADD CONSTRAINT `user_issuingauthority` FOREIGN KEY (`issuingauthority_id`) REFERENCES `issuingauthority` (`uuid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `user_permission_pk1` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`uuid`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
