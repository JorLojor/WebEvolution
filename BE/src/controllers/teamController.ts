import {Request, Response} from 'express';
import {getAllTeams,addMemberTeam} from '../models/teamModel';
import jwt from 'jsonwebtoken';
import { changeStatusRegistrasi, checkStatusRegistrasiWithExpectedStatus } from '../models/registerModel';


export const getAllTeamsController = async (req: Request, res: Response) => {
    try {
        const teams = await getAllTeams();
        res.json(teams);
    } catch (error) {
        console.error(error, "\n   backend error broo bagian team controller");
        res.status(500).json({message: "backend error broo bagian team controller"});
    }
};


export const addMemberTeamController = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid' });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { RegistrationID: number };
        if (!decoded || !decoded.RegistrationID) {
            return res.status(400).json({ message: 'Token tidak valid' });
        }

        const RegistrationID = decoded.RegistrationID;
        


        const cek_status = await checkStatusRegistrasiWithExpectedStatus(RegistrationID,0);
        if (cek_status !== 0) {
            return res.status(400).json({ message: 'bad request' });
        }

        const { Nama_Anggota2, NIM_Anggota2, Nama_Anggota3, NIM_Anggota3 } = req.body;

        if (!Nama_Anggota2 || !NIM_Anggota2 || !Nama_Anggota3 || !NIM_Anggota3) {
            return res.status(400).json({ message: 'All member details are required' });
        }

        const updatedTeam = await addMemberTeam(RegistrationID, { Nama_Anggota2, NIM_Anggota2, Nama_Anggota3, NIM_Anggota3 });

        if (updatedTeam) {
            res.status(200).json({
                message: 'Team members updated successfully',
                team: updatedTeam,
            });

            await changeStatusRegistrasi(RegistrationID, 1);

        } else {
            res.status(404).json({ message: 'Team not found for the provided RegistrationID' });
        }
    } catch (error) {
        console.error(error, "\n   backend error during addMemberTeamController");
        res.status(500).json({ message: 'Internal server error during addMemberTeamController' });
    }
};
