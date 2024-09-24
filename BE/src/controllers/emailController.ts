import { Request, Response } from 'express';
import { sendEmail } from '../utils/helpersendEmail';

export const sendMessage = {
  sendEmail: async (req: Request, res: Response) => {
    try {
      const { to } = req.body;

      const subject = "Selamat! Anda Telah Teregisterasi Tahap 1";
      const text = `
        Halo, \n\n
        Selamat! Anda telah berhasil menyelesaikan tahap pertama registrasi Lomba IT. Kami sangat senang menyambut antusiasme Anda dalam kompetisi ini.\n\n
        Untuk melanjutkan ke tahap kedua registrasi, silakan klik link berikut yang telah kami tentukan:\n
        [Link ke Registrasi Tahap 2]\n\n
        Semoga sukses dalam perjalanan Anda mengikuti lomba ini. Jangan lewatkan informasi selanjutnya yang akan kami kirimkan kepada Anda. Terima kasih telah berpartisipasi dan kami berharap yang terbaik untuk Anda!\n\n
        Salam hangat,\n
        Panitia Lomba IT
      `;

      await sendEmail(to, subject, text);

      res.status(200).json({ message: 'Email registrasi tahap 1 berhasil dikirim!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Gagal mengirim email registrasi' });
    }
  },
};
