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

export const addMemberTeam = async (RegistrationID: number, newDataTeam: Partial<Team>): Promise<Team | null> => {
    const { Nama_Anggota2, NIM_Anggota2, Nama_Anggota3, NIM_Anggota3 } = newDataTeam;

    const [result]: any = await DBconnection.query(
        `UPDATE Team 
        SET Nama_Anggota2 = ?, NIM_Anggota2 = ?, Nama_Anggota3 = ?, NIM_Anggota3 = ?
        WHERE RegistrationID = ?`,
        [Nama_Anggota2, NIM_Anggota2, Nama_Anggota3, NIM_Anggota3, RegistrationID]
    );

    if (result.affectedRows > 0) {
        const [updatedTeam]: any = await DBconnection.query(
            'SELECT * FROM Team WHERE RegistrationID = ?',
            [RegistrationID]
        );
        return updatedTeam[0] as Team;
    }
    return null;
};



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
