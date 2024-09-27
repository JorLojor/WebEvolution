import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { useSelector } from "react-redux";
// import css
import "./loading.css";

const Administrative = () => {
     const ambilUser = useSelector((state) => state.user);
     const tokenne = ambilUser.user?.token;

     const [files, setFiles] = useState({
          Kartu_Tanda_Mahasiswa: null,
          Bukti_post_Twibon: null,
          Bukti_Pembayaran: null,
     });

     const [isRegistered, setIsRegistered] = useState(null);
     const [uploadSuccess, setUploadSuccess] = useState(false);
     const [isLoading, setIsLoading] = useState(false);

     useEffect(() => {
          const checkRegistrationStatus = async () => {
               if (!tokenne) {
                    console.error(
                         "Token tidak tersedia, silakan login kembali."
                    );
                    return;
               }

               try {
                    const response = await fetch(
                         "http://localhost:3987/api/administrative/cek-administrasi",
                         {
                              method: "GET",
                              headers: {
                                   Authorization: `Bearer ${tokenne}`,
                              },
                         }
                    );

                    const result = await response.json();

                    if (response.ok) {
                         setIsRegistered(result.exists);
                    } else {
                         console.error(
                              "Error checking registration status:",
                              result.message
                         );
                    }
               } catch (error) {
                    console.error(
                         "Error during registration status check:",
                         error
                    );
               }
          };

          checkRegistrationStatus();
     }, [tokenne]);

     const handleFileChange = (e) => {
          setFiles({
               ...files,
               [e.target.name]: e.target.files[0],
          });
     };

     const handleSubmitAdministrative = async (e) => {
          e.preventDefault();

          if (!tokenne) {
               console.error("Token tidak tersedia, silakan login kembali.");
               return;
          }

          setIsLoading(true);

          const formData = new FormData();
          formData.append("Kartu_Tanda_Mahasiswa", files.Kartu_Tanda_Mahasiswa);
          formData.append("Bukti_post_Twibon", files.Bukti_post_Twibon);
          formData.append("Bukti_Pembayaran", files.Bukti_Pembayaran);

          try {
               const response = await fetch(
                    "http://localhost:3987/api/administrative/upload/document",
                    {
                         method: "POST",
                         headers: {
                              Authorization: `Bearer ${tokenne}`,
                         },
                         body: formData,
                    }
               );

               const result = await response.json();

               if (response.ok) {
                    console.log("Documents uploaded successfully:", result);
                    alert("Dokumen berhasil diunggah.");
                    setUploadSuccess(true);
                    setFiles({
                         Kartu_Tanda_Mahasiswa: null,
                         Bukti_post_Twibon: null,
                         Bukti_Pembayaran: null,
                    });
               } else {
                    console.error("Error uploading documents:", result.message);
                    alert("Gagal mengunggah dokumen: " + result.message);
               }
          } catch (error) {
               console.error("Error during document upload:", error);
               alert("Terjadi kesalahan saat mengunggah dokumen.");
          } finally {
               setIsLoading(false);
          }
     };

     return (
          <Layout>
               <div className="container mt-5">
                    <h1 className="text-center mb-4">
                         Upload Dokumen Administrasi
                    </h1>

                    {isRegistered === null ? (
                         <div className="alert alert-info">
                              Memeriksa status registrasi...
                         </div>
                    ) : isRegistered ? (
                         <div className="alert alert-success">
                              Anda sudah terdaftar. Anda tidak bisa mengunggah
                              dokumen lagi.
                         </div>
                    ) : (
                         <div className="alert alert-warning">
                              Anda belum terdaftar. Silakan unggah dokumen Anda
                              di bawah ini.
                         </div>
                    )}

                    {uploadSuccess && (
                         <div className="alert alert-info">
                              Dokumen Anda berhasil diunggah.
                         </div>
                    )}

                    <form
                         onSubmit={handleSubmitAdministrative}
                         className="p-4 shadow-sm rounded bg-light">
                         <div className="form-group mb-3">
                              <label className="form-label">
                                   Kartu Tanda Mahasiswa
                              </label>
                              <input
                                   type="file"
                                   name="Kartu_Tanda_Mahasiswa"
                                   onChange={handleFileChange}
                                   className="form-control"
                                   value={
                                        files.Kartu_Tanda_Mahasiswa
                                             ? undefined
                                             : ""
                                   }
                                   disabled={isRegistered} // Menonaktifkan input jika sudah terdaftar
                              />
                         </div>

                         <div className="form-group mb-3">
                              <label className="form-label">
                                   Bukti Post Twibon
                              </label>
                              <input
                                   type="file"
                                   name="Bukti_post_Twibon"
                                   onChange={handleFileChange}
                                   className="form-control"
                                   value={
                                        files.Bukti_post_Twibon ? undefined : ""
                                   }
                                   disabled={isRegistered} // Menonaktifkan input jika sudah terdaftar
                              />
                         </div>

                         <div className="form-group mb-3">
                              <label className="form-label">
                                   Bukti Pembayaran
                              </label>
                              <input
                                   type="file"
                                   name="Bukti_Pembayaran"
                                   onChange={handleFileChange}
                                   className="form-control"
                                   value={
                                        files.Bukti_Pembayaran ? undefined : ""
                                   }
                                   disabled={isRegistered} // Menonaktifkan input jika sudah terdaftar
                              />
                         </div>

                         <button
                              type="submit"
                              className="btn btn-primary w-100 bg-red-400"
                              disabled={isRegistered} // Menonaktifkan tombol jika sudah terdaftar
                         >
                              Upload
                         </button>
                    </form>

                    {isLoading && (
                         <div className="loading-overlay">
                              <div className="spinner"></div>
                         </div>
                    )}
               </div>
          </Layout>
     );
};

export default Administrative;
