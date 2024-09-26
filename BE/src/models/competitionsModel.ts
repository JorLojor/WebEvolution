import { DBconnection } from "../config/db";

export interface Competition {
	CompetitionsID: number;
	RegistrationID: number;
	Pernyataan_Originalitas: string;
	Proposal: string;
	Dokumen_Substansi: string;
	title: string;
}

export const inputDataCompetitions = async (
	RegistrationID: number,
	newDataCompetitions: Competition
): Promise<number> => {
	const { Pernyataan_Originalitas, Proposal, Dokumen_Substansi, title } =
		newDataCompetitions;
	// Cek apakah data kompetisi sudah ada untuk RegistrationID yang diberikan
	const [dataCompetitions]: [any[], any] = await DBconnection.query(
		`SELECT * FROM Competitions WHERE RegistrationID = ?`,
		[RegistrationID]
	);

	if (dataCompetitions.length > 0) {
		let hasil: number = 0;

		// Mulai transaksi
		await DBconnection.beginTransaction();

		try {
			// Update data jika field tidak kosong
			if (Pernyataan_Originalitas !== "") {
				await DBconnection.query(
					`UPDATE Competitions SET Pernyataan_Originalitas = ? WHERE RegistrationID = ?`,
					[Pernyataan_Originalitas, RegistrationID]
				);
				console.log(
					"Update Pernyataan_Originalitas:",
					Pernyataan_Originalitas
				);
				hasil = 200;
			}

			if (Proposal !== "") {
				await DBconnection.query(
					`UPDATE Competitions SET Proposal = ? WHERE RegistrationID = ?`,
					[Proposal, RegistrationID]
				);
				console.log("Update Proposal:", Proposal);
				hasil = 200;
			}

			if (Dokumen_Substansi !== "") {
				await DBconnection.query(
					`UPDATE Competitions SET Dokumen_Substansi = ? WHERE RegistrationID = ?`,
					[Dokumen_Substansi, RegistrationID]
				);
				console.log("Update Dokumen_Substansi:", Dokumen_Substansi);
				hasil = 200;
			}

			if (title !== "") {
				await DBconnection.query(
					`UPDATE Competitions SET title = ? WHERE RegistrationID = ?`,
					[title, RegistrationID]
				);
				console.log("Update title:", title);
				hasil = 200;
			}

			// Commit transaksi jika semua berhasil
			await DBconnection.commit();
			return hasil;
		} catch (error) {
			// Rollback transaksi jika ada error
			await DBconnection.rollback();
			console.error("Error updating Competitions data:", error);
			return 500; // Internal server error
		}
	} else {
		// Jika data tidak ditemukan, maka tampilkan pesan error
		console.error("Data Competitions tidak ditemukan");
		return 404;
	}
};

export const getAllCompetitions = async (): Promise<Competition[]> => {
	const [rows] = await DBconnection.query("SELECT * FROM Competitions");
	return rows as Competition[];
};

export const uploadDocument = async (
	registrationID: number,
	proposal: string,
	dokumenSubstansi: string,
	pernyataanOriginalitas: string
): Promise<number> => {
	try {
		const [DataRegister]: [any[], any] = await DBconnection.query(
			"SELECT * FROM Register WHERE RegistrationID = ? AND Status_Registrasi = 1",
			[registrationID]
		);

		if (DataRegister.length === 0) {
			return 404;
		}

		await DBconnection.query(
			`UPDATE Competitions 
       SET Proposal = ?, Dokumen_Substansi = ?, Pernyataan_Origalitas = ? 
       WHERE RegistrationID = ?`,
			[
				proposal,
				dokumenSubstansi,
				pernyataanOriginalitas,
				registrationID,
			]
		);

		return 200;
	} catch (error) {
		console.error("Error uploading document:", error);
		return 500;
	}
};

export const checkCompetitionsByRegistrationID = async (
	RegistrationID: number
): Promise<number> => {
	try {
		const [dataCompetitions]: any = await DBconnection.query(
			`SELECT Pernyataan_Originalitas, Proposal, Dokumen_Substansi FROM Competitions WHERE RegistrationID = ?`,
			[RegistrationID]
		);

		if (dataCompetitions.length === 0) {
			// Jika tidak ada data yang ditemukan
			console.error(
				`Data untuk RegistrationID ${RegistrationID} tidak ditemukan`
			);
			return 0;
		}

		const { Pernyataan_Originalitas, Proposal, Dokumen_Substansi } =
			dataCompetitions[0];

		// Periksa apakah ketiga kolom sudah terisi
		if (
			Pernyataan_Originalitas !== "" &&
			Proposal !== "" &&
			Dokumen_Substansi !== ""
		) {
			return 1; // Data lengkap
		} else {
			return 0; // Data belum lengkap
		}
	} catch (error) {
		console.error("Error checking Competitions data:", error);
		return 0; // Mengembalikan 0 jika ada error
	}
};

export const createCompetitions = async (
	RegistrationID: number,
	title: string
): Promise<number> => {
	try {
		const [result]: any = await DBconnection.query(
			`INSERT INTO Competitions 
      (RegistrationID, Pernyataan_Origalitas, Proposal, Dokumen_Substansi, title)
      VALUES (?, '', '', '', ?)`,
			[RegistrationID, title]
		);

		if (result.affectedRows > 0) {
			return 1;
		} else {
			return 0;
		}
	} catch (error) {
		console.error("Error inserting data into Competitions:", error);
		return 0;
	}
};
