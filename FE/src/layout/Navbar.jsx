import { Fragment } from "react";
import Logo from "../assets/landing/evolution-logo.webp";

const Navbar = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-between text-white py-5">
        {/* Logo */}
        
        {/* Menu Items */}
        <div className="flex">
        <img src={Logo} className="w-[30px] h-[30px]" alt="Logo" />
          <p className="pl-6">About</p>
          <p className="pl-6">Competitions</p>
          <p className="pl-6">Talkshow</p>
          <p className="pl-6">Terms</p>
          <p className="pl-6">FAQ</p>
        </div>

        {/* Login/Register Section */}
        <div className="flex">
          <p className="pl-8">Login</p>
          <p className="pl-8">Register</p>
        </div>
      </div>
    </Fragment>
  );
};

export default Navbar;
