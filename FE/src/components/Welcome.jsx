import { Fragment } from "react";
import BusinessPlan from "../assets/landing/business-plan.webp";
import ArrowImage from "../assets/landing/arrow.webp";
import Logo from "../assets/landing/evolution-logo.webp";
import Lines from "../assets/landing/lines.webp";
import Poster from "../assets/landing/poster.webp";
import Ux from "../assets/landing/ux.webp";
import Web from "../assets/landing/web.webp";
import { isMobile } from 'react-device-detect';

const Welcome = () => {
    return (
        <Fragment>
            {isMobile ?
                <>
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
                    <div className="flex  justify-center ">
                        <div className="flex-wrap w-full justify-center">
                            <div className="w-[150px] p-2 h-[150px] my-2 flex justify-center">
                                <button className="relative -top-4 bg-orange-300 px-10 py-2 flex h-fit">Get Started</button>
                            </div>
                            <div className="w-[150px] p-2 h-[150px] my-2">
                                <img className="w-[150px] h-[150px]" src={BusinessPlan} alt="Logo" />
                            </div>
                            <div className="w-[150px] p-2 h-[150px] my-2">
                                <img className="w-[150px] h-[150px]" src={Web} alt="Logo" />
                            </div>
                        </div>
                        <div className="flex-wrap w-full mt-1 justify-center">
                            <div className="w-[150px] p-1 my-2 h-[150px] bg-500">
                                <img className="w-[150px] h-[150px]" src={Poster} alt="Logo" />
                            </div>
                            <div className="w-[150px] p-1 my-2 h-[150px]">
                                <img className="w-[150px] h-[150px]" src={Ux} alt="Logo" />
                            </div>
                            <div className="w-[150px] p-1 my-2 h-[150px]">
                                <img className="w-[150px] h-[150px]" src={ArrowImage} alt="Logo" />
                            </div>
                            <div className="w-[150px] p-1 my-2 h-[150px]">
                                <img className="w-[150px] h-[150px]" src={Lines} alt="Logo" />
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
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
                </>
            }
        </Fragment>
    )
}

export default Welcome; 