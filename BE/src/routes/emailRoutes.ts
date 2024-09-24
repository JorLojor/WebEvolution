// routes.ts
import express from 'express';
import {sendMessage} from '../controllers/emailController';

const router = express.Router();

router.post('/sendmessage', sendMessage.sendEmail);

export default router;