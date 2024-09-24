import { Fragment, useState } from "react";
import { isMobile } from "react-device-detect";
import Logo from "../assets/landing/evolution-logo.webp";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <Fragment>
            {isMobile ? (
                // Mobile View
                <div>
                    <div className="flex items-center justify-between text-white py-5">
                        {/* Logo */}
                        <img src={Logo} className="w-[30px] h-[30px]" alt="Logo" />
                        {/* Hamburger Menu */}
                        <div className="cursor-pointer" onClick={toggleMenu}>
                            {isOpen ? (
                                <span className="text-3xl">✕</span> // "X" icon when open
                            ) : (
                                <span className="text-3xl">☰</span> // Hamburger icon when closed
                            )}
                        </div>
                    </div>
                    {/* Menu Items (visible when isOpen is true) */}
                    {isOpen && (
                        <div className="flex flex-col items-center bg-gray-900 text-white py-4">
                            <p className="py-2">About</p>
                            <p className="py-2">Competitions</p>
                            <p className="py-2">Talkshow</p>
                            <p className="py-2">Terms</p>
                            <p className="py-2">FAQ</p>
                            <div className="flex flex-col">
                                <p className="py-2 text-center md:text-left">Login</p>
                                <p className="py-2 text-center md:text-left">Register</p>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                // Desktop View
                <div className="flex items-center">
                    <img src={Logo} className="w-[30px] h-[30px]" alt="Logo" />
                    <div className="flex items-center justify-between w-full text-white py-5">
                        {/* Logo */}
                        {/* Menu Items */}
                        <div className="flex items-center">
                            <p className="pl-6">About</p>
                            <p className="pl-6">Competitions</p>
                            <p className="pl-6">Talkshow</p>
                            <p className="pl-6">Terms</p>
                            <p className="pl-6">FAQ</p>
                        </div>
                        {/* Login/Register Section */}
                        <div className="flex items-center">
                            <p className="pl-8">Login</p>
                            <p className="pl-8">Register</p>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Navbar;
