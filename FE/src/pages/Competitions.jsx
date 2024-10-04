
import { useState, useEffect, Fragment } from "react";
import Layout from "../layout/Layout";
import { useSelector } from "react-redux";
import "./loading.css";

const CompetitionUpload = () => {
     const ambilUser = useSelector((state) => state.user);
     const tokenne = ambilUser.user?.token;

     const [files, setFiles] = useState({
          Proposal: null,
          Dokumen_Substansi: null,
          Pernyataan_Originalitas: null,
     });

     const [isVerified, setIsVerified] = useState(null);
     const [uploadSuccess, setUploadSuccess] = useState(false);
     const [isLoading, setIsLoading] = useState(false);

     const checkRegistrationStatus = async () => {
          if (!tokenne) {
               console.error(
                    "Token tidak tersedia, silakan login kembali."
               );
               return;
          }

          try {
               const response = await fetch(
                    "http://localhost:3987/api/competitions/check",
                    {
                         method: "GET",
                         headers: {
                              Authorization: `Bearer ${tokenne}`,
                         },
                    }
               );
               
               const result = await response.json();
               console.log(result);

               if (response.ok) {
                    setIsVerified(true);
               } else {
                    setIsVerified(false);
               }
          } catch (error) {
               console.error(
                    "Error during registration status check:",
                    error
               );
          }
     };

     useEffect(() => {
          checkRegistrationStatus();
     }, [tokenne, isVerified]);

     const handleFileChange = (e) => {
          setFiles({
               ...files,
               [e.target.name]: e.target.files[0],
          });
     };

     const handleSubmitCompetition = async (e) => {
          e.preventDefault();

          if (!tokenne) {
               console.error("Token tidak tersedia, silakan login kembali.");
               return;
          }

          setIsLoading(true);

          const formData = new FormData();
          formData.append("Proposal", files.Proposal);
          formData.append("Dokumen_Substansi", files.Dokumen_Substansi);
          formData.append(
               "Pernyataan_Originalitas",
               files.Pernyataan_Originalitas
          );

          try {
               const response = await fetch(
                    "http://localhost:3987/api/competitions/upload",
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
                         Proposal: null,
                         Dokumen_Substansi: null,
                         Pernyataan_Originalitas: null,
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
          <Fragment>
               <div className="container mt-5">
                    <h1 className="text-center mb-4 text-white bg-[#222725] p-4 rounded-md">
                         Upload Dokumen Kompetisi
                    </h1>

                    {isLoading  ? (
                         <div className="alert alert-info text-white bg-[#222725] p-4 rounded-md">
                              Memeriksa status registrasi...
                         </div>
                    ) : isVerified ? (
                         <div className="alert alert-success text-white bg-[#222725] p-4 rounded-md">
                              document sudah di upload
                         </div>
                    ) : (
                         <div className="alert alert-warning text-white bg-[#222725] p-4 rounded-md">
                              tolong Upload document Di bawah
                         </div>
                    )}

                    {uploadSuccess && (
                         <div className="alert alert-info text-white bg-[#222725] p-4 rounded-md">
                              Dokumen Anda berhasil diunggah.
                         </div>
                    )}

                    <form
                         onSubmit={handleSubmitCompetition}
                         className="p-4 shadow-sm rounded-md bg-light bg-[#222725] mt-4">
                         <div className="form-group mb-3 flex items-center">
                              <p className="form-label text-white w-1/5">Proposal</p>
                              <input
                                   type="file"
                                   name="Proposal"
                                   onChange={handleFileChange}
                                   className="form-control w-max bg-[#E4E6C3] rounded-md p-2"
                                   value={files.Proposal ? undefined : ""}
                                   disabled={isVerified}
                              />
                         </div>

                         <div className="form-group mb-3 flex items-center">
                              <p className="form-label text-white w-1/5">
                                   Dokumen Substansi
                              </p>
                              <input
                                   type="file"
                                   name="Dokumen_Substansi"
                                   onChange={handleFileChange}
                                   className="form-control w-max bg-[#E4E6C3] rounded-md p-2"
                                   value={
                                        files.Dokumen_Substansi ? undefined : ""
                                   }
                                   disabled={isVerified}
                              />
                         </div>

                         <div className="form-group mb-3 flex items-center">
                              <p className="form-label text-white w-1/5">
                                   Pernyataan Originalitas
                              </p>
                              <input
                                   type="file"
                                   name="Pernyataan_Originalitas"
                                   onChange={handleFileChange}
                                   className="form-control w-max bg-[#E4E6C3] rounded-md p-2"
                                   value={
                                        files.Pernyataan_Originalitas
                                             ? undefined
                                             : ""
                                   }
                                   disabled={isVerified}
                              />
                         </div>

                         <button
                              type="submit"
                              className={`${isVerified ? 'hidden' : 'block'} btn btn-primary w-100 bg-[#E4E6C3] p-2 rounded-md px-4`}
                              disabled={isVerified}>
                              Upload
                         </button>
                    </form>

                    {isLoading && (
                         <div className="loading-overlay">
                              <div className="spinner"></div>
                         </div>
                    )}
               </div>
          </Fragment>
     );
};

export default CompetitionUpload;