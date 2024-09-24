import { DBconnection } from '../config/db';
import jsonwebtoken from 'jsonwebtoken';
import env from 'dotenv';env.config();

export interface Register {
    RegistrationID: number;
    Nama: string;
    Email: string;
    Provinsi: string;
    Kabupaten: string;
    Password: string;
    Confirm_Password: string;
    Pilihan_Lomba: string;
    Status_Registrasi: number;
    token: string;
}


export const createRegister = async (newRegister: Register): Promise<void> => {
    const { Email, Provinsi, Kabupaten, Password, Confirm_Password, Pilihan_Lomba, Status_Registrasi, token } = newRegister;
    await DBconnection.query(
        `INSERT INTO Register 
            ( Email, Provinsi, Kabupaten, Password, Confirm_Password, Pilihan_Lomba, Status_Registrasi,token) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`,
        [Email, Provinsi, Kabupaten, Password, Confirm_Password, Pilihan_Lomba, Status_Registrasi, token]
    );

    // ngebuat table Team dengan RegistrationID yang sama dengan RegistrationID yang baru diinsert
    await DBconnection.query(
        'INSERT INTO Team (RegistrationID) VALUES (?)',
        [newRegister.RegistrationID] //
    );

    // pengondisian Pilhan_Lomba
    if (Pilihan_Lomba === 'bisnis plan') {
        await DBconnection.query(
            'INSERT INTO Competitions (RegistrationID,Pernyataan_Origalitas,proposal) VALUES (?, ?)',
            [newRegister.RegistrationID, 'bisnis plan']
        );
    }else if (Pilihan_Lomba === 'uiux') {
        await DBconnection.query(
            'INSERT INTO Competitions (RegistrationID, title) VALUES (?, ?)',
            [newRegister.RegistrationID, 'uiux']
        );
    }else if (Pilihan_Lomba === 'web design') {
        await DBconnection.query(
            'INSERT INTO Competitions (RegistrationID, title) VALUES (?, ?)',
            [newRegister.RegistrationID, 'web design']
        );
    }else if (Pilihan_Lomba === 'poster infografis') {
        await DBconnection.query(
            'INSERT INTO Competitions (RegistrationID, title) VALUES (?, ?)',
            [newRegister.RegistrationID, 'poster infografis']
        );
    }
}

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
}

//logout
export const logout = async (RegistrationID: number): Promise<void> => {
    await DBconnection.query('UPDATE Register SET token = ? WHERE RegistrationID = ?', [null, RegistrationID]);
}


//fungsi untuk  cek status registrasi yang mertun string status_registrasi ("sudah" atau "belum")
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
}
































//admin
export const getAllRegisters = async (): Promise<Register[]> => {
    const [dataRegister] = await DBconnection.query('SELECT * FROM Register');
    return dataRegister as Register[];
}

export const getSingleRegister = async (RegistrationID: number): Promise<Register | null> => {
    const [dataRegister]: any = await DBconnection.query('SELECT * FROM Register WHERE RegistrationID = ?', [RegistrationID]);
    if (dataRegister.length > 0) {
        return dataRegister[0] as Register;
    } else {
        return null;
    }
}





export const updateRegister = async (RegistrationID: number, updatedRegister: Partial<Register>): Promise<void> => {
    const { Nama, Email, Provinsi, Kabupaten, Password, Confirm_Password, Pilihan_Lomba, Status_Registrasi } = updatedRegister;

    await DBconnection.query(
        `UPDATE Register SET 
    Nama = COALESCE(?, Nama),
    Email = COALESCE(?, Email),
    Provinsi = COALESCE(?, Provinsi),
    Kabupaten = COALESCE(?, Kabupaten),
    Password = COALESCE(?, Password),
    Confirm_Password = COALESCE(?, Confirm_Password),
    Pilihan_Lomba = COALESCE(?, Pilihan_Lomba),
    Status_Registrasi = COALESCE(?, Status_Registrasi)
    WHERE RegistrationID = ?`,
        [Nama, Email, Provinsi, Kabupaten, Password, Confirm_Password, Pilihan_Lomba, Status_Registrasi, RegistrationID]
    );
}

export const deleteRegister = async (RegistrationID: number): Promise<void> => {
    await DBconnection.query('DELETE FROM Register WHERE RegistrationID = ?', [RegistrationID]);
}
