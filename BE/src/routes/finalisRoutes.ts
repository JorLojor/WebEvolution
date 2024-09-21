import {Router} from 'express';
import {getAllFinalisController} from '../controllers/finalisController';

const router = Router();

router.get('/', getAllFinalisController);

export default router;
