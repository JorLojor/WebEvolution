CREATE TABLE `Administrative` (
  `AdministrativeID` int(255) NOT NULL,
  `RegistrationID` int(11) NOT NULL,
  `Kartu_Tanda_Mahasiswa` varchar(255) DEFAULT NULL,
  `Bukti_post_Twibon` varchar(255) DEFAULT NULL,
  `Bukti_Pembayaran` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Administrative`
--

INSERT INTO `Administrative` (`AdministrativeID`, `RegistrationID`, `Kartu_Tanda_Mahasiswa`, `Bukti_post_Twibon`, `Bukti_Pembayaran`) VALUES
(780, 910, '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `Competitions`
--

CREATE TABLE `Competitions` (
  `CompetitionsID` int(255) NOT NULL,
  `RegistrationID` int(255) NOT NULL,
  `Pernyataan_Origalitas` varchar(255) DEFAULT NULL,
  `Proposal` varchar(255) DEFAULT NULL,
  `Dokumen_Substansi` varchar(255) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Competitions`
--

INSERT INTO `Competitions` (`CompetitionsID`, `RegistrationID`, `Pernyataan_Origalitas`, `Proposal`, `Dokumen_Substansi`, `title`) VALUES
(788, 910, '', '', '', 'uiux');

-- --------------------------------------------------------

--
-- Table structure for table `Finalis`
--

CREATE TABLE `Finalis` (
  `FinalisID` int(255) NOT NULL,
  `TeamID` int(255) DEFAULT NULL,
  `RegistrationID` int(255) DEFAULT NULL,
  `CompetitionsID` int(255) NOT NULL,
  `Dokumen_Final` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Register`
--

CREATE TABLE `Register` (
  `RegistrationID` int(255) NOT NULL,
  `Nama` varchar(64) DEFAULT NULL,
  `Nomor_Telfon` varchar(15) DEFAULT NULL,
  `Nama_Instansi` varchar(64) DEFAULT NULL,
  `Nama_Team` varchar(64) DEFAULT NULL,
  `Nomor_Induk_Mahasiswa` int(255) DEFAULT NULL,
  `Email` varchar(64) DEFAULT NULL,
  `Provinsi` varchar(64) DEFAULT NULL,
  `Kabupaten` varchar(64) DEFAULT NULL,
  `Password` varchar(64) DEFAULT NULL,
  `Pilihan_Lomba` varchar(64) DEFAULT NULL,
  `Status_Registrasi` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Register`
--

-- Table structure for table `Team`
--

CREATE TABLE `Team` (
  `TeamID` int(255) NOT NULL,
  `RegistrationID` int(255) NOT NULL,
  `Nama_Anggota1` varchar(255) DEFAULT NULL,
  `NIM_Anggota1` int(255) DEFAULT NULL,
  `Nama_Anggota2` varchar(255) DEFAULT NULL,
  `NIM_Anggota2` int(255) DEFAULT NULL,
  `Nama_Anggota3` varchar(255) DEFAULT NULL,
  `NIM_Anggota3` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Team`
--


-- Indexes for dumped tables
--

--
-- Indexes for table `Administrative`
--
ALTER TABLE `Administrative`
  ADD PRIMARY KEY (`AdministrativeID`),
  ADD KEY `RegistrationID` (`RegistrationID`);

--
-- Indexes for table `Competitions`
--
ALTER TABLE `Competitions`
  ADD PRIMARY KEY (`CompetitionsID`),
  ADD KEY `RegistrationID` (`RegistrationID`);

--
-- Indexes for table `Finalis`
--
ALTER TABLE `Finalis`
  ADD PRIMARY KEY (`FinalisID`),
  ADD KEY `TeamID` (`TeamID`),
  ADD KEY `RegistrationID` (`RegistrationID`),
  ADD KEY `CompetitionsID` (`CompetitionsID`);

--
-- Indexes for table `Register`
--
ALTER TABLE `Register`
  ADD PRIMARY KEY (`RegistrationID`);

--
-- Indexes for table `Team`
--
ALTER TABLE `Team`
  ADD PRIMARY KEY (`TeamID`),
  ADD KEY `RegistrationID` (`RegistrationID`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Administrative`
--
ALTER TABLE `Administrative`
  ADD CONSTRAINT `administrative_ibfk_1` FOREIGN KEY (`RegistrationID`) REFERENCES `Register` (`RegistrationID`);

--
-- Constraints for table `Competitions`
--
ALTER TABLE `Competitions`
  ADD CONSTRAINT `competitions_ibfk_1` FOREIGN KEY (`RegistrationID`) REFERENCES `Register` (`RegistrationID`);

--
-- Constraints for table `Finalis`
--
ALTER TABLE `Finalis`
  ADD CONSTRAINT `finalis_ibfk_1` FOREIGN KEY (`TeamID`) REFERENCES `Team` (`TeamID`),
  ADD CONSTRAINT `finalis_ibfk_2` FOREIGN KEY (`RegistrationID`) REFERENCES `Register` (`RegistrationID`),
  ADD CONSTRAINT `finalis_ibfk_3` FOREIGN KEY (`CompetitionsID`) REFERENCES `Competitions` (`CompetitionsID`);

--
-- Constraints for table `Team`
--
ALTER TABLE `Team`
  ADD CONSTRAINT `team_ibfk_1` FOREIGN KEY (`RegistrationID`) REFERENCES `Register` (`RegistrationID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
