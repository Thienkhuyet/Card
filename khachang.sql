-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2019 at 12:13 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ql_khachhang`
--

-- --------------------------------------------------------

--
-- Table structure for table `khachang`
--

CREATE TABLE `khachang` (
  `KH_id` int(9) NOT NULL,
  `Hoten` varchar(150) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `emial` varchar(200) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `ngaysinh` date NOT NULL,
  `DC_id` int(11) NOT NULL,
  `TK_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `khachang`
--

INSERT INTO `khachang` (`KH_id`, `Hoten`, `emial`, `ngaysinh`, `DC_id`, `TK_id`) VALUES
(1, 'Nguyễn Minh Vương', 'minhvuongbvh@gmail.com', '1998-07-10', 1, 0),
(2, 'Thien khuyet', 'thienkhuyet@gmail.com', '1999-07-15', 0, 1),
(3, 'Thieuduong', 'duong@gmail.com', '1997-05-26', 2, 2),
(4, 'Duc dat', 'eshipper@logistic.com', '1997-06-17', 2, 2),
(5, 'Nuyá»…n Thanh ÄÄƒng', 'dang@gmail.com', '2001-01-24', 8, 3),
(6, 'Ngá»™ khÃ´ng', 'eshipper@logistic.com', '2000-12-01', 9, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `khachang`
--
ALTER TABLE `khachang`
  ADD PRIMARY KEY (`KH_id`),
  ADD KEY `DC_id` (`DC_id`),
  ADD KEY `TK_id` (`TK_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `khachang`
--
ALTER TABLE `khachang`
  MODIFY `KH_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
