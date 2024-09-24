import { Request, Response } from 'express';
import { sendEmail } from '../utils/helpersEmail';

export const sendMessage = {
  sendEmail: async (to: string, subject: string, text: string, res: Response) => {
    try {
      await sendEmail(to, subject, text);
      
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Gagal mengirim email registrasi' });
    }
  },
};
