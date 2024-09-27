
// Layout Component
import { Fragment, useState } from "react";
import Dashboard from "../pages/Dashboard";
import Team from "../pages/MemberTeam";
import Administrative from "../pages/Administrative";
import Competitions from "../pages/Competitions";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
    const [currentPage, setCurrentPage] = useState('Dashboard');
    console.log(currentPage);
    
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
            default:
                return <Dashboard />;
        }
    };

    return (
        <Fragment>
            <div className="max-w-screen overflow-x-hidden">
                <div className="bg-[#121113] flex pb-10 ml-[4rem]">
                    <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    {/* <Header title={currentPage}></Header> */}
                    <div className="w-[95%] mx-auto min-h-screen pt-5">
                        {renderPage()}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Layout;