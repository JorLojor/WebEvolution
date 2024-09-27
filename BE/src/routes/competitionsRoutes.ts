import { Router } from "express";
import {
     getAllCompetitionsController,
     inputDataCompetitionsController,
     checkCompetitionsController,
} from "../controllers/competitionController";
import upload from "../config/multer";

const router = Router();

router.post(
     "/upload",
     upload.fields([
          { name: "Proposal", maxCount: 1 },
          { name: "Dokumen_Substansi", maxCount: 1 },
          { name: "Pernyataan_Originalitas", maxCount: 1 },
     ]),
     inputDataCompetitionsController
); // http://localhost:3987/api/competitions/upload
router.get("/check", checkCompetitionsController); // http://localhost:3987/api/competitions/check

router.get("/", getAllCompetitionsController);
export default router;
