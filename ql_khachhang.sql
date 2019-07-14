-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2019 at 02:41 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.1.30

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
-- Table structure for table `chitiet_sanpham`
--

CREATE TABLE `chitiet_sanpham` (
  `SP_id` int(11) NOT NULL,
  `DH_id` int(11) DEFAULT NULL,
  `Gia` float NOT NULL,
  `Soluong` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `diachi`
--

CREATE TABLE `diachi` (
  `ID` int(10) NOT NULL,
  `Thanhpho` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Quan` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Thitran` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Mota` varchar(250) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `donhang`
--

CREATE TABLE `donhang` (
  `DH_id` int(11) NOT NULL,
  `Giamgia` float DEFAULT NULL,
  `KH_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `khachang`
--

CREATE TABLE `khachang` (
  `KH_id` int(9) NOT NULL,
  `Hoten` varchar(150) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `emial` varchar(200) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `ngaysinh` date NOT NULL,
  `DC_id` int(11) DEFAULT NULL,
  `TK_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
--

CREATE TABLE `taikhoan` (
  `TK_id` int(11) NOT NULL,
  `Ten` int(11) NOT NULL,
  `Matkhau` int(11) NOT NULL,
  `Vaitro` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chitiet_sanpham`
--
ALTER TABLE `chitiet_sanpham`
  ADD PRIMARY KEY (`SP_id`),
  ADD KEY `DH_id` (`DH_id`);

--
-- Indexes for table `diachi`
--
ALTER TABLE `diachi`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`DH_id`),
  ADD KEY `KH_id` (`KH_id`);

--
-- Indexes for table `khachang`
--
ALTER TABLE `khachang`
  ADD PRIMARY KEY (`KH_id`),
  ADD KEY `DC_id` (`DC_id`),
  ADD KEY `TK_id` (`TK_id`);

--
-- Indexes for table `taikhoan`
--
ALTER TABLE `taikhoan`
  ADD PRIMARY KEY (`TK_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `diachi`
--
ALTER TABLE `diachi`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `TK_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chitiet_sanpham`
--
ALTER TABLE `chitiet_sanpham`
  ADD CONSTRAINT `chitiet_sanpham_ibfk_1` FOREIGN KEY (`DH_id`) REFERENCES `donhang` (`DH_id`);

--
-- Constraints for table `donhang`
--
ALTER TABLE `donhang`
  ADD CONSTRAINT `donhang_ibfk_1` FOREIGN KEY (`KH_id`) REFERENCES `khachang` (`KH_id`);

--
-- Constraints for table `khachang`
--
ALTER TABLE `khachang`
  ADD CONSTRAINT `khachang_ibfk_1` FOREIGN KEY (`DC_id`) REFERENCES `diachi` (`ID`),
  ADD CONSTRAINT `khachang_ibfk_2` FOREIGN KEY (`TK_id`) REFERENCES `taikhoan` (`TK_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
