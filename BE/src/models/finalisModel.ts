import { DBconnection } from '../config/db';

export interface Finalis {
  FinalisID: number;
  CompetitionsID: number;
  TeamID: number;
  Dokumen_Final: string;
}

export const getAllFinalis = async (): Promise<Finalis[]> => {
  const [dataFinalis] = await DBconnection.query('SELECT * FROM Finalis');
  return dataFinalis as Finalis[];
}


// upload document ( dokumen final)
