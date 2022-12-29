-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2022 at 11:50 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kltint`
--

-- --------------------------------------------------------

--
-- Table structure for table `userkl`
--

CREATE TABLE `userkl` (
  `kduser` varchar(50) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(80) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `hakakses` varchar(20) DEFAULT NULL,
  `kdklinik` varchar(10) DEFAULT NULL,
  `kdcabang` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `userkl`
--

INSERT INTO `userkl` (`kduser`, `username`, `password`, `nama`, `hakakses`, `kdklinik`, `kdcabang`) VALUES
('27Blu1Fy5VKQs3s5VSEDKxcK2rrCWCWPM8YvjoXstceerRlcvn', 's', 'asd', 'asdasd', 'sadas', 'dasd', 'asdas');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userkl`
--
ALTER TABLE `userkl`
  ADD PRIMARY KEY (`kduser`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
