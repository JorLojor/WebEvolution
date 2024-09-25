import { Fragment, useState } from "react";
import Logo from "../assets/landing/evolution-logo.webp";
import { useDispatch } from "react-redux";
import { login } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { isMobile } from "react-device-detect";

const Login = () => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [showPassword, setShowPassword] = useState(false);
     const [error, setError] = useState("");
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const validateEmail = (email) => {
          const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return re.test(String(email).toLowerCase());
     };

     const handleLogin = async () => {
          if (email === "" || password === "") {
               setError("Email dan Password harus diisi.");
               return;
          }

          if (!validateEmail(email)) {
               setError("Format Email Tidak Valid!");
               return;
          }

          try {
               const response = await fetch(
                    "http://localhost:3987/api/register/login",
                    {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                         },
                         body: JSON.stringify({ email, password }),
                    }
               );

               const data = await response.json();

               if (response.status === 200) {
                    dispatch(login({ token: data.data }));
                    alert("Login berhasil!");

                    navigate("/dashboard");
               } else {
                    setError(data.message || "Email atau Password salah.");
               }
          } catch (error) {
               console.error(error);
               setError("Terjadi kesalahan saat login.");
          }
     };

     const closeModal = () => {
          setError("");
     };

     return (
          <Fragment>
               <div className="flex items-center">
                    <div
                         className={`${
                              isMobile ? "hidden" : "w-1/2"
                         } h-screen bg-black flex justify-center items-center`}>
                         <img src={Logo} alt="Logo" className="w-1/2" />
                    </div>
                    <div
                         className={`${
                              isMobile
                                   ? "w-screen px-4 flex flex-col justify-center items-center min-h-screen"
                                   : "w-1/2"
                         }`}>
                         <h1 className="text-center text-3xl font-semibold">
                              Selamat Datang
                         </h1>
                         <h1 className="text-center text-lg">
                              Silahkan masukan detail akun anda untuk mengakses
                              dashboard
                         </h1>
                         <div className="flex justify-center items-center mt-6 w-full">
                              <div
                                   className={`flex items-center h-[80px] ${
                                        isMobile ? "w-[90%]" : "w-[80%]"
                                   } border-2 border-gray-300 rounded-[10px] relative`}>
                                   <FaUser className="ml-4" />
                                   <input
                                        className={`h-full w-full pl-4 border-none outline-none text-[20px] font-normal ${
                                             email
                                                  ? "text-black"
                                                  : "text-[#616161]"
                                        }`}
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                             setEmail(e.target.value)
                                        }
                                        required
                                   />
                              </div>
                         </div>
                         <div className="flex justify-center items-center mt-6 w-full">
                              <div
                                   className={`flex items-center h-[80px] ${
                                        isMobile ? "w-[90%]" : "w-[80%]"
                                   } border-2 border-gray-300 rounded-[10px] relative`}>
                                   <FaLock className="ml-4" />
                                   <input
                                        className={`h-full w-full pl-4 pr-12 border-none outline-none text-[20px] font-normal ${
                                             password
                                                  ? "text-black"
                                                  : "text-[#616161]"
                                        }`}
                                        type={
                                             showPassword ? "text" : "password"
                                        }
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) =>
                                             setPassword(e.target.value)
                                        }
                                        required
                                   />
                                   <button
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
                                        onClick={() =>
                                             setShowPassword(!showPassword)
                                        }>
                                        {showPassword ? (
                                             <FaEyeSlash size={20} />
                                        ) : (
                                             <FaEye size={20} />
                                        )}
                                   </button>
                              </div>
                         </div>
                         <div className="w-full">
                              <button
                                   className={`${
                                        password && email
                                             ? "bg-[black]"
                                             : "bg-[#616161]"
                                   } text-white h-[87px] w-[80%] ml-[10%] rounded-[10px] mt-7 text-[20px] font-medium`}
                                   onClick={handleLogin}>
                                   Masuk
                              </button>
                         </div>
                         <p className="text-center mt-4">
                              Belum Mempunyai Akun?{" "}
                              <span
                                   className="text-blue-500"
                                   onClick={() => navigate("/register")}>
                                   Daftar
                              </span>
                         </p>
                    </div>
               </div>
               {error && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                         <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                              <h2 className="text-2xl font-semibold text-red-600 mb-4">
                                   Login Error
                              </h2>
                              <p className="text-gray-700 mb-6">{error}</p>
                              <button
                                   onClick={closeModal}
                                   className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                                   Tutup
                              </button>
                         </div>
                    </div>
               )}
          </Fragment>
     );
};

export default Login;
