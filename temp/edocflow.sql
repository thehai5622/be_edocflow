-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2025 at 02:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

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
  `name` varchar(75) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_removed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `administrativelevel`
--

INSERT INTO `administrativelevel` (`uuid`, `name`, `created_at`, `updated_at`, `is_removed`) VALUES
(1, 'Trung ương', '2025-05-08 19:49:02', '2025-05-08 19:49:02', 0),
(2, 'Cấp tỉnh', '2025-05-08 19:49:02', '2025-05-08 19:49:02', 0),
(3, 'Cấp huyện', '2025-05-08 19:49:02', '2025-05-08 19:49:02', 0),
(4, 'Cấp xã', '2025-05-08 19:49:02', '2025-05-08 19:49:02', 0);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `uuid` char(32) NOT NULL,
  `issuingauthority_id` char(32) DEFAULT NULL,
  `name` varchar(75) NOT NULL,
  `is_handler` tinyint(1) DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_removed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`uuid`, `issuingauthority_id`, `name`, `is_handler`, `created_at`, `updated_at`, `is_removed`) VALUES
('187dfe9c-5585-11f0-8b29-309c23d7', '6af857b7-2cf1-11f0-9674-089798d3', 'Ngoại vụ', 0, '2025-06-30 14:37:34', '2025-06-30 14:37:34', 0),
('6c1b7393-556d-11f0-8b29-309c23d7', '4eef6746-2cf2-11f0-9674-089798d3', 'Phòng công văn', 1, '2025-06-30 11:48:07', '2025-06-30 12:05:24', 0),
('6cf71324-5471-11f0-84eb-089798d3', '6af857b7-2cf1-11f0-9674-089798d3', 'Nội vụ', 0, '2025-06-29 05:44:18', '2025-06-30 12:09:44', 0),
('e8440156-5470-11f0-84eb-089798d3', '6af857b7-2cf1-11f0-9674-089798d3', 'Công văn', 1, '2025-06-29 05:40:35', '2025-06-30 12:09:44', 0);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

CREATE TABLE `document` (
  `uuid` char(32) NOT NULL,
  `user_id` char(32) DEFAULT NULL,
  `from_issuingauthority_id` char(32) DEFAULT NULL,
  `issuingauthority_id` char(32) DEFAULT NULL,
  `usersign_id` char(32) DEFAULT NULL,
  `field_id` char(32) DEFAULT NULL,
  `release` datetime DEFAULT NULL,
  `templatefile_id` char(32) DEFAULT NULL,
  `reference_number` varchar(20) DEFAULT NULL,
  `summary` varchar(75) DEFAULT NULL,
  `original_location` varchar(75) DEFAULT NULL,
  `number_releases` int(2) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `urgency_level` tinyint(1) DEFAULT NULL,
  `confidentiality_level` tinyint(1) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_removed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`uuid`, `user_id`, `from_issuingauthority_id`, `issuingauthority_id`, `usersign_id`, `field_id`, `release`, `templatefile_id`, `reference_number`, `summary`, `original_location`, `number_releases`, `status`, `urgency_level`, `confidentiality_level`, `created_at`, `updated_at`, `is_removed`) VALUES
('2b26162f-41bb-11f0-9273-309c23d7', 'edd70544-f73e-11ef-9eb4-089798d3', '6af857b7-2cf1-11f0-9674-089798d3', '6af857b7-2cf1-11f0-9674-089798d3', 'edd70544-f73e-11ef-9eb4-089798d3', '1c159b67-fccd-11ef-b13b-089798d3', '2026-01-01 00:00:00', 'e85dd89d-fbc4-11ef-8991-309c23d7', NULL, 'bb', 'bb', 1, 3, 0, 0, '2025-06-05 10:14:18', '2025-06-05 11:45:39', 0),
('41039ffa-4176-11f0-86e9-089798d3', 'edd70544-f73e-11ef-9eb4-089798d3', '6af857b7-2cf1-11f0-9674-089798d3', '6af857b7-2cf1-11f0-9674-089798d3', 'edd70544-f73e-11ef-9eb4-089798d3', '324cf553-fccd-11ef-b13b-089798d3', '2026-01-01 00:00:00', 'e85dd89d-fbc4-11ef-8991-309c23d7', NULL, 'aa', 'aa', 1, 4, 0, 0, '2025-06-05 02:00:57', '2025-06-05 02:03:39', 0),
('b48f4319-3b6d-11f0-8dd8-309c23d7', '418926cb-3aa1-11f0-8dd8-309c23d7', '53c2b8d5-2cf2-11f0-9674-089798d3', '6af857b7-2cf1-11f0-9674-089798d3', NULL, '97cea305-187a-11f0-bb92-089798d3', NULL, 'f99141d0-fcc4-11ef-b13b-089798d3', NULL, 'Hướng dẫn thực hiện Nghị định số X/2024/NĐ-CP', 'Kho', 2, 2, 2, 0, '2025-05-28 09:44:41', '2025-06-07 10:38:03', 0),
('d8bc0d6b-352b-11f0-b4a3-309c23d7', 'edd70544-f73e-11ef-9eb4-089798d3', '6af857b7-2cf1-11f0-9674-089798d3', '53c2b8d5-2cf2-11f0-9674-089798d3', NULL, '1c159b67-fccd-11ef-b13b-089798d3', NULL, 'e85dd89d-fbc4-11ef-8991-309c23d7', NULL, 'Một đoạn trích yếu nào đó', 'Tổng khu hành chính', 3, 5, 0, 0, '2025-05-20 10:38:07', '2025-06-13 00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `field`
--

CREATE TABLE `field` (
  `uuid` char(32) NOT NULL,
  `name` varchar(75) NOT NULL,
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
('97cea305-187a-11f0-bb92-089798d3', 'Công nghiệp', '2025-04-13 22:18:46', '2025-04-14 20:03:28', 0),
('d9a8e3cd-543f-11f0-84eb-089798d3', 'Nội vụ', '2025-06-28 23:49:25', '2025-06-28 23:49:25', 0),
('dea6f867-543f-11f0-84eb-089798d3', 'Tư pháp', '2025-06-28 23:49:34', '2025-06-28 23:49:34', 0),
('eb9aaa71-543f-11f0-84eb-089798d3', 'Giáo dục', '2025-06-28 23:49:56', '2025-06-28 23:49:56', 0),
('f3c3b6c8-543f-11f0-84eb-089798d3', 'An ninh', '2025-06-28 23:50:09', '2025-06-28 23:50:09', 0),
('ff41222d-543f-11f0-84eb-089798d3', 'Y tế', '2025-06-28 23:50:29', '2025-06-28 23:50:29', 0);

-- --------------------------------------------------------

--
-- Table structure for table `issuingauthority`
--

CREATE TABLE `issuingauthority` (
  `uuid` char(32) NOT NULL,
  `administrativelevel_id` tinyint(1) DEFAULT NULL,
  `name` varchar(75) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_removed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `issuingauthority`
--

INSERT INTO `issuingauthority` (`uuid`, `administrativelevel_id`, `name`, `created_at`, `updated_at`, `is_removed`) VALUES
('41691e42-2cf2-11f0-9674-089798d3', 1, 'Bộ trưởng, Thủ trưởng cơ quan ngang bộ', '2025-05-09 23:25:43', '2025-05-09 23:25:43', 0),
('4822cfd0-2cf2-11f0-9674-089798d3', 1, 'Tổng Kiểm toán Nhà nước', '2025-05-09 23:25:55', '2025-05-09 23:25:55', 0),
('4eef6746-2cf2-11f0-9674-089798d3', 1, 'Hội đồng thẩm phán TAND tối cao', '2025-05-09 23:26:06', '2025-05-09 23:26:06', 0),
('53c2b8d5-2cf2-11f0-9674-089798d3', 1, 'Chánh án TAND tối cao', '2025-05-09 23:26:14', '2025-05-09 23:26:14', 0),
('5b144b5c-2cf2-11f0-9674-089798d3', 1, 'Viện trưởng VKSND tối cao', '2025-05-09 23:26:26', '2025-05-09 23:26:26', 0),
('6af857b7-2cf1-11f0-9674-089798d3', 1, 'Quốc hội', '2025-05-09 23:19:44', '2025-05-09 23:19:44', 0),
('76014082-2cf1-11f0-9674-089798d3', 1, 'Ủy ban thường vụ Quốc hội', '2025-05-09 23:20:02', '2025-05-09 23:20:02', 0),
('7e271345-2cf1-11f0-9674-089798d3', 1, 'Chủ tịch nước', '2025-05-09 23:20:16', '2025-05-09 23:20:16', 0),
('e6dbe80d-2cf1-11f0-9674-089798d3', 1, 'Thủ tướng Chính phủ', '2025-05-09 23:23:12', '2025-05-09 23:23:12', 0),
('ea7a876b-fcd2-11ef-b13b-089798d3', 3, 'Sở thông tin Truyền thông', '2025-03-09 17:40:27', '2025-05-12 01:10:08', 0),
('f1aed81d-fcd2-11ef-b13b-089798d3', 4, 'Sở Giao thông Vận tái', '2025-03-09 17:40:39', '2025-05-12 01:11:54', 0);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `uuid` char(32) NOT NULL,
  `user_id` char(32) DEFAULT NULL,
  `title` varchar(75) DEFAULT NULL,
  `body` varchar(200) DEFAULT NULL,
  `data` varchar(200) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`uuid`, `user_id`, `title`, `body`, `data`, `is_read`, `created_at`, `updated_at`) VALUES
('2bb50271-41bb-11f0-9273-309c23d7', '8c951845-fb31-11ef-8991-309c23d7', 'Văn bản đến', 'Văn bản đến mới!', '{\"type\":\"document\",\"uuid\":\"\", \"more\":\"in\"}', 0, '2025-06-05 10:14:19', '2025-06-05 17:09:50'),
('2bb51437-41bb-11f0-9273-309c23d7', 'edd70544-f73e-11ef-9eb4-089798d3', 'Văn bản đến', 'Văn bản đến mới!', '{\"type\":\"document\",\"uuid\":\"\",\"more\": \"in\"}', 0, '2025-06-05 10:14:19', '2025-06-05 17:11:56'),
('d21bd9b0-4350-11f0-9273-309c23d7', '418926cb-3aa1-11f0-8dd8-309c23d7', 'Văn bản đi', 'Văn bản b48f4319-3b6d-11f0-8dd8-309c23d7 đã được tiếp nhận!', '{\"type\":\"document\",\"uuid\":\"b48f4319-3b6d-11f0-8dd8-309c23d7\",\"more\":\"out\"}', 0, '2025-06-07 10:38:04', '2025-06-07 10:38:04'),
('eed01248-41c7-11f0-9273-309c23d7', 'edd70544-f73e-11ef-9eb4-089798d3', 'Văn bản đi', 'Văn bản 2b26162f-41bb-11f0-9273-309c23d7 đã được ký duyệt!', '{\"type\":\"document\",\"uuid\":\"2b26162f-41bb-11f0-9273-309c23d7\",\"more\":\"out\"}', 0, '2025-06-05 11:45:40', '2025-06-05 17:09:59'),
('eed2f579-41c7-11f0-9273-309c23d7', '8c951845-fb31-11ef-8991-309c23d7', 'Văn bản đi', 'Văn bản 2b26162f-41bb-11f0-9273-309c23d7 đã được ký duyệt!', '{\"type\":\"document\",\"uuid\":\"2b26162f-41bb-11f0-9273-309c23d7\",\"more\":\"out\"}', 0, '2025-06-05 11:45:40', '2025-06-05 16:28:57');

-- --------------------------------------------------------

--
-- Table structure for table `permission`
--

CREATE TABLE `permission` (
  `uuid` tinyint(1) NOT NULL,
  `name` varchar(75) NOT NULL,
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
  `uuid` char(32) NOT NULL,
  `user_id` char(32) DEFAULT NULL,
  `typetemplatefile_id` char(32) DEFAULT NULL,
  `name` varchar(75) NOT NULL,
  `file` varchar(100) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `note` varchar(500) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_removed` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `templatefile`
--

INSERT INTO `templatefile` (`uuid`, `user_id`, `typetemplatefile_id`, `name`, `file`, `type`, `status`, `note`, `created_at`, `updated_at`, `is_removed`) VALUES
('7f3cd833-fbc7-11ef-8991-309c23d7', '8c951845-fb31-11ef-8991-309c23d7', '9bdc8ea4-fcba-11ef-b13b-089798d3', 'Một file mẫu khác', 'resources/somefile.txt', 1, 1, 'Một đoạn mô tả khác', '2025-03-08 09:46:09', '2025-03-09 16:04:21', 0),
('a03eb04c-fbc7-11ef-8991-309c23d7', '8c951845-fb31-11ef-8991-309c23d7', '9bdc8ea4-fcba-11ef-b13b-089798d3', 'Một file mẫu khác nhưng là cá nhân', 'resources/somefile.txt', 0, 1, 'Một đoạn mô tả khác nhưng là cá nhân', '2025-03-08 09:47:05', '2025-03-09 16:04:25', 0),
('e85dd89d-fbc4-11ef-8991-309c23d7', 'edd70544-f73e-11ef-9eb4-089798d3', '886419de-fcba-11ef-b13b-089798d3', 'File mẫu nào đó', 'resources/somefile.txt', 1, 1, 'Ghi chú nào đó', '2025-03-08 09:27:37', '2025-03-09 16:01:26', 0),
('f99141d0-fcc4-11ef-b13b-089798d3', 'edd70544-f73e-11ef-9eb4-089798d3', '886419de-fcba-11ef-b13b-089798d3', 'Một tờ trình nào đó', 'resources/somefile.txt', 1, 1, 'Mô tả tờ trình nào đó', '2025-03-09 16:00:40', '2025-03-09 16:00:40', 0);

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `uuid` char(32) NOT NULL,
  `user_id` char(32) NOT NULL,
  `access_token` char(181) NOT NULL,
  `refresh_token` char(181) NOT NULL,
  `fcm_token` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`uuid`, `user_id`, `access_token`, `refresh_token`, `fcm_token`) VALUES
('a141e357-4d18-11f0-8d95-089798d3', '8c951845-fb31-11ef-8991-309c23d7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjOTUxODQ1LWZiMzEtMTFlZi04OTkxLTMwOWMyM2Q3IiwiaWF0IjoxNzUwMzQyODYyLCJleHAiOjE3NTAzNDQ2NjJ9.OK_2oq7PUUVIrTuZ-NCprkKYz_crsm0Hpr_KnNo33LE', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjOTUxODQ1LWZiMzEtMTFlZi04OTkxLTMwOWMyM2Q3IiwiaWF0IjoxNzUwMzQyODYyLCJleHAiOjE3NTI5MzQ4NjJ9.qH90B-dbZRO3sBn62027l7Vc6Y4X9d107mPvfHTFwSI', 'null'),
('c4dd8dde-55a9-11f0-8b29-309c23d7', 'edd70544-f73e-11ef-9eb4-089798d3', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkZDcwNTQ0LWY3M2UtMTFlZi05ZWI0LTA4OTc5OGQzIiwiaWF0IjoxNzUxMjg0ODA1LCJleHAiOjE3NTEyODY2MDV9.725E0h6SqYS2Ei2ijlOPW2YM3206vCRuCBrjgB8tzDk', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkZDcwNTQ0LWY3M2UtMTFlZi05ZWI0LTA4OTc5OGQzIiwiaWF0IjoxNzUxMjg0ODA1LCJleHAiOjE3NTM4NzY4MDV9.yqf4pn8xZ9c9lqb3OSUxfni4wBYmfFkCxAZr8bQooFA', 'null'),
('d84fbf13-3ba2-11f0-8dd8-309c23d7', '418926cb-3aa1-11f0-8dd8-309c23d7', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQxODkyNmNiLTNhYTEtMTFmMC04ZGQ4LTMwOWMyM2Q3IiwiaWF0IjoxNzQ4NDIzMTA0LCJleHAiOjE3NDg0MjQ5MDR9.15lVK_k3PuYSaSNaSmRUOorhdelx0OjONzfAg267854', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQxODkyNmNiLTNhYTEtMTFmMC04ZGQ4LTMwOWMyM2Q3IiwiaWF0IjoxNzQ4NDIzMTA0LCJleHAiOjE3NTEwMTUxMDR9.h1dwPxCm8p4C-0PorMJWSdMmG-YGgH7iaZLyaO6OU4I', 'fSkO1iNRRoim0gse5xiPiS:APA91bGIKust6WRsG6nBemLlYSia2KbZkD5gP-UPnelZRf3dXQqc6jH6YqxgsV0zV52Qc0-UHOx7_DLJTJltdGEWWfN_2pHZtzm7Yl-E_WBux0JIxmmHZuQ');

-- --------------------------------------------------------

--
-- Table structure for table `typetemplatefile`
--

CREATE TABLE `typetemplatefile` (
  `uuid` char(32) NOT NULL,
  `name` varchar(75) NOT NULL,
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
('96ec3041-5440-11f0-84eb-089798d3', 'Chỉ thị', '2025-06-28 23:54:43', '2025-06-28 23:54:43', 0),
('9a1a3f43-5440-11f0-84eb-089798d3', 'Quy chế', '2025-06-28 23:54:48', '2025-06-28 23:54:48', 0),
('9bdc8ea4-fcba-11ef-b13b-089798d3', 'Nghị quyết', '2025-03-09 14:46:28', '2025-03-09 16:16:40', 0),
('a48b94e6-5440-11f0-84eb-089798d3', 'Quy định', '2025-06-28 23:55:06', '2025-06-28 23:55:06', 0),
('a7f9dc21-5440-11f0-84eb-089798d3', 'Hướng dẫn', '2025-06-28 23:55:12', '2025-06-28 23:55:12', 0),
('ae3f703b-5440-11f0-84eb-089798d3', 'Báo cáo', '2025-06-28 23:55:22', '2025-06-28 23:55:22', 0),
('b368fc77-5440-11f0-84eb-089798d3', 'Biên bản', '2025-06-28 23:55:31', '2025-06-28 23:55:31', 0),
('e7fc979a-1935-11f0-991b-089798d3', 'Thông tư', '2025-04-14 20:39:36', '2025-04-14 20:47:17', 0),
('fc842fc6-5494-11f0-84eb-089798d3', 'Vẫn có đấy', '2025-06-29 09:58:51', '2025-06-29 09:59:02', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `uuid` char(32) NOT NULL,
  `permission_id` tinyint(1) DEFAULT NULL,
  `issuingauthority_id` char(32) DEFAULT NULL,
  `name` varchar(75) NOT NULL,
  `gender` tinyint(1) DEFAULT NULL,
  `birth_day` date DEFAULT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(75) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `avatar` varchar(75) DEFAULT NULL,
  `status` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `department_id` char(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`uuid`, `permission_id`, `issuingauthority_id`, `name`, `gender`, `birth_day`, `phone`, `email`, `username`, `password`, `avatar`, `status`, `created_at`, `updated_at`, `department_id`) VALUES
('418926cb-3aa1-11f0-8dd8-309c23d7', 1, '53c2b8d5-2cf2-11f0-9674-089798d3', 'AA', 1, '2025-05-27', '321654987', '', 'aa', 'e10adc3949ba59abbe56e057f20f883e', 'resources/781943260ed800e0288102e91d010393.png', 1, '2025-05-27 09:21:11', '2025-06-30 14:41:09', '6c1b7393-556d-11f0-8b29-309c23d7'),
('8c951845-fb31-11ef-8991-309c23d7', 1, '6af857b7-2cf1-11f0-9674-089798d3', 'Nào đó', 1, NULL, '0123789456', 'naodo@gmail.com', 'some1', 'ef73781effc5774100f87fe2f437a435', 'resources/ae6e246332d700ce171e7ca066e19a27.jpg', 1, '2025-03-07 15:52:48', '2025-06-30 14:40:30', 'e8440156-5470-11f0-84eb-089798d3'),
('edd70544-f73e-11ef-9eb4-089798d3', 1, '6af857b7-2cf1-11f0-9674-089798d3', 'Quản Trị Viên', 0, '1998-01-25', '0326090580', 'luonghai5622@gmail.com', 'admin', 'ef73781effc5774100f87fe2f437a435', 'resources/f7b84f16effa5961c0118e832b4b3c20.jpg', 1, '2025-03-02 15:18:32', '2025-06-30 14:40:02', '6cf71324-5471-11f0-84eb-089798d3');

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
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `department_issuingauthority` (`issuingauthority_id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `reference_number` (`reference_number`),
  ADD KEY `document_field` (`field_id`),
  ADD KEY `document_templatefile` (`templatefile_id`),
  ADD KEY `document_user` (`user_id`),
  ADD KEY `document_user2` (`usersign_id`),
  ADD KEY `document_issuingauthority` (`issuingauthority_id`),
  ADD KEY `document_issuingauthority2` (`from_issuingauthority_id`);

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
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`uuid`),
  ADD KEY `notification_user` (`user_id`);

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
  ADD KEY `user_issuingauthority` (`issuingauthority_id`),
  ADD KEY `user_department` (`department_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrativelevel`
--
ALTER TABLE `administrativelevel`
  MODIFY `uuid` tinyint(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `permission`
--
ALTER TABLE `permission`
  MODIFY `uuid` tinyint(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_issuingauthority` FOREIGN KEY (`issuingauthority_id`) REFERENCES `issuingauthority` (`uuid`) ON UPDATE CASCADE;

--
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `document_field` FOREIGN KEY (`field_id`) REFERENCES `field` (`uuid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `document_issuingauthority` FOREIGN KEY (`issuingauthority_id`) REFERENCES `issuingauthority` (`uuid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `document_issuingauthority2` FOREIGN KEY (`from_issuingauthority_id`) REFERENCES `issuingauthority` (`uuid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `document_templatefile` FOREIGN KEY (`templatefile_id`) REFERENCES `templatefile` (`uuid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `document_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`uuid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `document_user2` FOREIGN KEY (`usersign_id`) REFERENCES `user` (`uuid`) ON UPDATE CASCADE;

--
-- Constraints for table `issuingauthority`
--
ALTER TABLE `issuingauthority`
  ADD CONSTRAINT `issuingauthority_administrativelevel` FOREIGN KEY (`administrativelevel_id`) REFERENCES `administrativelevel` (`uuid`) ON UPDATE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`uuid`) ON UPDATE CASCADE;

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
  ADD CONSTRAINT `user_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`uuid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `user_issuingauthority` FOREIGN KEY (`issuingauthority_id`) REFERENCES `issuingauthority` (`uuid`) ON UPDATE CASCADE,
  ADD CONSTRAINT `user_permission_pk1` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`uuid`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
