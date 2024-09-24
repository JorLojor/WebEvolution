import { Router } from 'express';
import { 
    getAllRegisterController, 
    getSingleRegisterController, 
    createRegisterController, 
    updateRegisterController, 
    deleteRegisterController 
} from '../controllers/registerController';

const router = Router();

router.get('/', getAllRegisterController);
router.get('/:id', getSingleRegisterController);
router.post('/', createRegisterController);
router.put('/:id', updateRegisterController);
router.delete('/:id', deleteRegisterController);

export default router;
