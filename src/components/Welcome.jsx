import React from "react";
import { FaLeaf, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const Welcome = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="glassmorphism max-w-lg w-full rounded-2xl shadow-2xl p-8 relative overflow-hidden text-center"
      >
        <button
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-transform duration-200 hover:scale-125"
          onClick={onClose}
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className="text-white">
          <FaLeaf className="text-7xl text-white/80 mx-auto mb-6" />
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Welcome to WasteLess
          </h1>
          <p className="text-xl text-white/80 mb-8">
            A new era of managing your pantry is here. Reduce food waste, save
            money, and discover delicious recipes.
          </p>
          <button
            className="bg-green-500 text-white font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
            onClick={onClose}
          >
            Let's Get Started!
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Welcome;
