import { Request, Response } from 'express';
import { sendEmail } from '../utils/helpersendEmail';

export const sendMessage = {
  sendEmail: async (req: Request, res: Response) => {
    try {
      const { to, subject, text = '' } = req.body;

      await sendEmail(to, subject, text);

      res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  },
};
