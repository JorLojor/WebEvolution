import { Router } from 'express';
import { 
    getAllRegisterController, 
    getSingleRegisterController, 
    createRegisterController, 
    updateRegisterController, 
    deleteRegisterController,
    loginRegisterController
} from '../controllers/registerController';

const router = Router();

router.get('/', getAllRegisterController);
router.get('/:id', getSingleRegisterController);
router.put('/:id', updateRegisterController);
router.delete('/:id', deleteRegisterController);

//auth
router.post('/', createRegisterController); // http://localhost:3987/api/register
router.post('/login', loginRegisterController); // http://localhost:3987/api/register/login

export default router;
