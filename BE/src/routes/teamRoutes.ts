import {Router} from "express";
import {getAllTeamsController} from "../controllers/teamController";

const router = Router();

router.get('/', getAllTeamsController);

export default router;
