import {DBconnection} from '../config/db';

export interface Finalis {
    UserID: number;
    Dokumen_Finalis: string;
}

export const getAllFinalis = async (): Promise<Finalis[]> => {
    const [dataFinalis] = await DBconnection.query('SELECT * FROM Finalis');
    return dataFinalis as Finalis[];
}
