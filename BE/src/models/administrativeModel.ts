import { DBconnection } from "../config/db";

export interface Administrative {
     AdministrativeID: number;
     RegistrationID: number;
     Kartu_Tanda_Mahasiswa: string;
     Bukti_post_Twibon: string;
     Bukti_Pembayaran: string;
}

export const uploadDataAdministrative = async (
     RegistrationID: number,
     newDataAdministrative: Administrative
): Promise<number> => {
     const { Kartu_Tanda_Mahasiswa, Bukti_post_Twibon, Bukti_Pembayaran } =
          newDataAdministrative;

     const [dataAdministrative]: [any[], any] = await DBconnection.query(
          `SELECT * FROM Administrative WHERE RegistrationID = ?`,
          [RegistrationID]
     );

     if (dataAdministrative.length > 0) {
          let hasil: number = 0;

          if (Kartu_Tanda_Mahasiswa !== "") {
               await DBconnection.query(
                    `UPDATE Administrative SET Kartu_Tanda_Mahasiswa = ? WHERE RegistrationID = ?`,
                    [Kartu_Tanda_Mahasiswa, RegistrationID]
               );
               hasil = 200;
          }

          if (Bukti_post_Twibon !== "") {
               await DBconnection.query(
                    `UPDATE Administrative SET Bukti_post_Twibon = ? WHERE RegistrationID = ?`,
                    [Bukti_post_Twibon, RegistrationID]
               );
               hasil = 200;
          }

          if (Bukti_Pembayaran !== "") {
               await DBconnection.query(
                    `UPDATE Administrative SET Bukti_Pembayaran = ? WHERE RegistrationID = ?`,
                    [Bukti_Pembayaran, RegistrationID]
               );
               hasil = 200;
          }

          await DBconnection.query(
               `UPDATE Register SET Status_Registrasi = 1 WHERE RegistrationID = ?`,
               [RegistrationID]
          );

          return hasil;
     } else {
          console.error("Data Administrative tidak ditemukan");
          return 404;
     }
};

export const getAllAdministrative = async (): Promise<Administrative[]> => {
     const [dataAdministrative] = await DBconnection.query(
          "SELECT * FROM Administrative"
     );
     return dataAdministrative as Administrative[];
};

// fungsi yang ajan mereturn 1 atau 0 yang amengecek apakah ada data di table Administrative yang memiliki RegisterID sesuai parameter
export const checkAdministrativeByRegistrationID = async (
     RegistrationID: number
): Promise<number> => {
     const [dataAdministrative]: any = await DBconnection.query(
          `SELECT * FROM Administrative WHERE RegistrationID = ?`,
          [RegistrationID]
     );

     if (
          dataAdministrative[0].Kartu_Tanda_Mahasiswa !== "" &&
          dataAdministrative[0].Bukti_post_Twibon !== "" &&
          dataAdministrative[0].Bukti_Pembayaran !== ""
     ) {
          return 1;
     } else {
          return 0;
     }
};

// fungsi yang akan menginsert data ke table Administrative dengan parameter RegistrationID saja
export const createAdministrative = async (
     RegistrationID: number
): Promise<number> => {
     try {
          const [result]: any = await DBconnection.query(
               `INSERT INTO Administrative 
            (RegistrationID, Kartu_Tanda_Mahasiswa, Bukti_post_Twibon, Bukti_Pembayaran)
            VALUES (?, '', '', '')`,
               [RegistrationID]
          );

       
          if (result.affectedRows > 0) {
               return 1; 
          } else {
               return 0; 
          }
     } catch (error) {
          console.error("Error inserting data into Administrative:", error);
          return 0; 
     }
};
