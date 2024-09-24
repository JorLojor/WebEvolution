import { Fragment } from "react";
import { isMobile } from "react-device-detect";

const Timeline = () => {
    return (
        <Fragment >
            {isMobile ?
                <div className="text-white pt-48">
                    <h2 className="px-8 md:px-28 text-7xl font-semibold pb-24">Our Timeline</h2>
                    <div className="text-white flex items-center justify-around">
                        <div className="items-end pb-5 ">
                            <div className="text-center py-0 w-full h-[100px] mx-auto "></div>
                            <div className="text-center py-0 w-full h-[100px] mx-auto ">
                                <h3>Normal</h3>
                                <h3>Registration</h3>
                                <p>28 September </p>
                                <p>-</p>
                                <p>18 October 2024</p>
                            </div>
                            <div className="text-center py-0 w-full h-[100px] mx-auto "></div>
                            <div className="text-center py-0 w-full h-[100px] mx-auto ">
                                <h3>Submission</h3>
                                <p>19 October</p>
                                <p>-</p>
                                <p>25 October 2024</p>
                            </div>
                            <div className="text-center py-0 w-full h-[100px] mx-auto "></div>
                            <div className="text-center py-0 w-full h-[100px] mx-auto ">
                                <h3>Final</h3>
                                <h3>Presentation</h3>
                                <p>5 November 2024</p>
                            </div>
                            <div className="text-center py-0 w-full h-[100px] mx-auto "></div>
                        </div>
                        <div className="border-r-4 border-white  h-[700px]">
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[50px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[90px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[90px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[90px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[90px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[90px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[90px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                        </div>
                        <div className=" pt-5 ">
                            <div className="text-center py-0 w-full h-[100px] mx-auto ">
                                <h3>Early</h3>
                                <h3>Registration</h3>
                                <p>21 - 27 </p>
                                <p>September 2024</p>
                            </div>
                            <div className="text-center py-0 w-full h-[100px] mx-auto "></div>
                            <div className="text-center py-0 w-full h-[100px] mx-auto ">
                                <h3>Late</h3>
                                <h3>Registration</h3>
                                <p>19 October</p>
                                <p>-</p>
                                <p>25 October 2024</p>
                            </div>
                            <div className="text-center py-0 w-full h-[100px] mx-auto "></div>
                            <div className="text-center py-0 w-full h-[100px] mx-auto ">
                                <h3>Finalis</h3>
                                <h3>Announcement</h3>
                                <p>1 November 2024</p>
                            </div>
                            <div className="text-center py-0 w-full h-[100px] mx-auto "></div>
                            <div className="text-center py-0 w-full h-[100px] mx-auto ">
                                <h3>Winner</h3>
                                <h3>Announcement</h3>
                                <p>7 November 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="text-white pt-48">
                    <h2 className="px-8 md:px-28 text-7xl font-semibold pb-24">Our Timeline</h2>
                    <div className="flex items-end pb-5">
                        <div className="w-[14%] text-center "></div>
                        <div className="w-[14%] text-center ">
                            <h3>Normal</h3>
                            <h3>Registration</h3>
                            <p>28 September - 18 October 2024</p>

                        </div>
                        <div className="w-[14%] text-center "></div>
                        <div className="w-[14%] text-center ">
                            <h3>Submission</h3>
                            <p>19 October - 25 October 2024</p>

                        </div>
                        <div className="w-[14%] text-center "></div>
                        <div className="w-[14%] text-center ">
                            <h3>Final</h3>
                            <h3>Presentation</h3>
                            <p>5 November 2024</p>

                        </div>
                        <div className="w-[14%] text-center "></div>
                    </div>
                    <div className="w-full flex border-b-4 border-white">
                        <div className="w-[14%]"><div className="rounded-full w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                        <div className="w-[14%]"><div className="rounded-full w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                        <div className="w-[14%]"><div className="rounded-full w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                        <div className="w-[14%]"><div className="rounded-full w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                        <div className="w-[14%]"><div className="rounded-full w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                        <div className="w-[14%]"><div className="rounded-full w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                        <div className="w-[14%]"><div className="rounded-full w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                    </div>
                    <div className="flex pt-5">
                        <div className="w-[14%] text-center ">
                            <h3>Early</h3>
                            <h3>Registration</h3>
                            <p>21 - 27 September 2024</p>
                        </div>
                        <div className="w-[14%] text-center "></div>
                        <div className="w-[14%] text-center ">
                            <h3>Late</h3>
                            <h3>Registration</h3>
                            <p>19 October - 25 October 2024</p>
                        </div>
                        <div className="w-[14%] text-center "></div>
                        <div className="w-[14%] text-center ">
                            <h3>Finalis</h3>
                            <h3>Announcement</h3>
                            <p>1 November 2024</p>
                        </div>
                        <div className="w-[14%] text-center "></div>
                        <div className="w-[14%] text-center ">
                            <h3>Winner</h3>
                            <h3>Announcement</h3>
                            <p>7 November 2024</p>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Timeline;