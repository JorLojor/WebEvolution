import propTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaMap, FaDatabase, FaUsers, FaSignOutAlt, FaChevronDown, FaChevronUp, FaChartBar, FaSitemap } from "react-icons/fa";
import CustomAlert from "../components/CustomAlert"; 
import CustomConfirm from "../components/CustomConfirm"; 
import { useDispatch } from "react-redux";
import { logout } from "../slice/userSlice";
import Logo from "../assets/landing/evolution-logo.webp";
import logoTutup from "../assets/landing/evolution-logo.webp";
import { isMobile } from 'react-device-detect';
import { useNavigate } from "react-router-dom";

const Sidebar = ({}) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [logoutAlert, setLogoutAlert] = useState(false);
    const [dataDropdownOpen, setDataDropdownOpen] = useState(false);
    const [databaseDropdownOpen, setDatabaseDropdownOpen] = useState(false);
    const [buka, setBuka] = useState(false);
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [currentPage, setCurrentPage] = useState(false);
    const navigate = useNavigate();
    
    const dispatch = useDispatch();

    const handleCloseAlert = () => {
        setLogoutAlert(false);
    };

    const handleConfirm = () => {
        dispatch(logout());
        setLogoutAlert(true);
        setShowConfirm(false);
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
            setToggleSidebar(!buka);  
        }
    };

    const toggleDataDropdown = () => {
        setDataDropdownOpen(!dataDropdownOpen);
    };

    const toggleDatabaseDropdown = () => {
        setDatabaseDropdownOpen(!databaseDropdownOpen);
    };
    

    return (
        <motion.div
            animate={{ width: buka ? isMobile ? '15rem' : '21.5rem' : isMobile ? `4rem` : '7rem' }}
            transition={{ duration: 0.5 }}
            className="sidebar bg-gray-800 h-full min-h-screen flex flex-col fixed top-0 left-0 overflow-y-scroll overflow-x-hidden scrollbar-thin"
            onClick={!buka ? toggleSidebar : null}>
            <div
                className="button-sidebar flex items-center p-4 hover:bg-gray-700 active:bg-gray-600 cursor-pointer border-b border-b-zinc-600"
                onClick={() => handleClickMenu("Map")}>
                {buka ? (
                    <img
                        src={Logo}
                        className="w-max h-[75px]"
                        alt="logo"
                    />
                ) : (
                    <img
                        src={logoTutup}
                        className="w-max h-[75px]"
                        alt="logo"
                    />
                )}
            </div>

            {/* Menu "Dashboard" */}
            <div
                className={`button-sidebar flex items-center p-4 mt-8 ${buka ? "ml-6" : "mx-auto"} text-base md:text-2xl hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${currentPage === "Map" ? "bg-gray-700 text-white" : "text-[#BFBFBF]"}`}
                onClick={e => (navigate('/dashboard'))}>
                <FaMap className={`${buka ? "mr-4" : "mx-auto text-base md:text-2xl"}`} />
                {buka && (
                    <motion.p
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}>
                        Dashboard
                    </motion.p>
                )}
            </div>

            {/* Menu "Team" */}
            <div
                className={`button-sidebar flex items-center p-4 mt-8 ${buka ? "ml-6" : "mx-auto"} text-base md:text-2xl hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${currentPage === "Map" ? "bg-gray-700 text-white" : "text-[#BFBFBF]"}`}
                onClick={e => (navigate('/member'))}>
                <FaMap className={`${buka ? "mr-4" : "mx-auto text-base md:text-2xl"}`} />
                {buka && (
                    <motion.p
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}>
                        Team
                    </motion.p>
                )}
            </div>

            {/* Menu "Data" */}
            <div
                // className={`button-sidebar flex items-center p-4 mt-4 ${buka ? "ml-6" : "mx-auto"} text-base md:text-2xl hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${currentPage.startsWith("Data") ? "bg-gray-700 text-white" : "text-[#BFBFBF]"}`}
                className={`button-sidebar flex items-center p-4 mt-4 ${buka ? "ml-6" : "mx-auto"} text-base md:text-2xl hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${currentPage==("Data") ? "bg-gray-700 text-white" : "text-[#BFBFBF]"}`}
                onClick={toggleDataDropdown}>
                <FaChartBar className={`${buka ? "mr-4" : "mx-auto"} text-base md:text-2xl`} />
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

            {/* Dropdown "Data" */}
            <AnimatePresence>
                {buka && dataDropdownOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "100px" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="z-0 overflow-x-hidden overflow-y-auto mx-8 scrollbar-thin">
                        <div
                            className={`sub-menu my-1 pl-8 p-2 flex items-center justify-start hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${currentPage === "Data Wilayah" ? "bg-gray-700 text-white" : "text-[#BFBFBF]"}`}
                            onClick={() => handleClickMenu("Data Wilayah")}>
                            <FaMap className="mr-2" />
                            <p>Data Wilayah</p>
                        </div>
                        <div
                            className={`sub-menu my-1 pl-8 p-2 flex items-center justify-start hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${currentPage === "Data Penduduk" ? "bg-gray-700 text-white" : "text-[#BFBFBF]"}`}
                            onClick={() => handleClickMenu("Data Penduduk")}>
                            <FaUsers className="mr-2" />
                            <p>Data Penduduk</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Menu "Sign Out" */}
            <div
                className={`button-sidebar flex items-center p-4 mt-4 ${buka ? "ml-6" : "mx-auto"} text-base md:text-2xl hover:bg-gray-700 active:bg-gray-600 cursor-pointer ${currentPage === "Sign Out" ? "bg-gray-700 text-white" : "text-[#BFBFBF]"}`}
                onClick={buka ? () => handleClickMenu("Sign Out") : toggleSidebar}>
                <FaSignOutAlt className={`${buka ? "mr-4" : "mx-auto text-base md:text-2xl"}`} />
                {buka && (
                    <motion.p
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="h-9 overflow-hidden">
                        Sign Out
                    </motion.p>
                )}
            </div>

            {showConfirm && <CustomConfirm message="Apakah Anda yakin ingin keluar?" onConfirm={handleConfirm} onCancel={handleCancel} />}
            {logoutAlert && <CustomAlert message="Anda telah keluar" onClose={handleCloseAlert} />}
        </motion.div>
    );
};

export default Sidebar;
