import { Fragment, useState, useEffect } from "react";
import Logo from "../assets/landing/evolution-logo.webp";
import { useDispatch } from 'react-redux';
import { login } from '../slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock } from 'react-icons/fa';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
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

    return (
        <Fragment>
            <div className="flex items-center ">
                <div className="w-1/2 h-screen bg-black flex justify-center items-center">
                    <img src={Logo} alt="Logo" className="w-1/2" />
                </div>
                <div className="w-1/2">
                    <h1 className="text-center text-3xl font-semibold">Selamat Datang</h1>
                    <h1 className="text-center text-lg">Silahkan masukan detail akun anda untuk mengakses dashboard</h1>
                    <div className="flex justify-center items-center mt-6">
                        <div className="flex items-center h-[80px] w-[80%] border-2 border-gray-300 rounded-[10px]">
                            <FaUser className="ml-4" />
                            <input
                                className={`h-full w-full pl-4 border-none outline-none text-[20px] font-normal ${id ? 'text-black' : 'text-[#616161]'
                                    }`}
                                type="text"
                                placeholder='ID'
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-6">
                        <div className="flex items-center h-[80px] w-[80%] border-2 border-gray-300 rounded-[10px] relative">
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
                    <div className="w-full">
                        <button
                            className={`${password && id ? 'bg-[black]' : 'bg-[#616161]'}  text-white h-[87px] w-[80%] ml-[10%] rounded-[10px] mt-7 text-[20px] font-medium`}
                            onClick={handleLogin}
                        >
                            Masuk
                        </button>
                    </div>
                    <p className="text-center mt-4">Belum Mempunyai Akun? <span className="text-blue-500">Daftar</span></p>
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

export default Login;