import { DBconnection } from "../config/db";

export interface Competition {
     CompetitionsID: number;
     RegistrationID: number;
     Pernyataan_Origalitas: string;
     Proposal: string;
     Dokumen_Substansi: string;
     title: string;
}

export const inputDataCompetitions = async (
     RegistrationID: number,
     newDataCompetitions: Competition
): Promise<number> => {
     const { Pernyataan_Origalitas, Proposal, Dokumen_Substansi, title } =
          newDataCompetitions;

     const connection = await DBconnection.getConnection();

     try {
          await connection.beginTransaction();

          if (Pernyataan_Origalitas !== "") {
               await connection.query(
                    `UPDATE Competitions SET Pernyataan_Origalitas = ? WHERE RegistrationID = ?`,
                    [Pernyataan_Origalitas, RegistrationID]
               );
               console.log(
                    "Update Pernyataan_Originalitas:",
                    Pernyataan_Origalitas
               );
          }

          if (Proposal !== "") {
               await connection.query(
                    `UPDATE Competitions SET Proposal = ? WHERE RegistrationID = ?`,
                    [Proposal, RegistrationID]
               );
               console.log("Update Proposal:", Proposal);
          }

          if (Dokumen_Substansi !== "") {
               await connection.query(
                    `UPDATE Competitions SET Dokumen_Substansi = ? WHERE RegistrationID = ?`,
                    [Dokumen_Substansi, RegistrationID]
               );
               console.log("Update Dokumen_Substansi:", Dokumen_Substansi);
          }

          if (title !== "") {
               await connection.query(
                    `UPDATE Competitions SET title = ? WHERE RegistrationID = ?`,
                    [title, RegistrationID]
               );
               console.log("Update title:", title);
          }

          await connection.commit();
          return 200;
     } catch (error) {
          await connection.rollback();
          console.error("Error updating Competitions data:", error);
          return 500;
     } finally {
          connection.release();
     }
};

export const checkCompetitionsByRegistrationID = async (
     RegistrationID: number
): Promise<number> => {
     try {
          const [dataCompetitions]: any = await DBconnection.query(
               `SELECT Pernyataan_Origalitas, Proposal, Dokumen_Substansi FROM Competitions WHERE RegistrationID = ?`,
               [RegistrationID]
          );

          if (dataCompetitions.length === 0) {
               console.error(
                    `Data untuk RegistrationID ${RegistrationID} tidak ditemukan`
               );
               return 0;
          }

          const { Pernyataan_Originalitas, Proposal, Dokumen_Substansi } =
               dataCompetitions[0];

          if (
               Pernyataan_Originalitas !== "" &&
               Proposal !== "" &&
               Dokumen_Substansi !== ""
          ) {
               console.log(" user sudah mengupload document ");
               return 1; 
          } else {
               console.log(" user belum mengupload document ");

               return 0; 
          }
     } catch (error) {
          console.error("Error checking Competitions data:", error);
          return 0; 
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
