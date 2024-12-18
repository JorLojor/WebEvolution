import { Fragment } from "react";
import Navbar from "./layout/Navbar";
import Timeline from "./components/Timeline";
import Welcome from "./components/Welcome";
import BusinessPlan from "./assets/landing/business-plan.webp";
import ArrowImage from "./assets/landing/arrow.webp";
import Poster from "./assets/landing/poster.webp";
import Ux from "./assets/landing/ux.webp";
import Web from "./assets/landing/web.webp";
import { useNavigate } from 'react-router-dom';
import Footer from "./layout/Footer";

function App() {
  const navigate = useNavigate();

  return (
    <Fragment>
      <div className=" bg-black pb-12">
        <div className="mx-8 min-h-screen">
          {/* Navbar */}
          <Navbar />
          {/* Welcome */}
          <Welcome />
          {/* Introduction */}
          <div id="about" className="px-0 md:px-28 text-white mt-64">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl md:text-7xl font-semibold pb-4">Shaping the Future</h2>
                <h2 className="text-4xl md:text-7xl font-semibold">Through Technology</h2>
              </div>
              <img src={ArrowImage} className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] mt-6" alt="Logo" />
            </div>
            <p className="w-full md:w-1/2 pt-12">EVOLUTION merupakan acara puncak dalam rangkaian acara INTERIUM yang diselenggakan oleh Himpunan Mahasiswa Teknologi Informasi Telkom University. </p>
            <p className="w-full md:w-1/2 pt-8">Dengan tema "Shaping the Future Through Technology", Evolution mengajak para peserta untuk mengembangkan dan menyajikan ide-ide inovatif yang berorientasi pada masa depan.</p>
          </div>
          {/* Timeline */}
          <Timeline />
          <h1></h1>
          {/* Lomba */}
          <h1 id="competitions" className="text-center text-white pt-48 pb-12 text-4xl font-bold">Jenis Lomba</h1>
          <div className="flex-wrap flex items-center justify-center md:justify-between text-black">
            <a href="/business/#title">
              <div className="w-[250px] mx-0 sm:mx-4 my-4 bg-[#E7E7E7] p-6 cursor-pointer" >
                <img className="w-[100%] mx-auto" src={BusinessPlan} alt="Logo Lomba" />
                <p className="pt-4 text-2xl font-semibold">Business Plan</p>
                <p className="">Mahasiswa</p>
                <p className="opacity-0">SMA/Sederajat</p>
              </div>
            </a>
            <a href="/uiux/#title">
              <div className="w-[250px] mx-0 sm:mx-4 my-4 bg-[#E7E7E7] p-6 cursor-pointer">
                <img className="w-[100%] mx-auto" src={Ux} alt="Logo Lomba" />
                <p className="pt-4 text-2xl font-semibold">UI/UX</p>
                <p className="">Mahasiswa</p>
                <p className="">SMA/Sederajat</p>
              </div>
            </a>
            <a href="/web/#title">
              <div className="w-[250px] mx-0 sm:mx-4 my-4 bg-[#E7E7E7] p-6 cursor-pointer">
                <img className="w-[100%] mx-auto" src={Web} alt="Logo Lomba" />
                <p className="pt-4 text-2xl font-semibold">Web Design</p>
                <p className="">Mahasiswa</p>
                <p className="opacity-0">SMA/Sederajat</p>
              </div>
            </a>
            <a href="/poster/#title">
              <div className="w-[250px] mx-0 sm:mx-4 my-4 bg-[#E7E7E7] p-6 cursor-pointer">
                <img className="w-[100%] mx-auto" src={Poster} alt="Logo Lomba" />
                <p className="pt-4 text-2xl font-semibold">Poster Infografis</p>
                <p className="">SMA/Sederajat</p>
                <p className="opacity-0">Mahasiswa</p>
              </div>
            </a>
          </div>
          {/* Footer */}
          <div className="pt-24">
            <Footer />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App
