import { Router } from "express";
import {getAllRegisterController} from "../controllers/registerController";

const router = Router();

router.get('/', getAllRegisterController);

export default router;
