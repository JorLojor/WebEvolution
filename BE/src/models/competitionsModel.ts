import { DBconnection} from '../config/db';

export interface Competition {
  CompetitionsID: number;
  LombaID: number;
  UserID: number;
  Pernyataan_Origalitas: string;
  Proposal: string;
  Dokumen_Substansi: string;
}

export const getAllCompetitions = async (): Promise<Competition[]> => {
  const [rows] = await DBconnection.query('SELECT * FROM Competitions');
  return rows as Competition[];
};
