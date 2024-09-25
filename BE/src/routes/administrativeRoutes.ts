import {Router} from 'express';
import {getAllAdministrativeController,inputDataAdministrativeController} from '../controllers/administrativeController';

const router = Router();

router.get('/', getAllAdministrativeController);
router.put('/upload', inputDataAdministrativeController); // http://localhost:3987/api/administrative/upload

export default router;
