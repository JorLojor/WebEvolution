import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BusinessPlan from "../assets/landing/business-plan.webp";
import Poster from "../assets/landing/poster.webp";
import Ux from "../assets/landing/ux.webp";
import Web from "../assets/landing/web.webp";
import Ketentuan1 from "../assets/ketentuan1.webp";
import Ketentuan2 from "../assets/ketentuan2.webp";
import Ketentuan3 from "../assets/ketentuan3.webp";
import Timeline from "../components/Timeline";
import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import { useNavigate } from 'react-router-dom';

const DetailCompetitions = () => {
    const { pathname } = useLocation();

    const competitionType = pathname.split("/").pop();
    const navigate = useNavigate();

    const competitionDetails = {
        '/web/': {
            title: "Web Design",
            description:
                'Lomba Web Design dengan tema utama “Shaping the Future through Technology” hadir sebagai platform untuk menyoroti peran penting teknologi dalam membentuk masa depan Web Design. Tema ini mengajak peserta untuk memanfaatkan teknologi terbaru dalam menciptakan pengalaman pengguna yang inovatif dan inklusif. Namun, selain inovatif, desain yang diusulkan juga harus selaras dengan prinsip-prinsip keberlanjutan dan inklusivitas, sejalan dengan tujuan Sustainable Development Goals (SDGs).',
            image: Web,
            ketentuan1: 'Peserta lomba 2-3 orang',
            ketentuan2: 'Mahasiswa Seluruh Indonesia',
            ketentuan3: 'Satu universitas, Jurusan boleh berbeda',
            guidebook: '../assets/Web.pdf'
        },
        '/poster/': {
            title: "Poster Infografis",
            description:
                'Lomba Poster Infografis dengan tema utama “Shaping the Future through Technology” hadir sebagai platform untuk menyoroti peran penting teknologi dalam menyampaikan informasi visual yang efektif dan bermakna. Tema ini mengajak peserta untuk memanfaatkan teknologi terbaru dalam menciptakan desain poster yang komunikatif dan inklusif.',
            image: Poster,
            ketentuan1: 'Peserta lomba 2-3 orang',
            ketentuan2: 'Mahasiswa Seluruh Indonesia',
            ketentuan3: 'Satu universitas, Jurusan boleh berbeda',
            guidebook: '../assets/Poster.pdf'
        },
        '/uiux/': {
            title: "UI/UX Design",
            description:
                'Kompetisi UI/UX dengan tema "Shaping the Future through Technology" hadir sebagai wadah bagi siswa SMA/Sederajat dan mahasiswa untuk berkontribusi dalam menciptakan masa depan yang lebih baik. Peserta dituntut untuk merancang solusi digital yang inovatif dan tepat guna.',
            image: Ux,
            ketentuan1: 'Peserta lomba 2-3 orang',
            ketentuan2: 'Mahasiswa dan SMA/Sederajat diseluruh Indonesia',
            ketentuan3: 'Satu universitas/Sekolah, jurusan boleh berbeda',
            guidebook: '../assets/Uiux.pdf'
        },
        '/business/': {
            title: "Business Plan",
            description:
                'Business Plan Competition dengan tema utama “Shaping the Future through Technology” hadir sebagai wadah untuk menyoroti pentingnya teknologi dalam membangun masa depan yang berkelanjutan. Solusi yang diusulkan harus sejalan dengan tujuan Sustainable Development Goals (SDGs).',
            image: BusinessPlan,
            ketentuan1: 'Peserta lomba 2-3 orang',
            ketentuan2: 'Mahasiswa Seluruh Indonesia',
            ketentuan3: 'Satu universitas, Jurusan boleh berbeda',
            guidebook: '../assets/Business.pdf'
        }
    };

    const competition = competitionDetails[pathname] || competitionDetails["business"];

    return (
        <Fragment>
            <div id="title" className="flex-col md:flex-row bg-[#140A09] text-white  px-8 md:px-24 space-y-8 md:space-y-0">
                <Navbar type={1} />
            </div>
            <div className="flex flex-col md:flex-row bg-[#140A09] text-white py-12 md:py-24 px-8 md:px-24 space-y-8 md:space-y-0">
                <div className="w-full text-center md:text-left md:w-1/2 space-y-8 md:pr-8">
                    <h1 className="text-4xl md:text-6xl font-bold">{competition.title}</h1>
                    <div className="flex flex-col sm:flex-row mt-4 md:mt-12 gap-4 sm:gap-0 sm:space-x-8 w-fit mx-auto md:mx-0">
                        <button className="bg-[#EFEFEF] text-black py-2 px-8 w-full sm:w-auto" onClick={() => { navigate('/register') }}>Register Now</button>
                        <a href={competition.guidebook} download={`guidebook ${competition.title}.pdf`}>
                            <button className="bg-[#EFEFEF] text-black py-2 px-8 w-full sm:w-auto">
                                Guidebook
                            </button>
                        </a>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex justify-center">
                    <img className="w-[256px] mx-auto" src={competition.image} alt={`${competition.title} logo`} />
                </div>
            </div>

            <div className="flex items-center flex-col md:flex-row bg-[#140A09] text-white py-12 md:py-24 px-8 md:px-24 space-y-8 md:space-y-0">
                <h1 className="w-full md:w-1/4 text-center text-3xl font-bold">About</h1>
                <p className="w-full md:w-3/4 text-justify text-lg">{competition.description}</p>
            </div>

            <div className=" items-center flex-col md:flex-row bg-[#140A09] text-white py-12 md:py-24 px-8 md:px-24 ">
                <h1 className="w-full text-center text-3xl font-bold">Timeline</h1>
                <div className="w-full -mt-32">
                    <Timeline type={2} />
                </div>
            </div>

            <div className="items-center flex-col md:flex-row bg-[#140A09] text-white py-12 md:py-24 px-8 md:px-24 ">
                <h1 className="w-full text-center text-3xl font-bold">Ketentuan Peserta</h1>
                <div className="flex flex-wrap pt-24">
                    <div className="w-[300px] mx-auto bg-[#EFEFEF]">
                        <img className="w-[200px] mx-auto py-8" src={Ketentuan1} alt="Logo" />
                        <p className="pb-10 text-center px-12 font-semibold text-lg text-black">{competition.ketentuan1}</p>
                    </div>
                    <div className="w-[300px] mx-auto bg-[#EFEFEF]">
                        <img className="w-[200px] mx-auto py-8" src={Ketentuan2} alt="Logo" />
                        <p className="pb-10 text-center px-12 font-semibold text-lg text-black">{competition.ketentuan2}</p>
                    </div>
                    <div className="w-[300px] mx-auto bg-[#EFEFEF]">
                        <img className="w-[200px] mx-auto py-8" src={Ketentuan3} alt="Logo" />
                        <p className="pb-10 text-center px-12 font-semibold text-lg text-black">{competition.ketentuan3}</p>
                    </div>
                </div>
            </div>

            <div className="items-center flex-col md:flex-row bg-[#140A09] text-white py-12 md:py-24 px-8 md:px-24 ">
                <h1 className="w-full text-center text-3xl font-bold">Lihat Juga Lomba Lain</h1>
                <div className="flex flex-wrap">
                    {competition.title !== "Web Design" &&
                        <a href="/web/#title" className="w-[300px] mx-auto bg-[#EFEFEF] mt-24 cursor-pointer" >
                            <div >
                                <img className="w-[200px] mx-auto pt-8 pb-2" src={Web} alt="Logo" />
                                <p className="text-center px-12 font-semibold text-lg text-black">Web Design</p>
                                <p className="text-black px-12 ">Mahasiswa</p>
                                <p className="text-black px-12 opacity-0">SMA/Sederajat</p>
                            </div>
                        </a>
                    }
                    {competition.title !== "UI/UX Design" &&
                        <a href="/uiux/#title" className="w-[300px] mx-auto bg-[#EFEFEF] mt-24 cursor-pointer pb-4">
                            <div>
                                <img className="w-[200px] mx-auto pt-8 pb-2" src={Ux} alt="Logo" />
                                <p className="px-12 font-semibold text-lg text-black">UI/UX</p>
                                <p className="text-black px-12">Mahasiswa</p>
                                <p className="text-black px-12">SMA/Sederajat</p>
                            </div>
                        </a>
                    }
                    {competition.title !== "Poster Infografis" &&
                        <a href="/poster/#title" className="w-[300px] mx-auto bg-[#EFEFEF] mt-24 cursor-pointer pb-4">
                            <div  >
                                <img className="w-[200px] mx-auto pt-8 pb-2" src={Poster} alt="Logo" />
                                <p className="px-12 font-semibold text-lg text-black">POSTER INFOGRAFIS</p>
                                <p className="text-black px-12 ">SMA/Sederajat</p>
                                <p className="text-black px-12 opacity-0">Mahasiswa</p>
                            </div>
                        </a>
                    }
                    {competition.title !== "Business Plan" &&
                        <a href="/business/#title" className="w-[300px] mx-auto bg-[#EFEFEF] mt-24 cursor-pointer pb-4">
                            <div  >
                                <img className="w-[200px] mx-auto pt-8 pb-2" src={BusinessPlan} alt="Logo" />
                                <p className="px-12 font-semibold text-lg text-black">BUSINESS PLAN</p>
                                <p className="text-black px-12 ">Mahasiswa</p>
                                <p className="text-black px-12 opacity-0">SMA/Sederajat</p>
                            </div>
                        </a>
                    }
                </div>
                <div className="pt-24">
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default DetailCompetitions;
