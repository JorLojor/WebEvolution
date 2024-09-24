import { DBconnection } from '../config/db';

export interface Team {
  TeamID: number;
  RegistrationID: number;
  Nama_Anggota1: string;
  NIM_Anggota1: number;
  Nama_Anggota2: string;
  NIM_Anggota2: number;
  Nama_Anggota3: string;
  NIM_Anggota3: number;
}

export const getAllTeams = async (): Promise<Team[]> => {
  const [dataTeams] = await DBconnection.query('SELECT * FROM Team');
  return dataTeams as Team[];
}


// getone 
export const getOneTeam = async (TeamID: number): Promise<Team | null> => {
    const [dataTeam]:  any = await DBconnection.query('SELECT * FROM Team WHERE TeamID = ? ',[TeamID] )
    if(dataTeam.length > 0) {
        return dataTeam[0] as Team;
    } else {
        return null;
    }
}


// create team 

// parameter berupa RegistrationID yang diambil dari tabel Register dan Nama_Anggota1: string; NIM_Anggota1: number; Nama_Anggota2: string; NIM_Anggota2: number;Nama_Anggota3: string; NIM_Anggota3: number;
// RegistrationID berfungsi untuk mencari data table Team yang akan diisi dengan data baru
// Nama_Anggota1, NIM_Anggota1, Nama_Anggota2, NIM_Anggota2, Nama_Anggota3, NIM_Anggota3 berfungsi untuk mengisi data table Team
export const addMemberTeam = async (RegistrationID: number, newDataTeam: Team): Promise<Team | null> => {
    const {Nama_Anggota1, NIM_Anggota1, Nama_Anggota2, NIM_Anggota2, Nama_Anggota3, NIM_Anggota3} = newDataTeam;
    await DBconnection.query(
        `INSERT INTO Team 
            ( Nama_Anggota1, NIM_Anggota1, Nama_Anggota2, NIM_Anggota2, Nama_Anggota3, NIM_Anggota3)
            VALUES (?, ?, ?, ?, ?, ?, ?) 
            WHERE RegistrationID = ?`,
        [Nama_Anggota1, NIM_Anggota1, Nama_Anggota2, NIM_Anggota2, Nama_Anggota3, NIM_Anggota3, RegistrationID]
    );
    if (newDataTeam) {
        return newDataTeam as Team;
    }
    return null;
}
