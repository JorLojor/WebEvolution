import { Request, Response } from "express";
import {
     getAllRegisters,
     getSingleRegister,
     createRegister,
     updateRegister,
     deleteRegister,
     login,
     logout,
     checkEmail,
     checkNamaTeam,
     checkNomorTelfon,
     checkNIM,
} from "../models/registerModel";
import jwt from "jsonwebtoken";
import { generateID } from "../utils/generateID";
import { sendMessage } from "./emailController";

//login controller
export const loginRegisterController = async (req: Request, res: Response) => {
     try {
          const { email, password } = req.body;

          if (!email || !password) {
               return res
                    .status(400)
                    .json({ message: "Email and password are required" });
          }

          const data = await login(email, password);

          if (data) {
               res.status(200).json({
                    message: "Login successful",
                    data: data.token,
               });
          } else {
               res.status(401).json({
                    message: "Email or password is incorrect",
               });
          }
     } catch (error) {
          console.error(error, "\nBackend error during login process.");
          res.status(500).json({
               message: "Internal server error during login process",
          });
     }
};

// Logout controller
export const logoutRegisterController = async (req: Request, res: Response) => {
     try {
          const authHeader = req.headers.authorization;
          if (!authHeader || !authHeader.startsWith("Bearer ")) {
               return res.status(401).json({
                    message: "Token tidak ditemukan atau tidak valid",
               });
          }
          const token = authHeader.split(" ")[1];
          const decoded = jwt.verify(
               token,
               process.env.SECRET_KEY as string
          ) as { RegistrationID: number };
          if (!decoded || !decoded.RegistrationID) {
               return res.status(400).json({ message: "Token tidak valid" });
          }
          const RegistrationID = decoded.RegistrationID;

          // Logout (set token di database menjadi null)
          await logout(RegistrationID);

          res.status(200).json({ message: "Logout berhasil" });
     } catch (error) {
          // Jika terjadi error saat verifikasi token atau proses lainnya
          console.error(
               error,
               "\n   backend error broo bagian register controller logout "
          );
          res.status(500).json({
               message: "backend error broo bagian register controller logout",
          });
     }
};

export const createRegisterController = async (req: Request, res: Response) => {
     try {
          const {
               Nama,
               Nomor_Telfon,
               Nama_Instansi,
               Nama_Team,
               Nomor_Induk_Mahasiswa,
               Email,
               Provinsi,
               Kabupaten,
               Password,
               Pilihan_Lomba,
          } = req.body;
          const RegistrationID = generateID();
          const newRegister: any = {
               RegistrationID,
               Nama,
               Nomor_Telfon,
               Nama_Instansi,
               Nama_Team,
               Nomor_Induk_Mahasiswa,
               Email,
               Provinsi,
               Kabupaten,
               Password,
               Pilihan_Lomba,
          };
          const emailCheckResult = (await checkEmail(Email)) ?? 200;
          if (emailCheckResult === 401) {
               return res.status(401).json({
                    code: 401,
                    message: "Email already registered",
               });
          }
          const checkNamaTeamResult: number =
               (await checkNamaTeam(Nama_Team)) ?? 200;
          if (checkNamaTeamResult === 401) {
               return res.status(401).json({
                    code: 401,
                    message: "Team name already registered",
               });
          }

          const checkNomorTelfonResult: number =
               (await checkNomorTelfon(Nomor_Telfon)) ?? 200;

          if (checkNomorTelfonResult === 401) {
               return res.status(401).json({
                    code: 401,
                    message: "Phone number already registered",
               });
          }
          const checkNomorIndukMahasiswa: number =
               (await checkNIM(Nomor_Induk_Mahasiswa)) ?? 200;
          if (checkNomorIndukMahasiswa === 401) {
               return res.status(401).json({
                    code: 401,
                    message: "NIM already registered",
               });
          }

          const result = await createRegister(newRegister);
          if (result === 201) {
               const subject = "Selamat! Anda Telah Teregisterasi Tahap 1";
               const text = `
              Halo ${Nama}, \n\n
              Selamat! Anda telah berhasil menyelesaikan tahap pertama registrasi Lomba IT. Kami sangat senang menyambut antusiasme Anda dalam kompetisi ini.\n\n
              Untuk melanjutkan ke tahap kedua registrasi, silakan klik link berikut yang telah kami tentukan:\n
              [Link ke Registrasi Tahap 2]\n\n
              Semoga sukses dalam perjalanan Anda mengikuti lomba ini. Jangan lewatkan informasi selanjutnya yang akan kami kirimkan kepada Anda. Terima kasih telah berpartisipasi dan kami berharap yang terbaik untuk Anda!\n\n
              Salam hangat,\n
              Panitia Lomba IT
            `;

               // Send email confirmation via sendMessage
               await sendMessage.sendEmail(Email, subject, text, res);
               res.status(201).json({
                    code: 201,
                    message: "Register created successfully",
               });
          } else {
               res.status(400).json({
                    code: 400,
                    message: "Register failed to create",
               });
          }
     } catch (error) {
          console.error(
               error,
               "\n   backend error broo bagian register controller"
          );
          res.status(500).json({
               code: 500,
               message: "backend error broo bagian register controller",
          });
     }
};

export const getSingleRegisterController = async (
     req: Request,
     res: Response
) => {
     try {
          const authHeader = req.headers.authorization;
          if (!authHeader || !authHeader.startsWith("Bearer ")) {
               return res.status(401).json({
                    message: "Token tidak ditemukan atau tidak valid",
               });
          }

          const token = authHeader.split(" ")[1];
          const decoded = jwt.verify(
               token,
               process.env.SECRET_KEY as string
          ) as { RegistrationID: number };
          if (!decoded || !decoded.RegistrationID) {
               return res.status(400).json({ message: "Token tidak valid" });
          }

          const RegistrationID = decoded.RegistrationID;
          const singleRegister = await getSingleRegister(
               Number(RegistrationID)
          );
          console.log(singleRegister);
          if (singleRegister) {
               res.json(singleRegister);
          } else {
               res.status(404).json({ message: "Register not found" });
          }
     } catch (error) {
          console.error(
               error,
               "\n   backend error broo bagian register controller"
          );
          res.status(500).json({
               message: "backend error broo bagian register controller",
          });
     }
};

export const getAllRegisterController = async (req: Request, res: Response) => {
     try {
          const dataRegister = await getAllRegisters();
          res.json(dataRegister);
     } catch (error) {
          console.error(
               error,
               "\n   backend error broo bagian register controller"
          );
          res.status(500).json({
               message: "backend error broo bagian register controller",
          });
     }
};

export const updateRegisterController = async (req: Request, res: Response) => {
     try {
          const { id } = req.params;
          const updatedRegister = req.body;
          await updateRegister(Number(id), updatedRegister);
          res.json({ message: "Register updated successfully" });
     } catch (error) {
          console.error(
               error,
               "\n   backend error broo bagian register controller"
          );
          res.status(500).json({
               message: "backend error broo bagian register controller",
          });
     }
};

export const deleteRegisterController = async (req: Request, res: Response) => {
     try {
          const { id } = req.params;
          await deleteRegister(Number(id));
          res.json({ message: "Register deleted successfully" });
     } catch (error) {
          console.error(
               error,
               "\n   backend error broo bagian register controller"
          );
          res.status(500).json({
               message: "backend error broo bagian register controller",
          });
     }
};
