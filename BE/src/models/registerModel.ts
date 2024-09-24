import { DBconnection } from '../config/db';
import jsonwebtoken from 'jsonwebtoken';
import env from 'dotenv'; env.config();

export interface Register {
    RegistrationID: number;
    Nama: string;
    Nomor_Telfon: string;
    Nama_Instansi: string;
    Nama_Team: string;
    Nomor_Induk_Mahasiswa: number;
    Email: string;
    Provinsi: string;
    Kabupaten: string;
    Password: string;
    Pilihan_Lomba: string;
    Status_Registrasi: number;
    token: string;
}

export const createRegister = async (newRegister: Register): Promise<void> => {
    const { Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, Status_Registrasi, token } = newRegister;

    await DBconnection.query(
        `INSERT INTO Register 
            (Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, Status_Registrasi, token) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, Status_Registrasi, token]
    );

    // ngebuat table Team dengan RegistrationID yang sama dengan RegistrationID yang baru diinsert
    await DBconnection.query(
        'INSERT INTO Team (RegistrationID) VALUES (?)',
        [newRegister.RegistrationID]
    );

    // pengondisian Pilihan_Lomba
    let dokumenSubstansi = '';
    switch (Pilihan_Lomba) {
        case 'bisnis plan':
            dokumenSubstansi = 'bisnis plan';
            break;
        case 'uiux':
            dokumenSubstansi = 'uiux';
            break;
        case 'web design':
            dokumenSubstansi = 'web design';
            break;
        case 'poster infografis':
            dokumenSubstansi = 'poster infografis';
            break;
        default:
            dokumenSubstansi = '';
    }

    if (dokumenSubstansi) {
        await DBconnection.query(
            'INSERT INTO Competitions (RegistrationID, Pernyataan_Origalitas, Dokumen_Substansi) VALUES (?, ?, ?)',
            [newRegister.RegistrationID, dokumenSubstansi, dokumenSubstansi]
        );
    }
};

// login

export const login = async (Email: string, Password: string): Promise<Register | null> => {
    const [dataRegister]: any = await DBconnection.query('SELECT * FROM Register WHERE Email = ? AND Password = ?', [Email, Password]);
    if (dataRegister.length > 0) { // LOGIN NYA BERHASIL
        const token = jsonwebtoken.sign({ RegistrationID: dataRegister[0].RegistrationID }, process.env.SECRET_KEY as string);
        // mengisi token di table Register
        await DBconnection.query('UPDATE Register SET token = ? WHERE RegistrationID = ?', [token, dataRegister[0].RegistrationID]);
        return dataRegister[0] as Register;
    } else {
        return null;
    }
};

// logout
export const logout = async (RegistrationID: number): Promise<void> => {
    await DBconnection.query('UPDATE Register SET token = ? WHERE RegistrationID = ?', [null, RegistrationID]);
};

// fungsi untuk cek status registrasi yang mertun string status_registrasi ("sudah" atau "belum")
export const checkStatusRegistrasi = async (RegistrationID: number): Promise<string> => {
    const [dataRegister]: any = await DBconnection.query('SELECT Status_Registrasi FROM Register WHERE RegistrationID = ?', [RegistrationID]);
    if (dataRegister.length > 0) {
        if (dataRegister[0].Status_Registrasi === 1) {
            return 'sudah';
        } else {
            return 'belum';
        }
    } else {
        return 'data tidak ditemukan';
    }
};

// admin
export const getAllRegisters = async (): Promise<Register[]> => {
    const [dataRegister] = await DBconnection.query('SELECT * FROM Register');
    return dataRegister as Register[];
};

export const getSingleRegister = async (RegistrationID: number): Promise<Register | null> => {
    const [dataRegister]: any = await DBconnection.query('SELECT * FROM Register WHERE RegistrationID = ?', [RegistrationID]);
    if (dataRegister.length > 0) {
        return dataRegister[0] as Register;
    } else {
        return null;
    }
};

export const updateRegister = async (RegistrationID: number, updatedRegister: Partial<Register>): Promise<void> => {
    const { Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, Status_Registrasi } = updatedRegister;

    await DBconnection.query(
        `UPDATE Register SET 
    Nama = COALESCE(?, Nama),
    Nomor_Telfon = COALESCE(?, Nomor_Telfon),
    Nama_Instansi = COALESCE(?, Nama_Instansi),
    Nama_Team = COALESCE(?, Nama_Team),
    Nomor_Induk_Mahasiswa = COALESCE(?, Nomor_Induk_Mahasiswa),
    Email = COALESCE(?, Email),
    Provinsi = COALESCE(?, Provinsi),
    Kabupaten = COALESCE(?, Kabupaten),
    Password = COALESCE(?, Password),
    Pilihan_Lomba = COALESCE(?, Pilihan_Lomba),
    Status_Registrasi = COALESCE(?, Status_Registrasi)
    WHERE RegistrationID = ?`,
        [Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, Status_Registrasi, RegistrationID]
    );
};

export const deleteRegister = async (RegistrationID: number): Promise<void> => {
    await DBconnection.query('DELETE FROM Register WHERE RegistrationID = ?', [RegistrationID]);
};
