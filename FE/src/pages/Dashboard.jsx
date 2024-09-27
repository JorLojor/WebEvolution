import { Fragment, useState } from "react";
import { isMobile } from "react-device-detect";
import BusinessPlan from "../assets/landing/business-plan.webp";
import Poster from "../assets/landing/poster.webp";
import Ux from "../assets/landing/ux.webp";
import Web from "../assets/landing/web.webp";

const Dashboard = () => {
    const [data, setData] = useState('web');


    return (
        <Fragment>
            <h1 className="text-white text-2xl font-bold">
                Welcome, Dashboard
            </h1>
            {!isMobile ? (
                <div>
                    <div className="flex flex-wrap gap-4 justify-between mt-12 text-white">
                        <div className="bg-[#222725] rounded-lg p-6 flex-1 min-w-[200px] max-w-[300px]">
                            <h2 className="text-center font-semibold text-xl">Stone Roses</h2>
                            <h2 className="text-center text-lg">Telkom University</h2>
                        </div>
                        <div className="bg-[#222725] rounded-lg p-6 flex-1 min-w-[300px] max-w-[600px]">
                            <h2 className="text-center font-semibold text-xl">Competition Status</h2>
                        </div>
                        <div className="bg-[#222725] rounded-lg p-6 flex-1 min-w-[200px] max-w-[300px]">
                            <h2 className="text-center font-semibold text-xl">Countdown Ended!</h2>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-between mt-4 text-white">
                        <div className="bg-[#222725] rounded-lg p-6 flex-1 min-w-[200px] max-w-[300px]">
                            <img src={data === 'web' ? Web : data === 'poster' ? Poster : data === 'ui' ? Ux : data === 'business' ? BusinessPlan : BusinessPlan} alt="" />
                            <h2 className="text-center font-semibold text-xl">{data === 'web' ? 'Web Competition' : data === 'poster' ? 'Poster Competition' : data === 'ui' ? 'UI/UX Competition' : data === 'business' ? 'Business Plan Competition' : 'Business Plan Competition'}</h2>
                            <h2 className="text-center text-lg">Telkom University</h2>
                        </div>
                        <div className="bg-[#222725] rounded-lg p-6 flex-1 min-w-[500px] max-w-full">
                            <h2 className="text-center font-semibold text-xl">Timeline</h2>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex flex-col gap-4 mt-12 text-white">
                        <div className="bg-[#222725] rounded-lg p-6">
                            <h2 className="text-center font-semibold text-xl">Stone Roses</h2>
                            <h2 className="text-center text-lg">Telkom University</h2>
                        </div>
                        <div className="bg-[#222725] rounded-lg p-6">
                            <h2 className="text-center font-semibold text-xl">Competition Status</h2>
                        </div>
                        <div className="bg-[#222725] rounded-lg p-6">
                            <h2 className="text-center font-semibold text-xl">Countdown Ended!</h2>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-4 text-white">
                        <div className="bg-[#222725] rounded-lg p-6">
                            <img src={data === 'web' ? Web : data === 'poster' ? Poster : data === 'ui' ? Ux : data === 'business' ? BusinessPlan : BusinessPlan} alt="" />
                            <h2 className="text-center font-semibold text-xl">{data === 'web' ? 'Web Competition' : data === 'poster' ? 'Poster Competition' : data === 'ui' ? 'UI/UX Competition' : data === 'business' ? 'Business Plan Competition' : 'Business Plan Competition'}</h2>
                            <h2 className="text-center text-lg">Telkom University</h2>
                        </div>
                        <div className="bg-[#222725] rounded-lg p-6">
                            <h2 className="text-center font-semibold text-xl">Timeline</h2>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Dashboard;
