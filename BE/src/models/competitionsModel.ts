import { DBconnection} from '../config/db';

export interface Competition {
  CompetitionsID: number;
  RegistrationID: number;
  Pernyataan_Origalitas: string;
  Proposal: string;
  Dokumen_Substansi: string;
  title: string;
}

// PR
//1. tambahin column baru di table Competitions dengan nama title yang bertipe string 

export const getAllCompetitions = async (): Promise<Competition[]> => {
  const [rows] = await DBconnection.query('SELECT * FROM Competitions');
  return rows as Competition[];
};

export const uploadDocument = async (registrationID: number, proposal: string, dokumenSubstansi: string, pernyataanOriginalitas: string): Promise<number> => {
  try {
    const [DataRegister]: [any[], any] = await DBconnection.query(
      'SELECT * FROM Register WHERE RegistrationID = ? AND Status_Registrasi = 1',
      [registrationID]
    );

    if (DataRegister.length === 0) {
      return 404;
    }

    await DBconnection.query(
      `UPDATE Competitions 
       SET Proposal = ?, Dokumen_Substansi = ?, Pernyataan_Origalitas = ? 
       WHERE RegistrationID = ?`,
      [proposal, dokumenSubstansi, pernyataanOriginalitas, registrationID]
    );

    return 200;
  } catch (error) {
    console.error('Error uploading document:', error);
    return 500; 
  }
};
