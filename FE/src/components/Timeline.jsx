import { Fragment } from "react";
import { isMobile } from "react-device-detect";

const Timeline = ({type}) => {
    return (
        <Fragment >
            {isMobile ?
                <div className={`text-white ${type === 1 ? 'pt-0' : 'pt-48' }`}>
                    <h2 className={`px-0 md:px-28 text-7xl font-semibold  ${type === 1 || type === 2 ? 'hidden ' : 'block pb-24'}`}>Our Timeline</h2>
                    <div className="text-white flex items-center justify-around">
                        <div className="items-end pb-5 mr-2">
                            <div className="text-center py-0 w-full h-[200px] mx-auto "></div>
                            <div className="text-center py-0 w-full h-[200px] mx-auto ">
                                <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Normal</h3>
                                <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Registration</h3>
                                <p className={`${type === 1 ? 'text-base' : 'text-xl'} pt-2`}>28 September </p>
                                <p className={`${type === 1 ? 'text-base' :'text-xl'}`}>-</p>
                                <p className={`${type === 1 ? 'text-base' :'text-xl'}`}>2 November 2024</p>
                            </div>
                            <div className="text-center py-0 w-full h-[200px] mx-auto "></div>
                            <div className="text-center py-0 w-full h-[200px] mx-auto ">
                                <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Submission</h3>
                                <p className={`${type === 1 ? 'text-base' : 'text-xl'} pt-2`}>17 October</p>
                                <p className={`${type === 1 ? 'text-base' :'text-xl'}`}>-</p>
                                <p className={`${type === 1 ? 'text-base' :'text-xl'}`}>9 November 2024</p>
                            </div>
                            <div className="text-center py-0 w-full h-[200px] mx-auto "></div>
                            <div className="text-center py-0 w-full h-[200px] mx-auto ">
                                <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Final</h3>
                                <h3>Presentation</h3>
                                <p className={`${type === 1 ? 'text-base' : 'text-xl'} pt-2`}>16 November 2024</p>
                            </div>
                            <div className="text-center py-0 w-full h-[200px] mx-auto "></div>
                        </div>
                        <div className="border-r-4 border-white  h-[1400px]">
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[75px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[175px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[210px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[170px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[200px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[160px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                            <div className="w-[14%]"><div className="rounded-full -mr-3 my-[210px]  w-[20px] h-[20px] bg-white mx-auto -mb-3"></div></div>
                        </div>
                        <div className=" pt-5 ml-2">
                            <div className="text-center py-0 w-full h-[200px] mx-auto ">
                                <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Early</h3>
                                <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Registration</h3>
                                <p className={`${type === 1 ? 'text-base' : 'text-xl'} pt-2`}>21 - 27 </p>
                                <p className={`${type === 1 ? 'text-base' :'text-xl'}`}>September 2024</p>
                            </div>
                            <div className="text-center py-0 w-full h-[200px] mx-auto "></div>
                            <div className="text-center py-0 w-full h-[200px] mx-auto ">
                                <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Late</h3>
                                <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Registration</h3>
                                <p className={`${type === 1 ? 'text-base' : 'text-xl'} pt-2`}>3 November</p>
                                <p className={`${type === 1 ? 'text-base' :'text-xl'}`}>-</p>
                                <p className={`${type === 1 ? 'text-base' :'text-xl'}`}>9 November 2024</p>
                            </div>
                            <div className="text-center py-0 w-full h-[200px] mx-auto "></div>
                            <div className="text-center py-0 w-full h-[200px] mx-auto ">
                                <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Finalist</h3>
                                <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Announcement</h3>
                                <p className={`${type === 1 ? 'text-base' : 'text-xl'} pt-2`}>13 November 2024</p>
                            </div>
                            <div className="text-center py-0 w-full h-[200px] mx-auto "></div>
                            <div className="text-center py-0 w-full h-[200px] mx-auto ">
                                <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Winner</h3>
                                <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Announcement</h3>
                                <p className={`${type === 1 ? 'text-base' : 'text-xl'} pt-2`}>18 November 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className={`text-white ${type === 1 ? 'pt-0' : 'pt-48' }`}>
                    <h2 className={`px-8 md:px-28 text-7xl font-semibold ${type === 1 || type === 2 ? 'hidden ' : 'block pb-24'}`}>Our Timeline</h2>
                    <div className="flex pt-5">
                        <div className="w-[14%] text-center ">
                            <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Early</h3>
                            <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Registration</h3>
                            <p className={`${type === 1 ? 'text-base' :'text-xl'}`}>21 - 27 September 2024</p>
                        </div>
                        <div className="w-[14%] text-center "></div>
                        <div className="w-[14%] text-center ">
                            <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Late</h3>
                            <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Registration</h3>
                            <p className={`${type === 1 ? 'text-base' : 'text-xl'} pt-2`}>3 november - 9 November 2024</p>
                        </div>
                        <div className="w-[14%] text-center "></div>
                        <div className="w-[14%] text-center ">
                            <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Finalis</h3>
                            <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Announcement</h3>
                            <p className={`${type === 1 ? 'text-base' : 'text-xl'} pt-2`}>13 November 2024</p>
                        </div>
                        <div className="w-[14%] text-center "></div>
                        <div className="w-[14%] text-center ">
                            <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Winner</h3>
                            <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Announcement</h3>
                            <p className={`${type === 1 ? 'text-base' : 'text-xl'} pt-2`}>18 November 2024</p>
                        </div>
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
                    <div className="flex items-end pb-5">
                        <div className="w-[14%] text-center "></div>
                        <div className="w-[14%] text-center ">
                            <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Normal</h3>
                            <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Registration</h3>
                            <p className={`${type === 1 ? 'text-base' : 'text-xl'} pt-2`}>28 September - 2 November 2024</p>

                        </div>
                        <div className="w-[14%] text-center "></div>
                        <div className="w-[14%] text-center ">
                            <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Submission</h3>
                            <p className={`${type === 1 ? 'text-base' : 'text-xl'} pt-2`}>17 October - 9 November 2024</p>

                        </div>
                        <div className="w-[14%] text-center "></div>
                        <div className="w-[14%] text-center ">
                            <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Final</h3>
                            <h3 className={`${type === 1 ? 'text-lg' : 'text-2xl' } font-bold`}>Presentation</h3>
                            <p className={`${type === 1 ? 'text-base' : 'text-xl'} pt-2`}>16 November 2024</p>

                        </div>
                        <div className="w-[14%] text-center "></div>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default Timeline;