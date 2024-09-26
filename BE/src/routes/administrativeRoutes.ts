import { Router } from "express";
import {
     getAllAdministrativeController,
     uploadAdministrativeController,
     checkAdministrativeController,
} from "../controllers/administrativeController";
import upload from "../config/multer";

const router = Router();

router.post(
     "/upload/document",
     upload.fields([
          { name: "Kartu_Tanda_Mahasiswa", maxCount: 1 },
          { name: "Bukti_post_Twibon", maxCount: 1 },
          { name: "Bukti_Pembayaran", maxCount: 1 },
     ]),
     uploadAdministrativeController
); // http://localhost:3987/api/administrative/upload/document

router.get("/", getAllAdministrativeController);
router.get("/cek-administrasi", checkAdministrativeController); // http://localhost:3987/api/administrative/cek-administrasi

export default router;
