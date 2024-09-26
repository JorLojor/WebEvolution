import { Request, Response } from "express";
import {
     getAllAdministrative,
     uploadDataAdministrative,
} from "../models/administrativeModel";
import jwt from "jsonwebtoken";
import { uploadFile } from "../config/fileUpload";
import { checkStatusRegistrasiWithExpectedStatus } from "../models/registerModel";

export const uploadAdministrativeController = async (
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

          const cek_status = await checkStatusRegistrasiWithExpectedStatus(
               RegistrationID,
               1
          );
          if (cek_status !== 1) {
               return res.status(400).json({ message: "bad request" });
          }

          const files = req.files as {
               [fieldname: string]: Express.Multer.File[];
          };

          if (
               !files.Kartu_Tanda_Mahasiswa ||
               !files.Bukti_post_Twibon ||
               !files.Bukti_Pembayaran
          ) {
               return res.status(400).json({ message: "File tidak lengkap" });
          }

          const kartuTandaMahasiswaUrl = await uploadFile(
               files.Kartu_Tanda_Mahasiswa[0].buffer,
               "Kartu_Tanda_Mahasiswa"
          );
          const buktiPostTwibonUrl = await uploadFile(
               files.Bukti_post_Twibon[0].buffer,
               "Bukti_post_Twibon"
          );
          const buktiPembayaranUrl = await uploadFile(
               files.Bukti_Pembayaran[0].buffer,
               "Bukti_Pembayaran"
          );

          const newDataAdministrative = {
               AdministrativeID: 0,
               RegistrationID,
               Kartu_Tanda_Mahasiswa: kartuTandaMahasiswaUrl,
               Bukti_post_Twibon: buktiPostTwibonUrl,
               Bukti_Pembayaran: buktiPembayaranUrl,
          };

          await uploadDataAdministrative(RegistrationID, newDataAdministrative);

          return res.status(200).json({
               message: "Documents uploaded successfully.",
               data: newDataAdministrative,
          });
     } catch (error) {
          console.error(
               error,
               "\n   backend error broo bagian administative controller"
          );
          res.status(500).json({
               message: "backend error broo bagian team administrative",
          });
     }
};

// export const inputDataAdministrativeController = async (
//      req: Request,
//      res: Response
// ) => {
//      try {
//           const { Kartu_Tanda_Mahasiswa, Bukti_post_Twibon, Bukti_Pembayaran } =
//                req.body;
//           const authHeader = req.headers.authorization;
//           if (!authHeader || !authHeader.startsWith("Bearer ")) {
//                return res
//                     .status(401)
//                     .json({
//                          message: "Token tidak ditemukan atau tidak valid",
//                     });
//           }
//           const token = authHeader.split(" ")[1];
//           const decoded = jwt.verify(
//                token,
//                process.env.SECRET_KEY as string
//           ) as { RegistrationID: number };
//           if (!decoded || !decoded.RegistrationID) {
//                return res.status(400).json({ message: "Token tidak valid" });
//           }
//           const RegistrationID = decoded.RegistrationID;

//           const newDataAdministrative = {
//                // AdministrasiID di model itu nga kepake apakah akan error??
//                AdministrativeID: 0, // Assuming 0 or some default value
//                RegistrationID,
//                Kartu_Tanda_Mahasiswa,
//                Bukti_post_Twibon,
//                Bukti_Pembayaran,
//           };

//           const result = await inputDataAdministrative(
//                RegistrationID,
//                newDataAdministrative
//           );

//           if (result === 404) {
//                return res
//                     .status(404)
//                     .json({ message: "Registration ID not found" });
//           }

//           if (result === 500) {
//                return res
//                     .status(500)
//                     .json({ message: "Internal server error" });
//           }

//           res.status(200).json({ message: "Document uploaded successfully" });
//      } catch (error) {
//           console.error(
//                error,
//                "\n   backend error broo bagian administrative controller inputDataAdministrativeController"
//           );
//           res.status(500).json({
//                message: "backend error broo bagian administrative controller inputDataAdministrativeController",
//           });
//      }
// };

export const getAllAdministrativeController = async (
     req: Request,
     res: Response
) => {
     try {
          const administative = await getAllAdministrative();
          res.json(administative);
     } catch (error) {
          console.error(
               error,
               "\n   backend error broo bagian administative controller"
          );
          res.status(500).json({
               message: "backend error broo bagian team administative",
          });
     }
};

// export const checkAdministrativeController = async (
//      req: Request,
//      res: Response
// ) => {
//      try {
//           const token = req.headers["authorization"];
//           if (!token || !token.startsWith("Bearer ")) {
//                return res.status(401).json({
//                     message: "Token tidak ditemukan atau tidak valid",
//                });
//           }
//           const extractedToken = token.split(" ")[1];
//           const registrationIdNumber = parseInt(extractedToken);
//           if (isNaN(registrationIdNumber)) {
//                return res
//                     .status(400)
//                     .json({ message: "RegistrationID tidak valid" });
//           }
//           const exists = await checkAdministrativeByRegistrationID(
//                registrationIdNumber
//           );
//           if (exists === 1) {
//                res.json({ message: "Data ditemukan", exists: true });
//           } else {
//                res.json({ message: "Data tidak ditemukan", exists: false });
//           }
//      } catch (error) {
//           console.error(
//                error,
//                "\n   backend error broo bagian administrative controller"
//           );
//           res.status(500).json({
//                message: "backend error broo bagian administrative controller",
//           });
//      }
// };

// export const createAdministrativeController = async (
//      req: Request,
//      res: Response
// ) => {
//      try {
//           const token = req.headers["authorization"];
//           if (!token || !token.startsWith("Bearer ")) {
//                return res.status(401).json({
//                     message: "Token tidak ditemukan atau tidak valid",
//                });
//           }
//           const extractedToken = token.split(" ")[1];
//           const registrationIdNumber = parseInt(extractedToken);
//           if (isNaN(registrationIdNumber)) {
//                return res
//                     .status(400)
//                     .json({ message: "RegistrationID tidak valid" });
//           }
//           const result = await createAdministrative(registrationIdNumber);
//           if (result === 1) {
//                res.status(201).json({
//                     message: "Data berhasil diinsert ke tabel Administrative",
//                });
//           } else {
//                res.status(400).json({
//                     message: "Gagal menginsert data ke tabel Administrative",
//                });
//           }
//      } catch (error) {
//           console.error(
//                error,
//                "\n   backend error broo bagian administrative controller"
//           );
//           res.status(500).json({
//                message: "backend error broo bagian administrative controller",
//           });
//      }
// };
