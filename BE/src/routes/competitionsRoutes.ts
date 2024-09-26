import  {Router} from "express";
import {getAllCompetitionsController,uploadDocumentController,checkCompetitionsByRegistrationIDController,createCompetitionsController} from "../controllers/competitionController";

const router = Router();

router.get('/', getAllCompetitionsController);
router.put('/upload', uploadDocumentController); // http://localhost:3987/api/competitions/upload

router.get('/check/:registrationID', checkCompetitionsByRegistrationIDController); 

router.post('/create', createCompetitionsController);

export default router;
