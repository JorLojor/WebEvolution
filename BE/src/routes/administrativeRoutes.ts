import {Router} from 'express';
import {getAllAdministrativeController} from '../controllers/administrativeController';

const router = Router();

router.get('/', getAllAdministrativeController);

export default router;
