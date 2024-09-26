import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaMap, FaUsers, FaSignOutAlt, FaChevronDown, FaChevronUp, FaChartBar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../slice/userSlice";
import Logo from "../assets/landing/evolution-logo.webp";
import logoTutup from "../assets/landing/evolution-logo.webp";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import CustomConfirm from "../components/CustomConfirm";

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

    const handleConfirm = () => {
        dispatch(logout());
        setLogoutAlert(true);
        setShowConfirm(false);
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    const handleClickMenu = (menu) => {
        setCurrentPage(menu);
        setBuka(false);
        if (menu === "Sign Out") {
            setShowConfirm(true);
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
