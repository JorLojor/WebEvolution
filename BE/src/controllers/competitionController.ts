import { Request, Response } from 'express';
import { getAllCompetitions,uploadDocument } from '../models/competitionsModel';
import jwt from 'jsonwebtoken';

export const getAllCompetitionsController = async (req: Request, res: Response) => {
    try {
        const Competitions = await getAllCompetitions();
        res.json(Competitions);
    } catch (error) {
        console.error(error,"\n   backend error broo bagian competition controller");
        res.status(500).json({message: "backend error broo bagian competition controller"});
        
    }
}

export const uploadDocumentController = async (req: Request, res: Response) => {
    try {
        const { proposal, dokumenSubstansi, pernyataanOriginalitas } = req.body;
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

        const result = await uploadDocument(RegistrationID, proposal, dokumenSubstansi, pernyataanOriginalitas);
        if (result === 404) {
            return res.status(404).json({ message: 'Registration ID not found' });
        }
        if (result === 500) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        res.status(200).json({ message: 'Document uploaded successfully' });
        
    } catch (error) {
        console.error(error,"\n   backend error broo bagian competition controller upload document");
        res.status(500).json({message: "backend error broo bagian competition controller upload document"});
    }
};
