import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { login, logout } from "../slice/userSlice";
import Sidebar from "./Sidebar"

function Layout({ children, nosidebar = false }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState();
    const { loggedIn, user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    return (
        <Fragment>
            <div className="w-full max-w-max lg:max-w-screen-lg mx-auto flex pb-10">
                <Sidebar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    nomenu={nosidebar}
                />
                {/* <div className="w-full">
                    <Navbar setIsSidebarOpen={setIsSidebarOpen} /> */}
                    {children}
                {/* </div> */}
            </div>
        </Fragment>
    )
};

export default Layout;