import { Request, Response } from 'express';
import { 
    getAllRegisters, 
    getSingleRegister, 
    createRegister, 
    updateRegister, 
    deleteRegister,
    login,
    logout
} from '../models/registerModel';

import {generateID} from '../utils/generateID';

//login controller 
export const loginRegisterController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const data = await login(email, password);
        if (data) {
            res.status(200).json({
                message: "Login success",
                data: data.token
            });
        } else {
            res.status(401).json({ message: "Email or password is incorrect" });
        }
    } catch (error) {
        console.error(error, "\n   backend error broo bagian register controller login ");
        res.status(500).json({ message: "backend error broo bagian register controller login " });
    }
}

//logout controller
export const logoutRegisterController = async (req: Request, res: Response) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Token tidak ditemukan atau tidak valid' });
        }
        const token = authHeader.split(" ")[1];
        const RegistrationID = parseInt(token); 

        if (isNaN(RegistrationID)) {
            return res.status(400).json({ message: 'Token tidak valid' });
        }
        await logout(RegistrationID);
        res.status(200).json({ message: "Logout berhasil" });
    } catch (error) {
        console.error(error, "\n   backend error broo bagian register controller logout ");
        res.status(500).json({ message: "backend error broo bagian register controller logout" });
    }
};

export const createRegisterController = async (req: Request, res: Response) => {
    try {
        const { Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba } = req.body;
        const RegistrationID = generateID();
        const newRegister: any  = { RegistrationID,Nama, Nomor_Telfon, Nama_Instansi, Nama_Team, Nomor_Induk_Mahasiswa, Email, Provinsi, Kabupaten, Password, Pilihan_Lomba };
        
        const result = await createRegister(newRegister);
        if (result === 201) {
            // send email disini


            //
            res.status(201).json({code: 201, message: "Register created successfully" });
        } else {
            res.status(400).json({code: 400, message: "Register failed to create" });
        }
    } catch (error) {
        console.error(error, "\n   backend error broo bagian register controller");
        res.status(500).json({code: 500, message: "backend error broo bagian register controller" });
    }
}


export const getSingleRegisterController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;  
        const singleRegister = await getSingleRegister(Number(id));  // Pastikan id adalah number
        if (singleRegister) {
            res.json(singleRegister);
        } else {
            res.status(404).json({ message: "Register not found" });
        }
    } catch (error) {
        console.error(error, "\n   backend error broo bagian register controller");
        res.status(500).json({ message: "backend error broo bagian register controller" });
    }
}



export const getAllRegisterController = async (req: Request, res: Response) => {
    try {
        const dataRegister = await getAllRegisters();
        res.json(dataRegister);
    } catch (error) {
        console.error(error, "\n   backend error broo bagian register controller");
        res.status(500).json({ message: "backend error broo bagian register controller" });
    }
}

export const updateRegisterController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;  
        const updatedRegister = req.body;  
        await updateRegister(Number(id), updatedRegister);  
        res.json({ message: "Register updated successfully" });
    } catch (error) {
        console.error(error, "\n   backend error broo bagian register controller");
        res.status(500).json({ message: "backend error broo bagian register controller" });
    }
}

export const deleteRegisterController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;  
        await deleteRegister(Number(id));  
        res.json({ message: "Register deleted successfully" });
    } catch (error) {
        console.error(error, "\n   backend error broo bagian register controller");
        res.status(500).json({ message: "backend error broo bagian register controller" });
    }
}
