-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 30, 2019 at 09:02 AM
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
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `chitiet_sanpham`
--

CREATE TABLE `chitiet_sanpham` (
  `SP_id` int(11) NOT NULL,
  `DH_id` int(11) DEFAULT NULL,
  `Gia` float NOT NULL,
  `Soluong` int(11) NOT NULL,
  `Ten_SP` varchar(255) COLLATE utf8mb4_vietnamese_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `chitiet_sanpham`
--

INSERT INTO `chitiet_sanpham` (`SP_id`, `DH_id`, `Gia`, `Soluong`, `Ten_SP`) VALUES
(3, 1, 30000, 3, 'Bột giặt'),
(4, 2, 35000, 2, 'Kem'),
(8, 1, 40000, 1, 'Sua'),
(9, 1, 67000, 1, 'Bánh'),
(10, 1, 150000, 2, 'Mật Ong'),
(11, 1, 27000, 1, 'Bim Bim');

-- --------------------------------------------------------

--
-- Table structure for table `diachi`
--

CREATE TABLE `diachi` (
  `ID` int(10) NOT NULL,
  `Tinh` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Huyen` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Xa` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Mota` varchar(250) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `diachi`
--

INSERT INTO `diachi` (`ID`, `Tinh`, `Huyen`, `Xa`, `Mota`) VALUES
(1, 'Hà Nội', 'Hà Đông', 'Thanh Xuân', '123 Lương Thế Vinh '),
(17, 'Hà Tĩnh', 'Xô Viết Nghệ Tĩnh', 'Thiên An', '123 Thiên An'),
(18, 'Bắc Ninh', 'Bắc Ninh', 'Bắc Ninh', 'Bắc Ninh');

-- --------------------------------------------------------

--
-- Table structure for table `donhang`
--

CREATE TABLE `donhang` (
  `DH_id` int(11) NOT NULL,
  `Giamgia` float DEFAULT NULL,
  `KH_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `donhang`
--

INSERT INTO `donhang` (`DH_id`, `Giamgia`, `KH_id`) VALUES
(1, 0, 11),
(2, 0, 12);

-- --------------------------------------------------------

--
-- Table structure for table `khachang`
--

CREATE TABLE `khachang` (
  `KH_id` int(9) NOT NULL,
  `Hoten` varchar(150) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Email` varchar(200) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Ngaysinh` date NOT NULL,
  `DC_id` int(11) NOT NULL,
  `TK_id` int(11) NOT NULL,
  `SDT` varchar(20) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `khachang`
--

INSERT INTO `khachang` (`KH_id`, `Hoten`, `Email`, `Ngaysinh`, `DC_id`, `TK_id`, `SDT`) VALUES
(10, 'Nguyễn Minh Vương', 'minhvuongbvh@gmail.com', '1999-07-03', 1, 11, '0914028770'),
(11, 'Thiên Minh', 'thienminh@gmail.com', '1990-11-30', 17, 12, '0962003560'),
(12, 'Tần Mục', 'muc@gmail.com', '2002-11-15', 18, 13, '123456789');

-- --------------------------------------------------------

--
-- Table structure for table `taikhoan`
--

CREATE TABLE `taikhoan` (
  `TK_id` int(11) NOT NULL,
  `Ten` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Matkhau` varchar(30) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `Vaitro` int(1) NOT NULL,
  `Hoatdong` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;

--
-- Dumping data for table `taikhoan`
--

INSERT INTO `taikhoan` (`TK_id`, `Ten`, `Matkhau`, `Vaitro`, `Hoatdong`) VALUES
(11, 'Thienkhuyet', '12345678', 1, 1),
(12, 'Thienminh', 'Thienminh', 0, 1),
(13, 'tanmuc', '1234567', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chitiet_sanpham`
--
ALTER TABLE `chitiet_sanpham`
  ADD PRIMARY KEY (`SP_id`);

--
-- Indexes for table `diachi`
--
ALTER TABLE `diachi`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `donhang`
--
ALTER TABLE `donhang`
  ADD PRIMARY KEY (`DH_id`);

--
-- Indexes for table `khachang`
--
ALTER TABLE `khachang`
  ADD PRIMARY KEY (`KH_id`),
  ADD UNIQUE KEY `TK_id` (`TK_id`),
  ADD UNIQUE KEY `DC_id` (`DC_id`);

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
  MODIFY `SP_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `diachi`
--
ALTER TABLE `diachi`
  MODIFY `ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `donhang`
--
ALTER TABLE `donhang`
  MODIFY `DH_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `khachang`
--
ALTER TABLE `khachang`
  MODIFY `KH_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `taikhoan`
--
ALTER TABLE `taikhoan`
  MODIFY `TK_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
