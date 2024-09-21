import  {Router} from "express";
import {getAllCompetitionsController} from "../controllers/competitionController";

const router = Router();

router.get('/', getAllCompetitionsController);

export default router;
