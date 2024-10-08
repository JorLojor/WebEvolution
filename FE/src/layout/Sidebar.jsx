import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaMap, FaUsers, FaSignOutAlt, FaChevronDown, FaChevronUp, FaChartBar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { logout } from "../slice/userSlice";
import Logo from "../assets/landing/evolution-logo.webp";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import CustomConfirm from "../components/CustomConfirm";
import { useSelector } from "react-redux";

const Sidebar = ({ currentPage, setCurrentPage }) => {
    const [showConfirm, setShowConfirm] = useState(false);
    const [logoutAlert, setLogoutAlert] = useState(false);
    const [dataDropdownOpen, setDataDropdownOpen] = useState(false);
    const [buka, setBuka] = useState(false);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [registerData, setRegisterData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const ambilUser = useSelector((state) => state.user);
    const tokenne = ambilUser.user?.token;

    const getRegister = async () => {
        if (!tokenne) {
            console.error("Token tidak tersedia, silakan login kembali.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(
                "http://localhost:3987/api/register/single",
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
                setRegisterData(result);
            } else {
                console.error("Error fetching register data:", result.message);
                alert("Gagal menampilkan data registrasi: " + result.message);
            }
        } catch (error) {
            console.error("Error during register request:", error);
            alert("Terjadi kesalahan saat menampilkan data registrasi.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getRegister();
    }, []);

    const handleCloseAlert = () => {
        setLogoutAlert(false);
    };

    const handleConfirm = () => {
        dispatch(logout());
        setLogoutAlert(true);
        setShowConfirm(false);
        navigate('/');
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
    console.log(registerData);
    

    return (
        <motion.div
            animate={{ width: buka ? '15rem' : `5rem` }}
            transition={{ duration: 0.5 }}
            className="sidebar bg-[#222725] h-full min-h-screen flex flex-col fixed top-0 left-0 overflow-y-scroll overflow-x-hidden scrollbar-thin"
            onClick={!buka ? () => setBuka(!buka) : undefined}
        >
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

            {/* Conditional rendering for admin user */}
            {user?.token !== "admin@admin.com" ? (
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
            ) : (
                <div className={`button-sidebar flex items-center p-4 w-4/5 mx-auto text-base hover:bg-[#121113] active:bg-[#121113] cursor-pointer ${currentPage === "Dashboard" ? "bg-[#121113] text-white" : "text-[#BFBFBF]"}`}
                    onClick={() => handleClickMenu('Admin')}>
                    <FaMap className={`${buka ? "mr-4" : "mx-auto text-base md:text-lg"}`} />
                    {buka && (
                        <motion.p initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                            Data
                        </motion.p>
                    )}
                </div>
            )}

            {user?.token !== "admin@admin.com" && (
                <div className="mt-5">
                    <p className={`text-white px-4 mb-2 ${buka ? 'text-base' : 'text-xs'}`}>Settings</p>

                    {/* Data Menu */}
                    <div
                        className={`button-sidebar flex items-center p-4 w-4/5 mx-auto text-base hover:bg-[#121113] active:bg-[#121113] cursor-pointer ${typeof currentPage === 'string' && currentPage.startsWith("Data") ? "bg-[#121113] text-white" : "text-[#BFBFBF]"}`}
                        onClick={toggleDataDropdown}>
                        <FaChartBar className={`${buka ? "mr-4" : "mx-auto text-base"}`} />
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
                        {dataDropdownOpen && (
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
                                {registerData?.status_Registrasi === 3 &&
                                    <div
                                        className={`sub-menu my-1 pl-8 p-2 flex items-center justify-start hover:bg-[#121113] active:bg-[#121113] cursor-pointer ${currentPage === "DataCompetitions" ? "bg-[#121113] text-white" : "text-[#BFBFBF]"}`}
                                        onClick={() => handleClickMenu('Finalis')}>
                                        <FaUsers className="mr-2" />
                                        <p>Finalis</p>
                                    </div>
                                }
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

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