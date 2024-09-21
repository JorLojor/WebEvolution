import {DBconnection} from '../config/db';

export interface Team {
    TeamID: number;
    UserID: number;
    nama_Anggota1: string;
}


export const getAllTeams = async (): Promise<Team[]> => {
    const [dataTeams] = await DBconnection.query('SELECT * FROM Team');
    return dataTeams as Team[];
}
