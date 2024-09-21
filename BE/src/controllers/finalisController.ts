import {Request, Response} from "express";
import {getAllFinalis} from "../models/finalisModel";

export const getAllFinalisController = async (req: Request, res: Response) => {
    try {
        const finalis = await getAllFinalis();
        res.json(finalis);
    } catch (error) {
        console.error(error, "\n   backend error broo bagian finalis controller");
        res.status(500).json({message: "backend error broo bagian finalis"});
    }
}
