import {DBconnection} from '../config/db';

export interface Register {
    RegistrationID: number;
    UserID: number;
    LombaID: number;
    Nama: string;
    Nama_Instansi: string;
    Nomor_Induk_Mahasiswa: string;
    Email: string;
    Provinsi: string;
    Kabupaten: string;
    Password: string;
    Comfirm_Password: string;
    Pilihan_Lomba: string;
    Status_Registrasi: string;
}

export const getAllRegisters = async (): Promise<Register[]> => {
    const [dataRegister] = await DBconnection.query('SELECT * FROM Register'); 
    return dataRegister as Register[];
}
