import {Request, Response} from 'express';
import {getAllTeams} from '../models/teamModel';


export const getAllTeamsController = async (req: Request, res: Response) => {
    try {
        const teams = await getAllTeams();
        res.json(teams);
    } catch (error) {
        console.error(error, "\n   backend error broo bagian team controller");
        res.status(500).json({message: "backend error broo bagian team controller"});
    }
};
