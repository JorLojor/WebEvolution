import  {Router} from "express";
import {getAllCompetitionsController,inputDataCompetitionsController} from "../controllers/competitionController";
import upload from "../config/multer";

const router = Router();

router.get('/', getAllCompetitionsController);
router.post('/upload', upload.fields([
    {name: 'Proposal', maxCount: 1},
    {name: 'Dokumen_Substansi',maxCount: 1},
    {name: 'Pernyataan_Originalitas',maxCount: 1}
]),inputDataCompetitionsController);


export default router;
