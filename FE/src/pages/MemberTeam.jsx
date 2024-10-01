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
     });

     const [loading, setLoading] = useState(false);

     const handleChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value,
          });
     };

     const handGetTeamById = async () => {
          if (!tokenne) {
               console.error("Token tidak tersedia, silakan login kembali.");
               return;
          }

          try {
               setLoading(true); // Set loading state
               const response = await fetch(
                    "http://localhost:3987/api/team/getByID",
                    {
                         method: "GET",
                         headers: {
                              Authorization: `Bearer ${tokenne}`,
                         },
                    }
               );

               const result = await response.json();
               console.log("result", result);

               if (response.ok) {
                    console.log("Team data fetched successfully:", result);
                    dispatch(setTeamData(result)); // Store in Redux
               } else {
                    console.error("Error fetching team data:", result.message);
                    alert("Gagal menampilkan data tim: " + result.message);
                    dispatch(setTeamError(result.message)); // Store error in Redux
               }
          } catch (error) {
               console.error("Error during show member request:", error);
               alert("Terjadi kesalahan saat menampilkan anggota tim.");
               dispatch(setTeamError(error.message));
          } finally {
               setLoading(false); // Remove loading state
          }
     };

     const handlerAddMember = async () => {
          if (!tokenne) {
               console.error("Token tidak tersedia, silakan login kembali.");
               return;
          }

          try {
               const response = await fetch(
                    "http://localhost:3987/api/team/add/member",
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
                    console.log("Team members updated successfully:", result);
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

     // UseEffect to fetch team data on component mount
     useEffect(() => {
          handGetTeamById();
     }, []);

     return (
          <Fragment>
               <h1 className="text-white bg-[#222725] p-4 rounded-lg">
                    Identitas Tim
               </h1>
               <div className="bg-[#222725] mt-8 p-4 rounded-md">
                    {/* Display fetched team data if available */}
                    {loading ? (
                         <p className="text-white">Loading team data...</p>
                    ) : teamData ? (
                         <>
                              <div className="form-group flex items-center ">
                                   <p className="text-white w-1/5 text-sm">
                                        Nama Tim
                                   </p>
                                   <input
                                        type="text"
                                        value={
                                             teamData.Nama_Tim ||
                                             "Tidak tersedia"
                                        }
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
                                             teamData.Email || "Tidak tersedia"
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
                                             teamData.Instansi ||
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
                                             teamData.Provinsi ||
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
                                             teamData.Kabupaten ||
                                             "Tidak tersedia"
                                        }
                                        className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                                        disabled
                                   />
                              </div>
                              <div className="form-group flex items-center mt-3">
                                   <p className="text-white w-1/5 text-sm">
                                        Nama Ketua
                                   </p>
                                   <input
                                        type="text"
                                        value={
                                             teamData.Nama_Anggota1 ||
                                             "Tidak tersedia"
                                        }
                                        className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                                        disabled
                                   />
                              </div>
                              <div className="form-group flex items-center mt-3">
                                   <p className="text-white w-1/5 text-sm">
                                        NIM Ketua
                                   </p>
                                   <input
                                        type="text"
                                        value={
                                             teamData.NIM_Anggota1 ||
                                             "Tidak tersedia"
                                        }
                                        className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                                        disabled
                                   />
                              </div>
                         </>
                    ) : (
                         <p className="text-white">Tidak ada data tim.</p>
                    )}

                    {/* Form for adding team members */}
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">
                              Nama Anggota 2
                         </p>
                         <input
                              type="text"
                              name="Nama_Anggota2"
                              value={formData.Nama_Anggota2}
                              onChange={handleChange}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">
                              NIM Anggota 2
                         </p>
                         <input
                              type="text"
                              name="NIM_Anggota2"
                              value={formData.NIM_Anggota2}
                              onChange={handleChange}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">
                              Nama Anggota 3
                         </p>
                         <input
                              type="text"
                              name="Nama_Anggota3"
                              value={formData.Nama_Anggota3}
                              onChange={handleChange}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">
                              NIM Anggota 3
                         </p>
                         <input
                              type="text"
                              name="NIM_Anggota3"
                              value={formData.NIM_Anggota3}
                              onChange={handleChange}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                         />
                    </div>
                    <button
                         className="btn btn-primary mt-3 bg-[#E4E6C3] p-4 rounded-lg"
                         onClick={handlerAddMember}>
                         Add Member
                    </button>
               </div>
          </Fragment>
     );
};

export default MemberTeam;
