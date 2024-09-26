import { DBconnection } from '../config/db';
import jsonwebtoken from 'jsonwebtoken';
import {generateID} from '../utils/generateID'
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

// fungsi untuk cek Status_Registrasi
export const checkStatusRegistrasiWithExpectedStatus = async (RegistrationID: number, expect_status: number): Promise<number> => {
    const [dataRegister]: any = await DBconnection.query('SELECT Status_Registrasi FROM Register WHERE RegistrationID = ?', [RegistrationID]);
    if (dataRegister.length > 0) {
        if (dataRegister[0].Status_Registrasi === expect_status) {
            return expect_status;
        } else {
            return 500;
        }
    } else {
        return 500;
    }
};
// fungsi untuk merubah status
export const changeStatusRegistrasi = async (RegistrationID: number, newStatus: number): Promise<void> => {
    await DBconnection.query('UPDATE Register SET Status_Registrasi = ? WHERE RegistrationID = ?', [newStatus, RegistrationID]);
};


// fungsi untuk input data registrasi
export const createRegister = async (newRegister: Register): Promise<number> => {
    const {RegistrationID, Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba } = newRegister;

    await DBconnection.query(
        `INSERT INTO Register 
            (RegistrationID,Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, Status_Registrasi, token) 
            VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [RegistrationID, Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba, 0 , '']
    );

    // ngebuat table Team dengan RegistrationID yang sama dengan RegistrationID yang baru diinsert
    await DBconnection.query(
        `INSERT INTO Team (TeamID,RegistrationID,Nama_Anggota1,NIM_Anggota1) VALUES (?,?,?,?)`,
        [generateID(),newRegister.RegistrationID,Nama,Nomor_Induk_Mahasiswa]
    );

    // pengondisian Pilihan_Lomba
    let Competitions = '';
    switch (Pilihan_Lomba) {
        case 'bisnis plan':
            Competitions = 'bisnis plan';
            break;
        case 'uiux':
            Competitions = 'uiux';
            break;
        case 'web design':
            Competitions = 'web design';
            break;
        case 'poster infografis':
            Competitions = 'poster infografis';
            break;
        default:
            Competitions = '';
    }
    if (Competitions) {
        await DBconnection.query(
            'INSERT INTO Competitions (CompetitionsID, RegistrationID, Pernyataan_Origalitas, Proposal, Dokumen_Substansi, title) VALUES (?, ?, ?,?, ?, ?)',
            [generateID(),newRegister.RegistrationID, '', '','', Competitions]
        );
    }
    // ngbuat table Administrative dengan RegistrationID yang sama dengan RegistrationID yang baru diinsert
    await DBconnection.query(
        `INSERT INTO Administrative 
            (AdministrativeID ,RegistrationID, Kartu_Tanda_Mahasiswa, Bukti_post_Twibon, Bukti_Pembayaran)
            VALUES (?, ?, ?, ?, ?)`,
        [generateID(),newRegister.RegistrationID,'', '', '']
    );

    return 201;
};

// login
export const login = async (Email: string, Password: string): Promise<Register | null> => {
    try {
        const [dataRegister]: any = await DBconnection.query('SELECT * FROM Register WHERE Email = ? AND Password = ?', [Email, Password]);

        if (dataRegister.length > 0) { 
            const token = jsonwebtoken.sign({ RegistrationID: dataRegister[0].RegistrationID }, process.env.SECRET_KEY as string, { expiresIn: '3h' }); // Token sampe 3 jam

            // ngisi token di table Register
            await DBconnection.query('UPDATE Register SET token = ? WHERE RegistrationID = ?', [token, dataRegister[0].RegistrationID]);

            // Tambahkan token ke objek yang akan dikembalikan
            dataRegister[0].token = token;

            return dataRegister[0] as Register;
        } else {
            return null; // Email atau password salah
        }
    } catch (error) {
        console.error("Error during login:", error);
        throw new Error('Error during login process');
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
