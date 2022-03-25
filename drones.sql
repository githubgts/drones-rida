-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2022 at 08:57 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `drones`
--

-- --------------------------------------------------------

--
-- Table structure for table `drones`
--

CREATE TABLE `drones` (
  `id` int(11) NOT NULL,
  `serial_no` varchar(100) NOT NULL,
  `model` enum('Lightweight','Middleweight','Cruiserweight','Heavyweight') NOT NULL DEFAULT 'Lightweight',
  `weight_limit` double(5,2) NOT NULL,
  `battery_capacity` int(11) NOT NULL,
  `state` enum('IDLE','LOADING','LOADED','DELIVERING','DELIVERED','RETURNING') NOT NULL DEFAULT 'IDLE',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `drones`
--

INSERT INTO `drones` (`id`, `serial_no`, `model`, `weight_limit`, `battery_capacity`, `state`, `created_at`, `updated_at`) VALUES
(1, 'SN3', 'Lightweight', 500.00, 100, 'IDLE', '2022-03-24 20:18:21', '2022-03-26 00:53:31'),
(13, 'SN6', 'Lightweight', 200.00, 100, 'IDLE', '2022-03-25 17:10:42', '2022-03-26 00:53:44'),
(14, 'SN5', 'Lightweight', 200.00, 100, 'IDLE', '2022-03-25 17:42:14', '2022-03-26 00:53:39'),
(15, 'SN4', 'Lightweight', 200.00, 100, 'IDLE', '2022-03-25 17:42:49', '2022-03-26 00:53:35'),
(17, 'SN1', 'Lightweight', 20.00, 100, 'IDLE', '2022-03-26 00:00:13', '2022-03-26 00:00:13');

-- --------------------------------------------------------

--
-- Table structure for table `loading_medications`
--

CREATE TABLE `loading_medications` (
  `id` int(11) NOT NULL,
  `drone_serial_no` varchar(100) NOT NULL,
  `med_code` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `loading_medications`
--

INSERT INTO `loading_medications` (`id`, `drone_serial_no`, `med_code`, `created_at`, `updated_at`) VALUES
(81, 'SN1', 'ab01', '2022-03-25 23:00:38', '2022-03-26 00:55:33'),
(82, 'SN1', 'ab02', '2022-03-25 23:00:38', '2022-03-26 00:55:37'),
(85, 'SN3', 'ab03', '2022-03-25 23:42:08', '2022-03-26 00:54:50'),
(86, 'SN3', 'ab04', '2022-03-25 23:42:08', '2022-03-26 00:54:57');

-- --------------------------------------------------------

--
-- Table structure for table `medication`
--

CREATE TABLE `medication` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `code` varchar(100) NOT NULL,
  `weight_limit` int(11) NOT NULL,
  `image` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medication`
--

INSERT INTO `medication` (`id`, `name`, `code`, `weight_limit`, `image`, `created_at`, `updated_at`) VALUES
(1, 'medicationone', 'ab01', 20, '', '2022-03-25 00:34:18', '2022-03-26 00:55:56'),
(2, 'medicationtwo', 'ab02', 30, '', '2022-03-25 01:04:05', '2022-03-26 00:56:36'),
(4, 'medicationthree', 'ab03', 10, '', '2022-03-25 01:04:21', '2022-03-26 00:56:41'),
(5, 'medicationfour', 'ab04', 20, '', '2022-03-25 11:17:39', '2022-03-26 00:56:45'),
(6, 'medicationtfive', 'ab05', 11, '', '2022-03-25 21:06:36', '2022-03-26 00:56:51'),
(8, 'medicationsix', 'ab06', 15, '', '2022-03-25 21:32:08', '2022-03-26 00:56:57'),
(9, 'medicationseven', 'ab07', 16, '0324gu', '2022-03-25 21:32:08', '2022-03-26 00:57:01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `drones`
--
ALTER TABLE `drones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `serial_no` (`serial_no`);

--
-- Indexes for table `loading_medications`
--
ALTER TABLE `loading_medications`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `med_code` (`med_code`);

--
-- Indexes for table `medication`
--
ALTER TABLE `medication`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `drones`
--
ALTER TABLE `drones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `loading_medications`
--
ALTER TABLE `loading_medications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `medication`
--
ALTER TABLE `medication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
