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


// upload document ( proposal, dokumen substansi, pernyataan originalitas )
