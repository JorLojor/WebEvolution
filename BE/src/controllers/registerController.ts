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
import { log } from 'console';



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









export const getAllRegisterController = async (req: Request, res: Response) => {
    try {
        const dataRegister = await getAllRegisters();
        res.json(dataRegister);
    } catch (error) {
        console.error(error, "\n   backend error broo bagian register controller");
        res.status(500).json({ message: "backend error broo bagian register controller" });
    }
}
export const createRegisterController = async (req: Request, res: Response) => {
    try {
        const newRegister = req.body;  
        await createRegister(newRegister);
        res.status(201).json({ message: "Register created successfully" });
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
