import { Fragment, useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import Logo from "../assets/landing/evolution-logo.webp";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from '../slice/userSlice';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [isLogin, setIsLogin] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        if (user) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }, [user]);
    console.log(isLogin);

    return (
        <Fragment>
            {isMobile ? (
                <div>
                    <div className="flex items-center justify-between text-white py-5">
                        <img src={Logo} className="w-[30px] h-[30px]" alt="Logo" />
                        <div className="cursor-pointer" onClick={toggleMenu}>
                            {isOpen ? (
                                <span className="text-3xl">✕</span>
                            ) : (
                                <span className="text-3xl">☰</span>
                            )}
                        </div>
                    </div>
                    {isOpen && (
                        <div className="flex flex-col items-center bg-gray-900 text-white py-4">
                            <p className="py-2">About</p>
                            <p className="py-2">Competitions</p>
                            <p className="py-2">Talkshow</p>
                            <p className="py-2">Terms</p>
                            <p className="py-2">FAQ</p>
                            {isLogin ?
                                <div className="flex flex-col">
                                    <p className="py-2 text-center md:text-left hover:cursor-pointer mx-auto" onClick={e => (navigate('/dashboard'))}>Dashboard</p>
                                    <p className="py-2 text-center md:text-left hover:cursor-pointer mx-auto" onClick={handleLogout}>Logout</p>
                                </div>
                                :
                                <div className="flex flex-col">
                                    <p className="py-2 text-center md:text-left hover:cursor-pointer mx-auto" onClick={e => (navigate('/login'))}>Login</p>
                                    <p className="py-2 text-center md:text-left hover:cursor-pointer mx-auto" onClick={e => (navigate('/register'))}>Register</p>
                                </div>
                            }
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex items-center">
                    <img src={Logo} className="w-[30px] h-[30px]" alt="Logo" />
                    <div className="flex items-center justify-between w-full text-white py-5">
                        <div className="flex items-center">
                            <p className="pl-6">About</p>
                            <p className="pl-6">Competitions</p>
                            <p className="pl-6">Talkshow</p>
                            <p className="pl-6">Terms</p>
                            <p className="pl-6">FAQ</p>
                        </div>
                        {isLogin ?
                            <div className="flex items-center">
                                <p className="py-2 text-center md:text-left hover:cursor-pointer" onClick={handleLogout}>Logout</p>
                                <p className="pl-8 hover:cursor-pointer" onClick={e => (navigate('/dahboard'))}>Dashboard</p>
                            </div>
                            :
                            <div className="flex items-center">
                                <p className="pl-8 hover:cursor-pointer" onClick={e => (navigate('/login'))}>Login</p>
                                <p className="pl-8 hover:cursor-pointer" onClick={e => (navigate('/register'))}>Register</p>
                            </div>
                        }
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Navbar;
