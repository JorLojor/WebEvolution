import { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import Layout from "../layout/Layout";

const MemberTeam = () => {
     const ambilUser = useSelector((state) => state.user);
     const tokenne = ambilUser.user?.token;

     const [formData, setFormData] = useState({
          Nama_Anggota1: "",
          NIM_Anggota1: "",
          Nama_Anggota2: "",
          NIM_Anggota2: "",
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
          <Fragment>
               <h1 className="text-white bg-[#222725] p-4 rounded-lg">Identitas Tim</h1>
               <div className="bg-[#222725] mt-8 p-4 rounded-md">
                    <div className="form-group flex items-center ">
                         <p className="text-white w-1/5 text-sm">Nama Tim</p>
                         <input
                              type="text"
                              name="Nama_Anggota1"
                              value={"ini team saya"}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                              disabled
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">Email</p>
                         <input
                              type="text"
                              name="admin@admin.com"
                              value={"ini team saya"}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                              disabled
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">Instansi</p>
                         <input
                              type="text"
                              name="Telkom"
                              value={"ini team saya"}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                              disabled
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">Provinsi</p>
                         <input
                              type="text"
                              name="Nama_Anggota1"
                              value={"provinsi"}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                              disabled
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">Kabupaten</p>
                         <input
                              type="text"
                              name="Nama_Anggota1"
                              value={"bandung"}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                              disabled
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">Nama Ketua</p>
                         <input
                              type="text"
                              name="Nama_Anggota1"
                              value={"ketua"}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                              disabled
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">Nim Ketua</p>
                         <input
                              type="text"
                              name="Nama_Anggota1"
                              value={"362879"}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                              disabled
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">Nama Anggota 1</p>
                         <input
                              type="text"
                              name="Nama_Anggota1"
                              value={formData.Nama_Anggota1}
                              onChange={handleChange}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">NIM Anggota 1</p>
                         <input
                              type="text"
                              name="NIM_Anggota1"
                              value={formData.NIM_Anggota1}
                              onChange={handleChange}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">Nama Anggota 2</p>
                         <input
                              type="text"
                              name="Nama_Anggota2"
                              value={formData.Nama_Anggota2}
                              onChange={handleChange}
                              className="form-control text-sm bg-[#E4E6C3] p-2 w-full rounded-sm"
                         />
                    </div>
                    <div className="form-group flex items-center mt-3">
                         <p className="text-white w-1/5 text-sm">NIM Anggota 2</p>
                         <input
                              type="text"
                              name="NIM_Anggota2"
                              value={formData.NIM_Anggota2}
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