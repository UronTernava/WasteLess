import React from "react";
import { FaCarrot, FaAppleAlt, FaBreadSlice, FaHome } from "react-icons/fa";

const floatingIcons = [
  { icon: <FaCarrot />, style: "left-8 top-8 text-orange-400" },
  { icon: <FaAppleAlt />, style: "right-12 top-16 text-red-400" },
  { icon: <FaBreadSlice />, style: "left-1/2 bottom-8 text-yellow-500" },
];

const Header = ({ onHomeClick, onRegisterClick }) => (
  <section
      style={{ background: "#000", color: "#fff" }}
      className="border-2 border-black dark:border-white rounded-xl transition-all duration-300 shadow-lg p-4 sm:p-6 md:p-8 my-4 sm:my-6 md:my-8 dark:bg-white dark:text-black"
    >
  <header className="relative overflow-hidden rounded-xl shadow-xl mb-4 sm:mb-6 md:mb-8 bg-gradient-to-br from-green-200 via-white to-green-50 animate-gradient-x">
    {/* Floating icons */}
    {floatingIcons.map((item, i) => (
      <span
        key={i}
        className={`absolute text-2xl sm:text-3xl md:text-5xl opacity-30 animate-float ${item.style}`}
        style={{ animationDelay: `${i * 0.7}s` }}
      >
        {item.icon}
      </span>
    ))}
    <div className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-16">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-green-800 mb-3 sm:mb-4 drop-shadow">
        Waste Less, Save More.
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 max-w-xl">
        Smart food tracking, expiry alerts, and recipe ideas—right in your
        kitchen.
      </p>
      <button
        className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-lg hover:scale-105 transition-transform font-semibold text-sm sm:text-base"
        onClick={onRegisterClick}
      >
        Start Tracking
      </button>
    </div>
  </header>
</section>
);

export default Header;
