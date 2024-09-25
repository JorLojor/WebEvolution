import { Fragment, useState } from "react";
import { isMobile } from "react-device-detect";
import Logo from "../assets/landing/evolution-logo.webp";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

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
                            <div className="flex flex-col">
                                <p className="py-2 text-center md:text-left hover:cursor-pointer" onClick={e => (navigate('/login'))}>Login</p>
                                <p className="py-2 text-center md:text-left hover:cursor-pointer" onClick={e => (navigate('/register'))}>Register</p>
                            </div>
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
                        <div className="flex items-center">
                            <p className="pl-8 hover:cursor-pointer" onClick={e => (navigate('/login'))}>Login</p>
                            <p className="pl-8 hover:cursor-pointer" onClick={e => (navigate('/register'))}>Register</p>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Navbar;
