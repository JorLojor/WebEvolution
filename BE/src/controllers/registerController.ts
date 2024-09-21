import {Request, Response} from 'express';
import {getAllRegisters} from '../models/registerModel';

export const getAllRegisterController = async (req: Request, res: Response) => {
    try {
        const dataRegister = await getAllRegisters();
        res.json(dataRegister);
    } catch (error) {
        console.error(error, "\n   backend error broo bagian team controller");
        res.status(500).json({message: "backend error broo bagian register controller"});
    }
}
