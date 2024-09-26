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
