import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Rt from "../pages/rt/Rt";
import Rw from "../pages/Rw";
import Dusun from "../pages/Dusun";
import Desa from "../pages/Desa";
import Kecamatan from "../pages/Kecamatan";
import Map from "../pages/Kecamatan";
// import Map from "../components/leaflet/Draw";
import DataWilayah from "../pages/DataWilayah";
import DataPenduduk from "../pages/DataPenduduk"

const Dashboard = () => {
    const [buka, setBuka] = useState(false);
    const [currentPage, setCurrentPage] = useState("Map");

    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/signin");
        }
    }, [user, navigate]);

    const toggleSidebar = () => {
        setBuka(!buka);
    };

    const renderPage = () => {
        switch (currentPage) {
            case "Rt":
                return <Rt />;
            case "Rw":
                return <Rw />;
            case "Dusun":
                return <Dusun />;
            case "Desa":
                return <Desa />;
            case "Kecamatan":
                return <Kecamatan />;
            case "Data Wilayah":
                return <DataWilayah />;
            case "Data Penduduk":
                return <DataPenduduk />;
            case "Map":
            default:
                return <Map />;
        }
    };

    return (
        <>
            <Header
                buka={buka}
                toggleSidebar={toggleSidebar}
                title={currentPage}
            />
            <div
                className="fixed h-full z-10"
                style={{ position: "absolute", top: "0", left: "0" }}>
                <Sidebar
                    buka={buka}
                    toggleSidebar={toggleSidebar}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
            <div className="main-content max-w-full ml-[6.25rem] mt-20 px-0 xl:px-8 z-50 ">
                {renderPage()}
            </div>
        </>
    );
}

export default Dashboard;
