import { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Team from "../pages/MemberTeam";
import Administrative from "../pages/Administrative";
import Competitions from "../pages/Competitions";
import Admin from "../pages/Admin";
import Footer from "../layout/Footer";
import Finalis from "../pages/Finalis";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
    const [currentPage, setCurrentPage] = useState('Dashboard');
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const currentTime = new Date().toLocaleTimeString();
        if (!user) {
            navigate("/login");
        }
        if (user.token === "admin@admin.com") {
            setCurrentPage("Admin");
        }
    }, [user, navigate]);

    const renderPage = () => {
        switch (currentPage) {
            case 'Dashboard':
                return <Dashboard />;
            case 'Team':
                return <Team />;
            case 'DataAdministrative':
                return <Administrative />;
            case 'DataCompetitions':
                return <Competitions />;
            case 'Admin':
                return <Admin />;
            case 'Finalis':
                return <Finalis />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <Fragment>
            <div className="max-w-screen overflow-x-hidden">
                <div className="bg-[#121113] flex pb-10 ml-[5rem] sm:ml-[4rem]">
                    <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    <div className="w-[95%] pl- mx-auto min-h-screen pt-5">
                        {/* <Header title={currentPage} /> */}
                        {renderPage()}
                    </div>
                </div>
                    <div className="pb-12 bg-[#121113]">
                        <Footer />
                    </div>
            </div>
        </Fragment>
    );
};

export default Layout;
