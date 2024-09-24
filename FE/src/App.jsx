import { useState, useEffect, Fragment } from "react";
import Navbar from "./layout/Navbar";
import Timeline from "./components/Timeline";
import BusinessPlan from "./assets/landing/business-plan.webp";
import ArrowImage from "./assets/landing/arrow.webp";
import Logo from "./assets/landing/evolution-logo.webp";
import Lines from "./assets/landing/lines.webp";
import Poster from "./assets/landing/poster.webp";
import Ux from "./assets/landing/ux.webp";
import Web from "./assets/landing/web.webp";


function App() {
  const [isSignin, setIsSignin] = useState(true);
  const handleIsSignin = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setIsSignin(true);
    } else {
      setIsSignin(false);
    }
  };

  useEffect(() => {
    handleIsSignin();
  }, []);

  return (
    <Fragment>
      <div className=" bg-black pb-48">
        <div className="mx-8 min-h-screen">
          {/* Navbar */}
          <Navbar />
          {/* Welcome */}
          <div className="flex-wrap flex justify-between items-center mb-8">
            <div className="text-white">
              <h1 className="text-lg">Empowering Visionary:</h1>
              <h1 className="text-3xl font-semibold">Leading Using Technology for</h1>
              <h1 className="text-3xl font-semibold">Innovative Outcomes and Novelty</h1>
            </div>
            <div className="text-white mt-4 md:mt-0 text-left md:text-right">
              <h1 className="text-3xl font-semibold">Evolution 2024</h1>
              <h1 className="text-base ">by Telkom University</h1>
            </div>
          </div>
          <div className="flex-wrap flex w-full ">
            <div className="w-1/5 p-2 h-[200px] flex justify-center">
              <button className="relative -top-4 bg-orange-300 px-10 py-2 flex h-fit">Get Started</button>
            </div>
            <div className="w-1/5 p-2 h-[200px]"></div>
            <div className="w-1/5 p-2 h-[200px]">
              <img className="w-[200px] h-[200px]" src={BusinessPlan} alt="Logo" />
            </div>
            <div className="w-1/5 p-2 h-[200px]"></div>
            <div className="w-1/5 p-2 h-[200px]">
              <img className="w-[200px] h-[200px]" src={Web} alt="Logo" />
            </div>
          </div>
          <div className="flex-wrap flex w-full mt-1">
            <div className="w-1/5 p-1 mt-0 md:mt-4 h-[200px] bg-500">
              <img className="w-[200px] h-[200px]" src={Poster} alt="Logo" />
            </div>
            <div className="w-1/5 p-1 mt-0 md:mt-4 h-[200px]">
              <img className="w-[200px] h-[200px]" src={Ux} alt="Logo" />
            </div>
            <div className="w-1/5 p-1 mt-0 md:mt-4 h-[200px]"></div>
            <div className="w-1/5 p-1 mt-0 md:mt-4 h-[200px]">
              <img className="w-[200px] h-[200px]" src={ArrowImage} alt="Logo" />
            </div>
            <div className="w-1/5 p-1 mt-0 md:mt-4 h-[200px]">
              <img className="w-[200px] h-[200px]" src={Lines} alt="Logo" />
            </div>
          </div>
          {/* Introduction */}
          <div className="px-8 md:px-28 text-white mt-64">
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
          <h1 className="text-center text-white pt-48 pb-12 text-4xl font-bold">Jenis Lomba</h1>
          <div className="flex-wrap flex items-center justify-center md:justify-between text-black">
            <div className="w-[250px] mx-0 sm:mx-4 my-4 bg-[#E7E7E7] p-6">
              <img className="w-[100%] mx-auto" src={BusinessPlan} alt="Logo Lomba" />
              <p className="pt-4 text-2xl font-semibold">Business Plan</p>
              <p className="">Mahasiswa</p>
              <p className="opacity-0">SMA/Sederajat</p>
            </div>
            <div className="w-[250px] mx-0 sm:mx-4 my-4 bg-[#E7E7E7] p-6">
              <img className="w-[100%] mx-auto" src={Ux} alt="Logo Lomba" />
              <p className="pt-4 text-2xl font-semibold">UI/UX</p>
              <p className="">Mahasiswa</p>
              <p className="">SMA/Sederajat</p>
            </div>
            <div className="w-[250px] mx-0 sm:mx-4 my-4 bg-[#E7E7E7] p-6">
              <img className="w-[100%] mx-auto" src={Web} alt="Logo Lomba" />
              <p className="pt-4 text-2xl font-semibold">Web Design</p>
              <p className="">Mahasiswa</p>
              <p className="opacity-0">SMA/Sederajat</p>
            </div>
            <div className="w-[250px] mx-0 sm:mx-4 my-4 bg-[#E7E7E7] p-6">
              <img className="w-[100%] mx-auto" src={Poster} alt="Logo Lomba" />
              <p className="pt-4 text-2xl font-semibold">Poster Infografis</p>
              <p className="">SMA/Sederajat</p>
              <p className="opacity-0">Mahasiswa</p>
            </div>
          </div>
          {/* Footer */}
        </div>
      </div>
    </Fragment>
  );
}

export default App
