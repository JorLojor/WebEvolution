import{DBconnection} from '../config/db'

export interface administrative{
    UserId:number;
    Kartu_Tanda_Mahasiswa:string;
    Bukti_post_Twibon:string;
    Bukti_Pembayaran:string;
}

export const getAllAdministrative = async (): Promise<administrative[]> => {
    const [dataAdministrative] = await DBconnection.query('SELECT * FROM Administrative');
    return dataAdministrative as administrative[];
}
