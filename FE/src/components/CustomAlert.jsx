import React from "react";
import propTypes from "prop-types";
import { motion } from "framer-motion";

const CustomAlert = ({ message, onClose }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-24 right-4 bg-[#1C1C1C] text-white px-4 py-2 rounded-lg shadow-lg z-50"
        >
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <button 
                    className="ml-4 text-lg font-bold" 
                    onClick={onClose}>
                    &times;
                </button>
            </div>
        </motion.div>
    );
};

CustomAlert.propTypes = {
    message: propTypes.string.isRequired,
    onClose: propTypes.func.isRequired,
};

export default CustomAlert;
