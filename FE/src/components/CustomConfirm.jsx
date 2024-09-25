import React from "react";
import propTypes from "prop-types";
import { motion } from "framer-motion";

const CustomConfirm = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50">
            <motion.div 
                initial={{ opacity: 1, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 1, y: -100, duration: 0.5 }}
                transition={{ duration: 0.5 }}
                className="rounded-b-lg shadow-lg p-6 w-80 bg-[#1C1C1C]"
            >
                <p className="mb-4 text-center text-white">{message}</p>
                <div className="flex justify-center space-x-4">
                    <button 
                        className="bg-[#278307] text-white px-4 py-2 rounded hover:bg-[#1b5e05]"
                        onClick={onConfirm}>
                        Yes
                    </button>
                    <button 
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                        onClick={onCancel}>
                        No
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

CustomConfirm.propTypes = {
    message: propTypes.string.isRequired,
    onConfirm: propTypes.func.isRequired,
    onCancel: propTypes.func.isRequired,
};

export default CustomConfirm;
