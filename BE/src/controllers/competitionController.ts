import { Request, Response } from 'express';
import { getAllCompetitions,uploadDocument,inputDataCompetitions, checkCompetitionsByRegistrationID, createCompetitions } from '../models/competitionsModel';
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

export const inputDataCompetitionsController = async (req: Request, res: Response) => {
    try {
        const { proposal, dokumenSubstansi, pernyataanOriginalitas, title } = req.body;

        // Validasi input
        if (!proposal || !dokumenSubstansi || !pernyataanOriginalitas || !title) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }

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

        // Memanggil fungsi untuk input atau update data kompetisi
        const result = await inputDataCompetitions(RegistrationID, { proposal, dokumenSubstansi, pernyataanOriginalitas, title });

        if (result === 404) {
            return res.status(404).json({ message: 'Registration ID not found' });
        }

        res.status(200).json({ message: 'Data competisi berhasil diinput' });

    } catch (error) {
        console.error('Error in inputDataCompetitionsController:', error);
        res.status(500).json({ message: "Error inputting competition data" });
    }
};

export const checkCompetitionsController = async (req: Request, res: Response) => {
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

        const result = await checkCompetitionsByRegistrationID(RegistrationID);

        if (result === 1) {
            res.status(200).json({ message: 'Data kompetisi lengkap', exists: true });
        } else {
            res.status(200).json({ message: 'Data kompetisi tidak lengkap', exists: false });
        }

    } catch (error) {
        console.error('Error in checkCompetitionsController:', error);
        res.status(500).json({ message: "Error checking competition data" });
    }
};

export const createCompetitionsController = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

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

        const result = await createCompetitions(RegistrationID, title);

        if (result === 1) {
            res.status(201).json({ message: 'Competition created successfully' });
        } else {
            res.status(400).json({ message: 'Failed to create competition' });
        }

    } catch (error) {
        console.error('Error in createCompetitionsController:', error);
        res.status(500).json({ message: "Error creating competition" });
    }
};
