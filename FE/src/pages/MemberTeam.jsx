import { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../layout/Layout";

const MemberTeam = () => {
     const ambilUser = useSelector((state) => state.user);
     const tokenne = ambilUser.user?.token;

     const [formData, setFormData] = useState({
          Nama_Anggota2: "",
          NIM_Anggota2: "",
          Nama_Anggota3: "",
          NIM_Anggota3: "",
     });

     // endpoint http://localhost:3987/api/team/my-team

     // response
     //  {
     //     "TeamID": 567,
     //     "RegistrationID": 839,
     //     "Nama_Anggota1": "jors",
     //     "NIM_Anggota1": 1303213147,
     //     "Nama_Anggota2": "abang",
     //     "NIM_Anggota2": 123456,
     //     "Nama_Anggota3": "adek",
     //     "NIM_Anggota3": 654321
     // }

     const [teamData, setTeamData] = useState({
          Nama_Anggota1: "",
          NIM_Anggota1: 0,
          Nama_Anggota2: "",
          NIM_Anggota2: 0,
          Nama_Anggota3: "",
          NIM_Anggota3: 0,
     });
     const handleShowMemberTeam = async () => {
          if (!tokenne) {
               console.error("Token tidak tersedia, silakan login kembali.");
               return;
          }

          try {
               const response = await fetch(
                    "http://localhost:3987/api/team/my-team",
                    {
                         method: "GET",
                         headers: {
                              Authorization: `Bearer ${tokenne}`,
                         },
                    }
               );

               const result = await response.json();

               if (response.ok) {
                    console.log("Team members retrieved successfully:", result);
                    setTeamData({
                         Nama_Anggota1: result.Nama_Anggota1,
                         NIM_Anggota1: result.NIM_Anggota1,
                         Nama_Anggota2: result.Nama_Anggota2,
                         NIM_Anggota2: result.NIM_Anggota2,
                         Nama_Anggota3: result.Nama_Anggota3,
                         NIM_Anggota3: result.NIM_Anggota3,
                    });
               } else {
                    console.error(
                         "Error retrieving team members:",
                         result.message
                    );
                    alert("Gagal menampilkan anggota tim: " + result.message);
               }
          } catch (error) {
               console.error("Error during member team request:", error);
          }
     };

     const handleChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value,
          });
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

     return (
          <Layout>
               <h1>Tambah Anggota Tim</h1>

               <div className="form-group">
                    <label>Nama Anggota 2</label>
                    <input
                         type="text"
                         name="Nama_Anggota2"
                         value={formData.Nama_Anggota2}
                         onChange={handleChange}
                         className="form-control"
                    />
               </div>

               <div className="form-group">
                    <label>NIM Anggota 2</label>
                    <input
                         type="text"
                         name="NIM_Anggota2"
                         value={formData.NIM_Anggota2}
                         onChange={handleChange}
                         className="form-control"
                    />
               </div>

               <div className="form-group">
                    <label>Nama Anggota 3</label>
                    <input
                         type="text"
                         name="Nama_Anggota3"
                         value={formData.Nama_Anggota3}
                         onChange={handleChange}
                         className="form-control"
                    />
               </div>

               <div className="form-group">
                    <label>NIM Anggota 3</label>
                    <input
                         type="text"
                         name="NIM_Anggota3"
                         value={formData.NIM_Anggota3}
                         onChange={handleChange}
                         className="form-control"
                    />
               </div>

               <button
                    className="btn btn-primary mt-3"
                    onClick={handlerAddMember}>
                    Add Member
               </button>
          </Layout>
     );
};

export default MemberTeam;
