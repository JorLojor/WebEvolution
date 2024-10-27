import { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTeamData, setTeamError } from "../slice/teamSlice";

const MemberTeam = () => {
     const dispatch = useDispatch();
     const ambilUser = useSelector((state) => state.user);
     const tokenne = ambilUser.user?.token;
     const teamData = useSelector((state) => state.team.teamData);
     const [formData, setFormData] = useState({
          Nama_Anggota1: "",
          NIM_Anggota1: "",
          Nama_Anggota2: "",
          NIM_Anggota2: "",
          Nama_Anggota3: "",
          NIM_Anggota3: "",
     });

     const [registerData, setRegisterData] = useState(null);
     const [loading, setLoading] = useState(false);

     const handleChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value,
          });
     };

     const getRegister = async () => {
          if (!tokenne) {
               console.error("Token tidak tersedia, silakan login kembali.");
               return;
          }

          try {
               setLoading(true);
               const response = await fetch(
                    `${import.meta.env.VITE_DB_API_URL}api/register/single`,
                    {
                         method: "GET",
                         headers: {
                              Authorization: `Bearer ${tokenne}`,
                         },
                    }
               );

               const result = await response.json();

               if (response.ok) {
                    setRegisterData(result);
               } else {
                    console.error("Error fetching register data:", result.message);
                    alert("Gagal menampilkan data registrasi: " + result.message);
               }
          } catch (error) {
               console.error("Error during register request:", error);
               alert("Terjadi kesalahan saat menampilkan data registrasi.");
          } finally {
               setLoading(false);
          }
     };

     const handGetTeamById = async () => {
          if (!tokenne) {
               console.error("Token tidak tersedia, silakan login kembali.");
               return;
          }

          try {
               setLoading(true);
               const response = await fetch(
                    `${import.meta.env.VITE_DB_API_URL}api/team/getByID`,
                    {
                         method: "GET",
                         headers: {
                              Authorization: `Bearer ${tokenne}`,
                         },
                    }
               );

               const result = await response.json();

               if (response.ok) {
                    dispatch(setTeamData(result));
                    setFormData({
                         Nama_Anggota1: result.Nama_Anggota1 || "",
                         NIM_Anggota1: result.NIM_Anggota1 || "",
                         Nama_Anggota2: result.Nama_Anggota2 || "",
                         NIM_Anggota2: result.NIM_Anggota2 || "",
                         Nama_Anggota3: "",
                         NIM_Anggota3: "",
                    });
               } else {
                    console.error("Error fetching team data:", result.message);
                    alert("Gagal menampilkan data tim: " + result.message);
                    dispatch(setTeamError(result.message));
               }
          } catch (error) {
               console.error("Error during show member request:", error);
               alert("Terjadi kesalahan saat menampilkan anggota tim.");
               dispatch(setTeamError(error.message));
          } finally {
               setLoading(false);
          }
     };

     // Function to add a new member to the team
     const handlerAddMember = async () => {
          if (!tokenne) {
               console.error("Token tidak tersedia, silakan login kembali.");
               return;
          }

          try {
               const response = await fetch(
                    `${import.meta.env.VITE_DB_API_URL}api/team/add/member`,
                    {
                         method: "PUT",
                         headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${tokenne}`,
                         },
                         body: JSON.stringify(formData),
                    }
               );

               const result = await response.json();

               if (response.ok) {
                    alert("Anggota tim berhasil ditambahkan.");
               } else {
                    console.error("Error adding team members:", result.message);
                    alert("Gagal menambahkan anggota tim: " + result.message);
               }
          } catch (error) {
               console.error("Error during add member request:", error);
               alert("Terjadi kesalahan saat menambahkan anggota tim.");
          }
     };

     useEffect(() => {
          handGetTeamById();
          getRegister();
     }, []);

     return (
          <Fragment>
               <h1 className="text-white bg-[#222725] p-4 rounded-lg">Identitas Tim</h1>

               <div className="bg-[#222725] mt-8 p-4 rounded-md">
                    {loading ? (
                         <p className="text-white">Loading register data...</p>
                    ) : registerData ? (
                         <>
                              <div className="form-group flex items-center">
                                   <p className="text-white w-1/5 text-sm">Nama Tim</p>
                                   <input
                                        type="text"
                                        value={registerData.Nama_Team || "Tidak tersedia"}
                                        className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                                        disabled
                                   />
                              </div>
                              <div className="form-group flex items-center mt-3">
                                   <p className="text-white w-1/5 text-sm">Nama Ketua</p>
                                   <input
                                        type="text"
                                        value={registerData.Nama || "Tidak tersedia"}
                                        className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                                        disabled
                                   />
                              </div>
                              <div className="form-group flex items-center mt-3">
                                   <p className="text-white w-1/5 text-sm">
                                        Email
                                   </p>
                                   <input
                                        type="text"
                                        value={
                                             registerData.Email ||
                                             "Tidak tersedia"
                                        }
                                        className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                                        disabled
                                   />
                              </div>
                              <div className="form-group flex items-center mt-3">
                                   <p className="text-white w-1/5 text-sm">
                                        Nomor Telepon
                                   </p>
                                   <input
                                        type="text"
                                        value={
                                             registerData.Nomor_Telfon ||
                                             "Tidak tersedia"
                                        }
                                        className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                                        disabled
                                   />
                              </div>
                              <div className="form-group flex items-center mt-3">
                                   <p className="text-white w-1/5 text-sm">
                                        Instansi
                                   </p>
                                   <input
                                        type="text"
                                        value={
                                             registerData.Nama_Instansi ||
                                             "Tidak tersedia"
                                        }
                                        className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                                        disabled
                                   />
                              </div>
                              <div className="form-group flex items-center mt-3">
                                   <p className="text-white w-1/5 text-sm">
                                        Provinsi
                                   </p>
                                   <input
                                        type="text"
                                        value={
                                             registerData.Provinsi ||
                                             "Tidak tersedia"
                                        }
                                        className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                                        disabled
                                   />
                              </div>
                              <div className="form-group flex items-center mt-3">
                                   <p className="text-white w-1/5 text-sm">
                                        Kabupaten
                                   </p>
                                   <input
                                        type="text"
                                        value={
                                             registerData.Kabupaten ||
                                             "Tidak tersedia"
                                        }
                                        className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                                        disabled
                                   />
                              </div>
                         </>
                    ) : (
                         <p className="text-white">Tidak ada data registrasi.</p>
                    )}

                    {/* Form for adding team members */}
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">Nama Anggota 1</p>
                         <input
                              type="text"
                              name="Nama_Anggota1"
                              value={teamData?.Nama_Anggota1}
                              onChange={handleChange}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                              disabled={!!teamData?.Nama_Anggota1} 
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">NIM Anggota 1</p>
                         <input
                              type="number"
                              name="NIM_Anggota1"
                              value={teamData?.NIM_Anggota1}
                              onChange={handleChange}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                              disabled={!!teamData?.NIM_Anggota1} 
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">Nama Anggota 2</p>
                         <input
                              type="text"
                              name="Nama_Anggota2"
                              value={teamData?.Nama_Anggota2}
                              onChange={handleChange}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                              disabled={!!teamData?.Nama_Anggota2} 
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">NIM Anggota 2</p>
                         <input
                              type="number"
                              name="NIM_Anggota2"
                              value={teamData?.NIM_Anggota2}
                              onChange={handleChange}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                              disabled={!!teamData?.NIM_Anggota2} // Disable if teamData exists
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">Nama Anggota 3</p>
                         <input
                              type="text"
                              name="Nama_Anggota3"
                              value={teamData?.Nama_Anggota3}
                              onChange={handleChange}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">NIM Anggota 3</p>
                         <input
                              type="number"
                              name="NIM_Anggota3"
                              value={teamData?.NIM_Anggota3}
                              onChange={handleChange}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                         />
                    </div>
                    <button
                         className={`btn btn-primary mt-3 bg-[#E4E6C3] p-4 rounded-lg ${teamData?.NIM_Anggota1 ? 'hidden' : 'block'}`}
                         onClick={handlerAddMember}
                    >
                         Add Member
                    </button>
               </div>
          </Fragment>
     );
};

export default MemberTeam;
