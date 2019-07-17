-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 17, 2019 at 12:19 PM
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

--
-- Dumping data for table `diachi`
--

INSERT INTO `diachi` (`ID`, `Thanhpho`, `Quan`, `Thitran`, `Mota`) VALUES
(1, 'Hà Nội', 'Hà Đông', 'Thanh xuân', '124- Lương Thế Vinh'),
(2, 'Hưng Yên', 'Ba sá', 'Ngữ Yên', 'Vưng Ngữ Yên'),
(8, 'Báº¯c Giang', 'Báº¯c Giang', 'Báº¯c Giang', 'TrÃªn trá»i cao, tá»«ng tÃ´n Cá»± Long mÃ u vÃ ng tháº§n thÃ¡nh gáº§m thÃ©t hÆ°á»›ng phÃ­a trÆ°á»›c mÃ  Ä‘i, Ã©p qua thiÃªn khung, tiáº¿ng rá»‘ng tráº­n tráº­n, uy Ã¡p kinh thiÃªn'),
(9, 'CÃ  mau', 'CÃ  mau', 'CÃ  mau', 'CÃ  mau');

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

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
--

CREATE TABLE `taikhoan` (
  `TK_id` int(11) NOT NULL,
  `Ten` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Matkhau` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Vaitro` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `taikhoan`
--

INSERT INTO `taikhoan` (`TK_id`, `Ten`, `Matkhau`, `Vaitro`) VALUES
(1, 'Thienkhuyet', '12345678', 0),
(2, 'Minhvuong', '12345678', 0),
(3, 'Muctac', '123456', 0),
(4, 'eshipper@logistic.com', '12345678', 0);

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
-- AUTO_INCREMENT for table `chitiet_sanpham`
--
ALTER TABLE `chitiet_sanpham`
  MODIFY `SP_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `diachi`
--
ALTER TABLE `diachi`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `donhang`
--
ALTER TABLE `donhang`
  MODIFY `DH_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `khachang`
--
ALTER TABLE `khachang`
  MODIFY `KH_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `TK_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
