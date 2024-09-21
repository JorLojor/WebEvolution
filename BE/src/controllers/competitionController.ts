import { Request, Response } from 'express';
import { getAllCompetitions } from '../models/competitionsModel';

export const getAllCompetitionsController = async (req: Request, res: Response) => {
    try {
        const Competitions = await getAllCompetitions();
        res.json(Competitions);
    } catch (error) {
        console.error(error,"\n   backend error broo bagian competition controller");
        res.status(500).json({message: "backend error broo bagian competition controller"});
        
    }
}
