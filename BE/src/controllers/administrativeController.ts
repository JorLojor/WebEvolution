import {Request, Response} from 'express';
import {getAllAdministrative} from '../models/administrativeModel';

export const getAllAdministrativeController = async (req: Request, res: Response) => {
    try {
        const administative = await getAllAdministrative();
        res.json(administative);
    } catch (error) {
        console.error(error, "\n   backend error broo bagian administative controller");
        res.status(500).json({message: "backend error broo bagian team administative"});
        
    }
}
