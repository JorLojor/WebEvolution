import { Fragment, useState, useEffect } from "react";
import Logo from "../assets/landing/evolution-logo.webp";
import { useDispatch } from 'react-redux';
import { login } from '../slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaAddressCard, FaMapMarked } from 'react-icons/fa';
import { FaUserGroup, FaFileContract } from "react-icons/fa6";
import { HiAcademicCap } from "react-icons/hi2";
import { MdEmail } from "react-icons/md";
import { isMobile } from 'react-device-detect';


const Register = () => {
    const [id, setId] = useState('');
    const [team, setTeam] = useState('');
    const [nama, setNama] = useState('');
    const [instansi, setInstansi] = useState('');
    const [nim, setNim] = useState('');
    const [email, setEmail] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [kabupaten, setKabupaten] = useState('');
    const [lomba, setLomba] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        if (id === '' || password === '') {
            setError('ID dan Password harus diisi.');
            return;
        }

        if (id === 'admin' && password === 'admin123') {
            dispatch(login({ id, role: 'admin' }));
            navigate('/');
        } else {
            setError('ID atau Password salah. Silakan coba lagi.');
        }
    };

    const closeModal = () => {
        setError('');
    };

    const lombaOptions = [
        { nama: "Poster" },
        { nama: "Web" },
        { nama: "Business Plan" },
        { nama: "UI/UX" }
    ];

    return (
        <Fragment>
            <div className="flex items-center">
                <div className={`${isMobile ? 'w-screen px-4 flex flex-col justify-center items-center min-h-screen py-5' : 'w-1/2 min-h-screen py-5 flex-1'}`}>
                    <h1 className="text-center text-3xl font-semibold">Selamat Datang</h1>
                    <h1 className="text-center text-lg">Silahkan masukan detail akun anda untuk mendaftar</h1>
                    <div className="flex justify-center items-center w-full">
                        <div className="flex items-center h-[60px] w-[80%] border-2 border-gray-300 rounded-[10px]">
                            <FaUser className="ml-4" />
                            <input
                                className={`h-full w-full pl-4 border-none outline-none text-[20px] font-normal ${id ? 'text-black' : 'text-[#616161]'
                                    }`}
                                type="text"
                                placeholder='Nama'
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full mt-2">
                        <div className="flex items-center h-[60px] w-[80%] border-2 border-gray-300 rounded-[10px]">
                            <FaUserGroup className="ml-4" />
                            <input
                                className={`h-full w-full pl-4 border-none outline-none text-[20px] font-normal ${id ? 'text-black' : 'text-[#616161]'
                                    }`}
                                type="text"
                                placeholder='Nama Tim'
                                value={team}
                                onChange={(e) => setTeam(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full mt-2">
                        <div className="flex items-center h-[60px] w-[80%] border-2 border-gray-300 rounded-[10px]">
                            <HiAcademicCap className="ml-4" />
                            <input
                                className={`h-full w-full pl-4 border-none outline-none text-[20px] font-normal ${id ? 'text-black' : 'text-[#616161]'
                                    }`}
                                type="text"
                                placeholder='Nama Instansi'
                                value={instansi}
                                onChange={(e) => setInstansi(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full mt-2">
                        <div className="flex items-center h-[60px] w-[80%] border-2 border-gray-300 rounded-[10px]">
                            <FaAddressCard className="ml-4" />
                            <input
                                className={`h-full w-full pl-4 border-none outline-none text-[20px] font-normal ${id ? 'text-black' : 'text-[#616161]'
                                    }`}
                                type="text"
                                placeholder='Nomor Induk Mahasiswa (NIM)'
                                value={nim}
                                onChange={(e) => setNim(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full mt-2">
                        <div className="flex items-center h-[60px] w-[80%] border-2 border-gray-300 rounded-[10px]">
                            <MdEmail className="ml-4" />
                            <input
                                className={`h-full w-full pl-4 border-none outline-none text-[20px] font-normal ${id ? 'text-black' : 'text-[#616161]'
                                    }`}
                                type="text"
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full mt-2">
                        <div className="flex items-center h-[60px] w-[80%] border-2 border-gray-300 rounded-[10px]">
                            <FaMapMarked className="ml-4" />
                            <input
                                className={`h-full w-full pl-4 border-none outline-none text-[20px] font-normal ${id ? 'text-black' : 'text-[#616161]'
                                    }`}
                                type="text"
                                placeholder='Provinsi'
                                value={provinsi}
                                onChange={(e) => setProvinsi(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full mt-2">
                        <div className="flex items-center h-[60px] w-[80%] border-2 border-gray-300 rounded-[10px]">
                            <FaMapMarked className="ml-4" />
                            <input
                                className={`h-full w-full pl-4 border-none outline-none text-[20px] font-normal ${id ? 'text-black' : 'text-[#616161]'
                                    }`}
                                type="text"
                                placeholder='Kabupaten'
                                value={kabupaten}
                                onChange={(e) => setKabupaten(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full mt-2">
                        <div className="flex items-center h-[60px] w-[80%] border-2 border-gray-300 rounded-[10px]">
                            <FaFileContract className="ml-4" />
                            <select
                                className="h-full w-full pl-4 border-none outline-none text-[20px] font-normal"
                                value={lomba}
                                onChange={(e) => setLomba(e.target.value)}
                                required
                            >
                                <option value="" disabled>Pilih Lomba</option>
                                {lombaOptions.map((option, index) => (
                                    <option key={index} value={option.nama}>
                                        {option.nama}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full mt-2">
                        <div className="flex items-center h-[60px] w-[80%] border-2 border-gray-300 rounded-[10px] relative">
                            <FaLock className="ml-4" />
                            <input
                                className={`h-full w-full pl-4 pr-12 border-none outline-none text-[20px] font-normal ${password ? 'text-black' : 'text-[#616161]'
                                    }`}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full mt-2">
                        <div className="flex items-center h-[60px] w-[80%] border-2 border-gray-300 rounded-[10px] relative">
                            <FaLock className="ml-4" />
                            <input
                                className={`h-full w-full pl-4 pr-12 border-none outline-none text-[20px] font-normal ${password ? 'text-black' : 'text-[#616161]'
                                    }`}
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                            </button>
                        </div>
                    </div>
                    <div className="w-full">
                        <button
                            className={`${password && id ? 'bg-[black]' : 'bg-[#616161]'}  text-white h-[87px] w-[80%] ml-[10%] rounded-[10px] mt-7 text-[20px] font-medium`}
                            onClick={handleLogin}
                        >
                            Daftar
                        </button>
                    </div>
                </div>
                <div className={`${isMobile ? 'hidden' : 'w-1/2'} flex-1 min-h-screen bg-black flex justify-center items-center`}>
                    <img src={Logo} alt="Logo" className="w-1/2" />
                </div>
            </div>
            {error && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h2 className="text-2xl font-semibold text-red-600 mb-4">Login Error</h2>
                        <p className="text-gray-700 mb-6">{error}</p>
                        <button
                            onClick={closeModal}
                            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default Register;