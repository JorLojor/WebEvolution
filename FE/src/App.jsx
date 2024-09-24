import { useState, useEffect, Fragment } from "react";
import Navbar from "./layout/Navbar";
import BusinessPlan from "./assets/landing/business-plan.webp"
import ArrowImage from "./assets/landing/arrow.webp"
import Logo from "./assets/landing/evolution-logo.webp"
import Lines from "./assets/landing/lines.webp"
import Poster from "./assets/landing/poster.webp"
import Ux from "./assets/landing/ux.webp"
import Web from "./assets/landing/web.webp"

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
          <div className="flex-wrap flex w-full">
            <div className="w-1/5 p-2 h-[200px] flex justify-center">
              <button className="relative -top-4 bg-orange-300 px-10 py-2 flex h-fit">Get Started</button>
            </div>
            <div className="w-1/5 p-2 h-[200px]"></div>
            <div className="w-1/5 p-2 h-[200px]">
              <img className="w-[200px] h-[200px]" src={BusinessPlan} alt="" />
            </div>
            <div className="w-1/5 p-2 h-[200px]"></div>
            <div className="w-1/5 p-2 h-[200px]">
              <img className="w-[200px] h-[200px]" src={Web} alt="" />
            </div>
          </div>
          <div className="flex-wrap flex w-full mt-1">
            <div className="w-1/5 p-1 mt-0 md:mt-4 h-[200px] bg-500">
              <img className="w-[200px] h-[200px]" src={Poster} alt="" />
            </div>
            <div className="w-1/5 p-1 mt-0 md:mt-4 h-[200px]">
              <img className="w-[200px] h-[200px]" src={Ux} alt="" />
            </div>
            <div className="w-1/5 p-1 mt-0 md:mt-4 h-[200px]"></div>
            <div className="w-1/5 p-1 mt-0 md:mt-4 h-[200px]">
              <img className="w-[200px] h-[200px]" src={ArrowImage} alt="" />
            </div>
            <div className="w-1/5 p-1 mt-0 md:mt-4 h-[200px]">
              <img className="w-[200px] h-[200px]" src={Lines} alt="" />
            </div>
          </div>
          {/* Introduction */}
          <div className="px-28 text-white mt-64">
            <div className="flex justify-between">
              <div>
                <h2 className="text-7xl font-semibold pb-4">Shaping the Future</h2>
                <h2 className="text-7xl font-semibold">Through Technology</h2>
              </div>
              <img src={ArrowImage} className="w-[150px] h-[150px] mt-6" alt="" />
            </div>
            <p className="w-1/2 pt-12">EVOLUTION merupakan acara puncak dalam rangkaian acara INTERIUM yang diselenggakan oleh Himpunan Mahasiswa Teknologi Informasi Telkom University. </p>
            <p className="w-1/2 pt-8">Dengan tema "Shaping the Future Through Technology", Evolution mengajak para peserta untuk mengembangkan dan menyajikan ide-ide inovatif yang berorientasi pada masa depan.</p>
          </div>
          {/* Timeline */}
          <div className="text-white pt-48">
            <h2 className="px-28 text-7xl font-semibold">Our Timeline</h2>
          </div>
          <h1></h1>
          {/* Lomba */}
          {/* Footer */}
        </div>
      </div>
    </Fragment>
  );
}

export default App
