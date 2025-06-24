import React from "react";
import { FaLeaf } from "react-icons/fa";

const LoadingScreen = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 z-50">
    <div className="flex flex-col items-center">
      <FaLeaf className="text-green-600 text-6xl animate-spin-slow drop-shadow-lg" />
      <div className="mt-4 text-green-700 font-bold text-xl animate-pulse">
        Loading WasteLess...
      </div>
    </div>
  </div>
);

export default LoadingScreen;
