import { Request, Response } from 'express';
import { sendEmail } from '../utils/helpersEmail';

export const sendMessage = {
  sendEmail: async (to: string, subject: string, text: string, html?: string) => {
    try {
      await sendEmail(to, subject, text, html);
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  },
};

