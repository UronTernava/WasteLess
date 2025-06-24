import React from "react";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-green-100 text-green-800 py-8 mt-16 rounded-t-xl shadow-inner">
    <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
      <div className="text-lg font-bold flex items-center gap-2">
        <span role="img" aria-label="leaf">
          🌱
        </span>{" "}
        WasteLess
      </div>
      <div className="flex gap-6 text-sm">
        <a href="#Dashboard" className="hover:underline">
          Dashboard
        </a>
        <a href="#Pantry" className="hover:underline">
          Pantry
        </a>
        <a href="#Recipes" className="hover:underline">
          Recipes
        </a>
        <a href="#Scan" className="hover:underline">
          Scan
        </a>
      </div>
      <div className="flex gap-4 text-xl">
        <a href="https://github.com/UronTernava" aria-label="GitHub" className="hover:text-green-600" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://www.instagram.com/u.ternava" aria-label="Instagram" className="hover:text-green-600" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com/in/uron-ternava-806350304/" aria-label="LinkedIn" className="hover:text-green-600" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
      </div>
    </div>
    <div className="text-center text-xs text-green-700 mt-4">
      © {new Date().getFullYear()} WasteLess. All rights reserved. | Reducing
      food waste, one kitchen at a time.
    </div>
  </footer>
);

export default Footer;
