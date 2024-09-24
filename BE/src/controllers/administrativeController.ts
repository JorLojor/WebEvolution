import {Request, Response} from 'express';
import {getAllAdministrative,checkAdministrativeByRegistrationID,createAdministrative} from '../models/administrativeModel';

export const getAllAdministrativeController = async (req: Request, res: Response) => {
    try {
        const administative = await getAllAdministrative();
        res.json(administative);
    } catch (error) {
        console.error(error, "\n   backend error broo bagian administative controller");
        res.status(500).json({message: "backend error broo bagian team administative"});
        
    }
}

export const checkAdministrativeController = async (req: Request, res: Response) => {
    try {
        const token = req.headers['authorization'];
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid' });
        }
        const extractedToken = token.split(" ")[1];
        const registrationIdNumber = parseInt(extractedToken);
        if (isNaN(registrationIdNumber)) {
            return res.status(400).json({ message: "RegistrationID tidak valid" });
        }
        const exists = await checkAdministrativeByRegistrationID(registrationIdNumber);
        if (exists === 1) {
            res.json({ message: "Data ditemukan", exists: true });
        } else {
            res.json({ message: "Data tidak ditemukan", exists: false });
        }

    } catch (error) {
        console.error(error, "\n   backend error broo bagian administrative controller");
        res.status(500).json({ message: "backend error broo bagian administrative controller" });
    }
};

export const createAdministrativeController = async (req: Request, res: Response) => {
    try {
        const token = req.headers['authorization'];
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid' });
        }
        const extractedToken = token.split(" ")[1];
        const registrationIdNumber = parseInt(extractedToken);
        if (isNaN(registrationIdNumber)) {
            return res.status(400).json({ message: 'RegistrationID tidak valid' });
        }
        const result = await createAdministrative(registrationIdNumber);
        if (result === 1) {
            res.status(201).json({ message: 'Data berhasil diinsert ke tabel Administrative' });
        } else {
            res.status(400).json({ message: 'Gagal menginsert data ke tabel Administrative' });
        }
    } catch (error) {
        console.error(error, "\n   backend error broo bagian administrative controller");
        res.status(500).json({ message: "backend error broo bagian administrative controller" });
    }
};
