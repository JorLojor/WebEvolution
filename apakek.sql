-- Buat tabel Register
CREATE TABLE `Register` (
    `RegistrationID` int PRIMARY KEY,
    `CompetitionID` int,
    `Nama` varchar(64),
    `Nama_Instansi` varchar(64),
    `Nomor_Induk_Mahasiswa` int,
    `Email` varchar(64),
    `Provinsi` varchar(64),
    `Kabupaten` varchar(64),
    `Password` varchar(64),
    `Confirm_Password` varchar(64),
    `Pilihan_Lomba` varchar(64),
    `Status_Registrasi` int,
);
-- Buat tabel Team
CREATE TABLE `Team` (
    `TeamID` int PRIMARY KEY,
    RegistrationID int,
    `Nama_Anggota` varchar(255),
    `NIM_Anggota` int,
    UNIQUE INDEX (`RegistrationID`),
);
-- Buat tabel Competitions
CREATE TABLE `Competitions` (
    `CompetitionsID` int PRIMARY KEY,
    `UserID` int,
    `Pernyataan_Origalitas` varchar(255),
    `Proposal` varchar(255),
    `Dokumen_Substansi` varchar(255),
    FOREIGN KEY (`UserID`) REFERENCES `Register` (`UserID`)
    FOREIGN KEY (`UserID`) REFERENCES `Register` (`UserID`)
);
-- Buat tabel Administrative
CREATE TABLE `Administrative` (
    `UserID` int,
    `Kartu_Tanda_Mahasiswa` varchar(255),
    `Bukti_post_Twibon` varchar(255),
    `Bukti_Pembayaran` varchar(255),
    PRIMARY KEY (`UserID`),
    -- Jadikan UserID sebagai PRIMARY KEY
    FOREIGN KEY (`UserID`) REFERENCES `Register` (`UserID`)
);
-- Buat tabel Finalis
CREATE TABLE `Finalis` (
    `UserID` int,
    `Dokumen_Final` varchar(255),
    PRIMARY KEY (`UserID`),
    -- Jadikan UserID sebagai PRIMARY KEY
    FOREIGN KEY (`UserID`) REFERENCES `Register` (`UserID`)
);
-- Tambahkan foreign key ke tabel Team
ALTER TABLE `Team`
ADD FOREIGN KEY (`UserID`) REFERENCES `Register` (`UserID`);
-- Foreign Key sudah ditambahkan dalam definisi tabel Competitions, jadi tidak perlu ALTER tambahan.


-- cara menambahkan row token di tbale register bagaimana? 

