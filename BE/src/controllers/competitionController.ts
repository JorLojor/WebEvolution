import { Request, Response } from "express";
import {
     getAllCompetitions,
     uploadDocument,
     inputDataCompetitions,
     createCompetitions,
     checkCompetitionsByRegistrationID,
} from "../models/competitionsModel";
import jwt from "jsonwebtoken";
import { checkStatusRegistrasiWithExpectedStatus } from "../models/registerModel";
import { uploadFile } from "../config/fileUpload";

export const getAllCompetitionsController = async (
     req: Request,
     res: Response
) => {
     try {
          const Competitions = await getAllCompetitions();
          res.json(Competitions);
     } catch (error) {
          console.error(
               error,
               "\n   backend error broo bagian competition controller"
          );
          res.status(500).json({
               message: "backend error broo bagian competition controller",
          });
     }
};

export const inputDataCompetitionsController = async (
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
          const status_cek = await checkStatusRegistrasiWithExpectedStatus(
               RegistrationID,
               2
          );
          if (status_cek === 2) {
               return res
                    .status(400)
                    .json({ message: "Status registrasi sudah diverifikasi" });
          }

          // Validasi input
          const file = req.files as {
               [fieldname: string]: Express.Multer.File[];
          };
          if (
               !file.Proposal || 
               !file.Dokumen_Substansi ||
               !file.Pernyataan_Originalitas
          ) {
               return res.status(400).json({ message: "Files are missing" });
          }

          const proposalUrl = await uploadFile(
               file.Proposal[0].buffer,
               "Proposal"
          );
          const dokumenSubstansiUrl = await uploadFile(
               file.Dokumen_Substansi[0].buffer,
               "Dokumen_Substansi"
          );
          const pernyataanOriginalitasUrl = await uploadFile(
               file.Pernyataan_Originalitas[0].buffer,
               "Pernyataan_Originalitas"
          );

          const newDataCompetitions = {
               RegistrationID,
               Proposal: proposalUrl,
               Dokumen_Substansi: dokumenSubstansiUrl,
               Pernyataan_Originalitas: pernyataanOriginalitasUrl,
               CompetitionsID: 0,
               title: "",
          };

          await inputDataCompetitions(RegistrationID, newDataCompetitions);

          res.status(200).json({
               message: "Data kompetisi berhasil diinput",
               data: newDataCompetitions,
          });
     } catch (error) {
          console.error("Error in inputDataCompetitionsController:", error);
          res.status(500).json({ message: "Error inputting competition data" });
     }
};
