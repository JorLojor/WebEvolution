import  {Router} from "express";
import {getAllCompetitionsController,uploadDocumentController} from "../controllers/competitionController";

const router = Router();

router.get('/', getAllCompetitionsController);
router.put('/upload', uploadDocumentController); // http://localhost:3987/api/competitions/upload

export default router;
