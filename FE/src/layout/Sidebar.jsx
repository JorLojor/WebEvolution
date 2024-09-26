// /* eslint-disable no-unused-vars */
// import propTypes from "prop-types";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState } from "react";
// import {
//      FaMap,
//      FaDatabase,
//      FaUsers,
//      FaSignOutAlt,
//      FaChevronDown,
//      FaChevronUp,
//      FaChartBar,
//      FaSitemap,
// } from "react-icons/fa";
// import CustomAlert from "../components/CustomAlert";
// import CustomConfirm from "../components/CustomConfirm";
// import { useDispatch } from "react-redux";
// import { logout } from "../slice/userSlice";
// import Logo from "../assets/landing/evolution-logo.webp";
// import logoTutup from "../assets/landing/evolution-logo.webp";
// import { isMobile } from "react-device-detect";
// import { useNavigate } from "react-router-dom";

// const Sidebar = ({}) => {
//      const [showConfirm, setShowConfirm] = useState(false);
//      const [logoutAlert, setLogoutAlert] = useState(false);
//      const [dataDropdownOpen, setDataDropdownOpen] = useState(false);
//      const [databaseDropdownOpen, setDatabaseDropdownOpen] = useState(false);
//      const [buka, setBuka] = useState(false);
//      const [toggleSidebar, setToggleSidebar] = useState(false);
//      const [currentPage, setCurrentPage] = useState(false);
//      const navigate = useNavigate();

//      const dispatch = useDispatch();

//      const handleCloseAlert = () => {
//           setLogoutAlert(false);
//      };

//      const handleConfirm = async () => {
//           const token = localStorage.getItem("token");
//           console.log(token);
//           try {
//                const response = await fetch(
//                     "http://localhost:3987/api/register/logout",
//                     {
//                          method: "POST",
//                          headers: {
//                               "Content-Type": "application/json",
//                               Authorization: `Bearer ${localStorage.getItem(
//                                    "token"
//                               )}`, // Token pengguna yang disimpan di localStorage
//                          },
//                     }
//                );

//                const result = await response.json();
//                if (response.ok) {
//                     dispatch(logout()); // Hapus status login dari redux
//                     setLogoutAlert(true); // Tampilkan alert bahwa logout berhasil
//                } else {
//                     console.error(result.message);
//                     // Tambahkan penanganan error sesuai kebutuhan
//                }
//           } catch (error) {
//                console.error("Error saat logout:", error);
//                // Penanganan error tambahan bisa ditambahkan di sini
//           }
//           setShowConfirm(false); // Tutup konfirmasi logout
//      };

//      const handleCancel = () => {
//           setShowConfirm(false);
//      };

//      const handleClickMenu = (menu) => {
//           if (menu === "Sign Out") {
//                setShowConfirm(true);
//           } else {
//                setCurrentPage(menu);
//                setBuka(!buka);
//                setToggleSidebar(!buka);
//           }
//      };

//      const toggleDataDropdown = () => {
//           setDataDropdownOpen(!dataDropdownOpen);
//      };

//      const toggleDatabaseDropdown = () => {
//           setDatabaseDropdownOpen(!databaseDropdownOpen);
//      };

//      return (
//           <motion.div
//                animate={{
//                     width: buka
//                          ? isMobile
//                               ? "15rem"
//                               : "21.5rem"
//                          : isMobile
//                          ? `4rem`
//                          : "7rem",
//                }}
//                transition={{ duration: 0.5 }}
//                className="sidebar bg-gray-800 h-full min-h-screen flex flex-col fixed top-0 left-0 overflow-y-scroll overflow-x-hidden scrollbar-thin"
//                onClick={!buka ? toggleSidebar : null}>
//                <div
//                     className="button-sidebar flex items-center p-4 hover:bg-gray-700 active:bg-gray-600 cursor-pointer border-b border-b-zinc-600"
//                     onClick={() => handleClickMenu("Map")}>
//                     {buka ? (
//                          <img
//                               src={Logo}
//                               className="w-max h-[75px]"
//                               alt="logo"
//                          />
//                     ) : (
//                          <img
//                               src={logoTutup}
//                               className="w-max h-[75px]"
//                               alt="logo"
//                          />
//                     )}
//                </div>

//                {/* Menu "Dashboard" */}
//                <div
//                     className={`button-sidebar flex items-center p-4 mt-8 ${
//                          buka ? "ml-6" : "mx-auto"
//                     } text-base md:text-2xl hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${
//                          currentPage === "Map"
//                               ? "bg-gray-700 text-white"
//                               : "text-[#BFBFBF]"
//                     }`}
//                     onClick={(e) => navigate("/dashboard")}>
//                     <FaMap
//                          className={`${
//                               buka ? "mr-4" : "mx-auto text-base md:text-2xl"
//                          }`}
//                     />
//                     {buka && (
//                          <motion.p
//                               initial={{ x: -20, opacity: 0 }}
//                               animate={{ x: 0, opacity: 1 }}
//                               transition={{ duration: 0.5 }}>
//                               Dashboard
//                          </motion.p>
//                     )}
//                </div>

//                {/* Menu "Team" */}
//                <div
//                     className={`button-sidebar flex items-center p-4 mt-8 ${
//                          buka ? "ml-6" : "mx-auto"
//                     } text-base md:text-2xl hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${
//                          currentPage === "Map"
//                               ? "bg-gray-700 text-white"
//                               : "text-[#BFBFBF]"
//                     }`}
//                     onClick={(e) => navigate("/member")}>
//                     <FaMap
//                          className={`${
//                               buka ? "mr-4" : "mx-auto text-base md:text-2xl"
//                          }`}
//                     />
//                     {buka && (
//                          <motion.p
//                               initial={{ x: -20, opacity: 0 }}
//                               animate={{ x: 0, opacity: 1 }}
//                               transition={{ duration: 0.5 }}>
//                               Team
//                          </motion.p>
//                     )}
//                </div>

//                {/* Menu "Data" */}
//                <div
//                     // className={`button-sidebar flex items-center p-4 mt-4 ${buka ? "ml-6" : "mx-auto"} text-base md:text-2xl hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${currentPage.startsWith("Data") ? "bg-gray-700 text-white" : "text-[#BFBFBF]"}`}
//                     className={`button-sidebar flex items-center p-4 mt-4 ${
//                          buka ? "ml-6" : "mx-auto"
//                     } text-base md:text-2xl hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${
//                          currentPage == "Data"
//                               ? "bg-gray-700 text-white"
//                               : "text-[#BFBFBF]"
//                     }`}
//                     onClick={toggleDataDropdown}>
//                     <FaChartBar
//                          className={`${
//                               buka ? "mr-4" : "mx-auto"
//                          } text-base md:text-2xl`}
//                     />
//                     {buka && (
//                          <motion.div
//                               initial={{ x: -20, opacity: 0 }}
//                               animate={{ x: 0, opacity: 1 }}
//                               transition={{ duration: 0.5 }}
//                               className="flex items-center w-full justify-between">
//                               <p>Data</p>
//                               {dataDropdownOpen ? (
//                                    <FaChevronUp />
//                               ) : (
//                                    <FaChevronDown />
//                               )}
//                          </motion.div>
//                     )}
//                </div>

//                {/* Dropdown "Data" */}
//                <AnimatePresence>
//                     {buka && dataDropdownOpen && (
//                          <motion.div
//                               initial={{ height: 0 }}
//                               animate={{ height: "100px" }}
//                               exit={{ height: 0 }}
//                               transition={{ duration: 0.5 }}
//                               className="z-0 overflow-x-hidden overflow-y-auto mx-8 scrollbar-thin">
//                               <div
//                                    className={`sub-menu my-1 pl-8 p-2 flex items-center justify-start hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${
//                                         currentPage === "Data Wilayah"
//                                              ? "bg-gray-700 text-white"
//                                              : "text-[#BFBFBF]"
//                                    }`}
//                                    onClick={() =>
//                                         handleClickMenu("Data Wilayah")
//                                    }>
//                                    <FaMap className="mr-2" />
//                                    <p>Data Wilayah</p>
//                               </div>
//                               <div
//                                    className={`sub-menu my-1 pl-8 p-2 flex items-center justify-start hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${
//                                         currentPage === "Data Penduduk"
//                                              ? "bg-gray-700 text-white"
//                                              : "text-[#BFBFBF]"
//                                    }`}
//                                    onClick={() =>
//                                         handleClickMenu("Data Penduduk")
//                                    }>
//                                    <FaUsers className="mr-2" />
//                                    <p>Data Penduduk</p>
//                               </div>
//                          </motion.div>
//                     )}
//                </AnimatePresence>

//                {/* Menu "Sign Out" */}
//                <div
//                     className={`button-sidebar flex items-center p-4 mt-4 ${
//                          buka ? "ml-6" : "mx-auto"
//                     } text-base md:text-2xl hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${
//                          currentPage === "Sign Out"
//                               ? "bg-gray-700 text-white"
//                               : "text-[#BFBFBF]"
//                     }`}
//                     onClick={
//                          buka
//                               ? () => handleClickMenu("Sign Out")
//                               : toggleSidebar
//                     }>
//                     <FaSignOutAlt
//                          className={`${
//                               buka ? "mr-4" : "mx-auto text-base md:text-2xl"
//                          }`}
//                     />
//                     {buka && (
//                          <motion.p
//                               initial={{ x: -20, opacity: 0 }}
//                               animate={{ x: 0, opacity: 1 }}
//                               transition={{ duration: 0.5 }}
//                               className="h-9 overflow-hidden">
//                               Sign Out
//                          </motion.p>
//                     )}
//                </div>

//                {showConfirm && (
//                     <CustomConfirm
//                          message="Apakah Anda yakin ingin keluar?"
//                          onConfirm={handleConfirm}
//                          onCancel={handleCancel}
//                     />
//                )}
//                {logoutAlert && (
//                     <CustomAlert
//                          message="Anda telah keluar"
//                          onClose={handleCloseAlert}
//                     />
//                )}
//           </motion.div>
//      );
// };

// export default Sidebar;

/* eslint-disable no-unused-vars */
import propTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
     FaMap,
     FaDatabase,
     FaUsers,
     FaSignOutAlt,
     FaChevronDown,
     FaChevronUp,
     FaChartBar,
     FaSitemap,
} from "react-icons/fa";
import CustomAlert from "../components/CustomAlert";
import CustomConfirm from "../components/CustomConfirm";
import { FaMap, FaUsers, FaSignOutAlt, FaChevronDown, FaChevronUp, FaChartBar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../slice/userSlice";
import Logo from "../assets/landing/evolution-logo.webp";
import logoTutup from "../assets/landing/evolution-logo.webp";
import { isMobile } from "react-device-detect";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ currentPage, setCurrentPage }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [logoutAlert, setLogoutAlert] = useState(false);
    const [dataDropdownOpen, setDataDropdownOpen] = useState(false);
    const [buka, setBuka] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

     const handleCloseAlert = () => {
          setLogoutAlert(false);
     };

     const handleConfirm = async () => {
          console.log(tokenne);
          try {
               const response = await fetch(
                    "http://localhost:3987/api/register/logout",
                    {
                         method: "POST",
                         headers: {
                              "Content-Type": "application/json",
                              Authorization: tokenne, // Token pengguna yang disimpan di localStorage
                         },
                    }
               );

               const result = await response.json();
               if (response.ok) {
                    dispatch(logout()); // Hapus status login dari redux
                    setLogoutAlert(true); // Tampilkan alert bahwa logout berhasil
               } else {
                    console.error(result.message);
                    // Tambahkan penanganan error sesuai kebutuhan
               }
          } catch (error) {
               console.error("Error saat logout:", error);
               // Penanganan error tambahan bisa ditambahkan di sini
          }
          setShowConfirm(false); // Tutup konfirmasi logout
     };

     const handleCancel = () => {
          setShowConfirm(false);
     };

     const handleClickMenu = (menu) => {
          if (menu === "Sign Out") {
               setShowConfirm(true);
          } else {
               setCurrentPage(menu);
               setBuka(!buka);
          }
     };

    const toggleDataDropdown = () => {
        setDataDropdownOpen(!dataDropdownOpen);
    };

    return (
        <motion.div
            animate={{ width: buka ? '15rem' : `5rem` }}
            transition={{ duration: 0.5 }}
            className="sidebar bg-[#222725] h-full min-h-screen flex flex-col fixed top-0 left-0 overflow-y-scroll overflow-x-hidden scrollbar-thin"
            onClick={!buka ? () => setBuka(!buka) : undefined}>

            {/* Sidebar Header */}
            <div className="button-sidebar flex items-center p-4 cursor-pointer border-b border-b-zinc-600" onClick={() => setBuka(!buka)}>
                {buka ? (
                    <div className="flex items-center">
                        <img src={Logo} className="w-max h-[50px] mx-auto" alt="logo" />
                        <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="text-2xl text-white pl-2">
                            Evolution
                        </motion.p>
                    </div>
                ) : (
                    <img src={Logo} className="w-max max-h-[50px] mx-auto" alt="logo" />
                )}
            </div>

            {/* Main Section */}
            <div className="mt-5">
                <p className={`text-white px-4 mb-2 ${buka ? 'text-base' : 'text-xs'}`}>Main</p>
                
                {/* Dashboard Menu */}
                <div className={`button-sidebar flex items-center p-4 w-4/5 mx-auto text-base hover:bg-[#121113] active:bg-[#121113] cursor-pointer ${currentPage === "Dashboard" ? "bg-[#121113] text-white" : "text-[#BFBFBF]"}`}
                    onClick={() => handleClickMenu('Dashboard')}>
                    <FaMap className={`${buka ? "mr-4" : "mx-auto text-base md:text-lg"}`} />
                    {buka && (
                        <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                            Dashboard
                        </motion.p>
                    )}
                </div>

                {/* Team Menu */}
                <div className={`button-sidebar flex items-center p-4 mt-1 w-4/5 mx-auto text-base hover:bg-[#121113] active:bg-[#121113] cursor-pointer ${currentPage === "Team" ? "bg-[#121113] text-white" : "text-[#BFBFBF]"}`}
                    onClick={() => handleClickMenu('Team')}>
                    <FaUsers className={`${buka ? "mr-4" : "mx-auto text-base"}`} />
                    {buka && (
                        <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                            Team
                        </motion.p>
                    )}
                </div>
            </div>

            {/* Settings Section */}
            <div className="mt-5">
                <p className={`text-white px-4 mb-2 ${buka ? 'text-base' : 'text-xs'}`}>Settings</p>

                {/* Data Menu */}
                <div
                    className={`button-sidebar flex items-center p-4 w-4/5 mx-auto text-base hover:bg-[#121113] active:bg-[#121113] cursor-pointer ${typeof currentPage === 'string' && currentPage.startsWith("Data") ? "bg-[#121113] text-white" : "text-[#BFBFBF]"}`}
                    onClick={buka ? toggleDataDropdown : undefined}>
                    <FaChartBar className={`${buka ? "mr-4" : "mx-auto"} text-base`} />
                    {buka && (
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center w-full justify-between">
                            <p>Data</p>
                            {dataDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </motion.div>
                    )}
                </div>

                {/* Data Dropdown */}
                <AnimatePresence>
                    {buka && dataDropdownOpen && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "100px" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.5 }}
                            className="z-0 overflow-x-hidden overflow-y-auto mx-8 scrollbar-thin">
                            <div
                                className={`sub-menu my-1 pl-8 p-2 flex items-center justify-start hover:bg-[#121113] active:bg-[#121113] cursor-pointer ${currentPage === "DataAdministrative" ? "bg-[#121113] text-white" : "text-[#BFBFBF]"}`}
                                onClick={() => handleClickMenu('DataAdministrative')}>
                                <FaMap className="mr-2" />
                                <p>Administrative</p>
                            </div>
                            <div
                                className={`sub-menu my-1 pl-8 p-2 flex items-center justify-start hover:bg-[#121113] active:bg-[#121113] cursor-pointer ${currentPage === "DataCompetitions" ? "bg-[#121113] text-white" : "text-[#BFBFBF]"}`}
                                onClick={() => handleClickMenu('DataCompetitions')}>
                                <FaUsers className="mr-2" />
                                <p>Competitions</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Account Section */}
            <div className="mt-auto">
                <p className={`text-white px-4 mb-2 ${buka ? 'text-base' : 'text-xs'}`}>Account</p>

                {/* Sign Out Menu */}
                <div className={`button-sidebar flex items-center p-4 w-4/5 mx-auto text-base hover:bg-[#121113] active:bg-[#121113] cursor-pointer ${currentPage === "Sign Out" ? "bg-[#121113] text-white" : "text-[#d62727]"}`}
                    onClick={() => handleClickMenu("Sign Out")}>
                    <FaSignOutAlt className={`${buka ? "mr-4" : "mx-auto text-base"}`} />
                    {buka && (
                        <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                            Sign Out
                        </motion.p>
                    )}
                </div>
            </div>

            {/* Confirmation and Alerts */}
            {showConfirm && <CustomConfirm message="Apakah Anda yakin ingin keluar?" onConfirm={handleConfirm} onCancel={handleCancel} />}
            {logoutAlert && <CustomAlert message="Anda telah keluar" onClose={handleCloseAlert} />}
        </motion.div>
    );
};

export default Sidebar;
