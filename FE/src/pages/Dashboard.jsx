import { Fragment, useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import BusinessPlan from "../assets/landing/business-plan.webp";
import Poster from "../assets/landing/poster.webp";
import Ux from "../assets/landing/ux.webp";
import Web from "../assets/landing/web.webp";
import { useSelector } from "react-redux";
import Timeline from "../components/Timeline";

const Dashboard = () => {
    const [data, setData] = useState('web design');
    const ambilUser = useSelector((state) => state.user);
    const [registerData, setRegisterData] = useState(null);
    const [loading, setLoading] = useState(false);
    const tokenne = ambilUser.user?.token;

    const getRegister = async () => {
        if (!tokenne) {
            console.error("Token tidak tersedia, silakan login kembali.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_DB_API_URL}api/register/single`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${tokenne}`,
                    },
                }
            );

            const result = await response.json();

            if (response.ok) {
                setRegisterData(result);
            } else {
                console.error("Error fetching register data:", result.message);
                alert("Gagal menampilkan data registrasi: " + result.message);
            }
        } catch (error) {
            console.error("Error during register request:", error);
            alert("Terjadi kesalahan saat menampilkan data registrasi.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRegister();
    }, []);

    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date();
         
        targetDate.setDate(registerData?.Status_Registrasi === 0 || registerData?.Status_Registrasi === 1 || registerData?.Status_Registrasi === 2 ? 25 : registerData?.Status_Registrasi === 3 ? 29 : 29); 
        targetDate.setHours(0, 0, 0, 0);  

        const updateCountdown = () => {
            const now = new Date();
            const difference = targetDate - now;
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (difference > 0) {
                setTimeRemaining({ days, hours, minutes, seconds });
            } else {
                setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };
        const intervalId = setInterval(updateCountdown, 1000);
        return () => clearInterval(intervalId);
    }, []);


    return (
        <Fragment>
            {loading ? (
                <p className="text-white">Loading...</p>
            ) : (
                <>
                    {!isMobile ? (
                        <div>
                            <div className="flex flex-wrap gap-4 justify-between mt-12 text-white">
                                <div className="bg-[#222725] rounded-lg p-6 flex-1 min-w-[200px] max-w-[300px]">
                                    <h2 className="text-center font-semibold text-xl">{registerData?.Nama_Team ? registerData?.Nama_Team : "data tidak terbaca"}</h2>
                                    <h2 className="text-center text-lg">{registerData?.Nama_Instansi ? registerData?.Nama_Instansi : "data tidak terbaca"}</h2>
                                </div>
                                <div className="bg-[#222725] rounded-lg p-6 flex-1 min-w-[300px] max-w-[600px]">
                                    <h2 className="text-center font-semibold text-xl">Competition Status</h2>
                                    <h2 className="text-center font-semibold text-xl">{registerData?.Status_Registrasi === 0 ? "Unggah Data Team" : registerData?.Status_Registrasi === 1 ? "Unggah Data Administrative" : registerData?.Status_Registrasi === 2 ? "Unggah Data Lomba" : registerData?.Status_Registrasi === 3 ? "Menunggu Pengumaman Finalis" : registerData?.Status_Registrasi === 4 ? "Finalis" : "Data Tidak Terbaca"}</h2>
                                </div>
                                <div className="bg-[#222725] rounded-lg p-6 flex-1 min-w-[200px] max-w-[300px]">
                                    <h2 className="text-center font-semibold text-xl">Countdown </h2>
                                    {timeRemaining.days > 0 || timeRemaining.hours > 0 || timeRemaining.minutes > 0 || timeRemaining.seconds > 0 ? (
                                        <h2 className="text-center">
                                            Countdown: {timeRemaining.days}d {timeRemaining.hours}h {timeRemaining.minutes}m {timeRemaining.seconds}s
                                        </h2>
                                    ) : (
                                        "Countdown Ended!"
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4 justify-between mt-4 text-white">
                                <div className="bg-[#222725] rounded-lg p-6 flex-1 min-w-[200px] max-w-[300px]">
                                    <img className="mx-auto" src={registerData?.Pilihan_Lomba === 'web design' ? Web : registerData?.Pilihan_Lomba === 'poster infografis' ? Poster : registerData?.Pilihan_Lomba === 'uiux' ? Ux : registerData?.Pilihan_Lomba === 'bisnis plan' ? BusinessPlan : BusinessPlan} alt="" />
                                    <h2 className="text-center font-semibold text-xl">
                                        {registerData?.Pilihan_Lomba === 'web design' ? 'Web Competition' : registerData?.Pilihan_Lomba === 'poster infografis' ? 'Poster Competition' : registerData?.Pilihan_Lomba === 'uiux' ? 'UI/UX Competition' : registerData?.Pilihan_Lomba === 'bisnis plan' ? 'Business Plan Competition' : 'Business Plan Competition'}
                                    </h2>
                                    <h2 className="text-center text-lg">Telkom University</h2>
                                </div>
                                <div className="bg-[#222725] rounded-lg p-6 flex-1 min-w-[500px] max-w-full">
                                    <h2 className="text-center font-semibold text-xl">Timeline</h2>
                                    <Timeline type={1} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="flex flex-col gap-4 mt-12 text-white">
                                <div className="bg-[#222725] rounded-lg p-6">
                                    <h2 className="text-center font-semibold text-xl">{registerData?.Nama_Team ? registerData?.Nama_Team : "data tidak terbaca"}</h2>
                                    <h2 className="text-center text-lg">{registerData?.Nama_Instansi ? registerData?.Nama_Instansi : "data tidak terbaca"}</h2>
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
                                    <img className="mx-auto" src={registerData?.Pilihan_Lomba === 'web design' ? Web : registerData?.Pilihan_Lomba === 'poster infografis' ? Poster : registerData?.Pilihan_Lomba === 'uiux' ? Ux : registerData?.Pilihan_Lomba === 'bisnis plan' ? BusinessPlan : BusinessPlan} alt="" />
                                    <h2 className="text-center font-semibold text-xl">
                                        {registerData?.Pilihan_Lomba === 'web design' ? 'Web Competition' : registerData?.Pilihan_Lomba === 'poster infografis' ? 'Poster Competition' : registerData?.Pilihan_Lomba === 'uiux' ? 'UI/UX Competition' : registerData?.Pilihan_Lomba === 'bisnis plan' ? 'Business Plan Competition' : 'Business Plan Competition'}
                                    </h2>
                                    <h2 className="text-center text-lg">{registerData?.Nama_Instansi ? registerData?.Nama_Instansi : "data tidak terbaca"}</h2>
                                </div>
                                <div className="bg-[#222725] rounded-lg p-6">
                                    <h2 className="text-center font-semibold text-xl">Timeline</h2>
                                    <Timeline />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </Fragment>
    );
};

export default Dashboard;
