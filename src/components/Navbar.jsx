import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSun, FaMoon } from "react-icons/fa";

const navLinks = [
  { name: "Home" },
  { name: "Dashboard" },
  { name: "Scan"},
  { name: "Pantry" },
  { name: "Receipt", label: "Receipt" },
];

const accountLinks = [
  { name: "Login" },
  { name: "Register" },
  { name: "ForgotPassword", label: "Forgot Password" },
];

const Navbar = ({ active, setActive, darkMode, setDarkMode, user, onLogout, onNav, pageMode, setPageMode }) => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef();

  // Dynamically filter navLinks for Pantry/Receipt pages
  let filteredNavLinks = navLinks;
  if (pageMode === "Pantry") {
    filteredNavLinks = navLinks.filter(link => link.name !== "Pantry");
  } else if (pageMode === "Receipt") {
    filteredNavLinks = navLinks.filter(link => link.name !== "Receipt");
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }
    if (dropdown) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdown]);

  return (
    <nav
      className={`sticky top-0 z-50 ${
        darkMode ? "bg-gray-900" : "bg-white/60"
      } backdrop-blur-lg shadow-lg transition-colors`}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-4">
        <button
          onClick={() => onNav("Home")}
          className={`text-2xl font-extrabold tracking-tight drop-shadow focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors ${
            darkMode ? "text-yellow-400" : "text-green-700"
          }`}
          aria-label="Go to Home"
        >
          WasteLess
        </button>
        <div className="flex space-x-6 items-center">
          {filteredNavLinks.map((link) => (
            <button
              key={link.name}
              onClick={(e) => {
                e.preventDefault();
                if (pageMode === "main" && link.name === "Dashboard") onNav("Dashboard");
                else if (pageMode === "Pantry" && link.name === "Receipt") onNav("Receipt");
                else if (pageMode === "Receipt" && link.name === "Pantry") onNav("Pantry");
                else if (active !== link.name && onNav) onNav(link.name);
                setDropdown(false);
              }}
              disabled={
                (pageMode === "Pantry" && link.name === "Pantry") ||
                (pageMode === "Receipt" && link.name === "Receipt")
              }
              className={`relative px-2 py-1 font-medium transition-colors duration-200
                ${
                  ((pageMode === "Pantry" && link.name === "Pantry") ||
                  (pageMode === "Receipt" && link.name === "Receipt"))
                    ? darkMode
                      ? "text-yellow-400 cursor-not-allowed"
                      : "text-green-700 cursor-not-allowed"
                    : darkMode
                    ? "text-gray-200"
                    : "text-slate-800"
                }
                group`}
            >
              {link.label || link.name}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 rounded ${
                  darkMode ? "bg-yellow-400" : "bg-green-500"
                } transition-all duration-300
                  ${
                    active === link.name ? "w-full" : "w-0"
                  } group-hover:w-full`}
              ></span>
            </button>
          ))}
          {/* Sun/Moon Toggle */}
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="text-xl mx-2 transition-colors"
            aria-label="Toggle color mode"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-600" />
            )}
          </button>
          {/* Account Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdown((d) => !d)}
              className={`flex items-center px-2 py-1 font-medium transition-colors ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } hover:text-green-700`}
            >
              <FaUserCircle className="text-2xl mr-1" />
              {/* Active icon */}
              {user && (
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full ml-1 border-2 border-white dark:border-gray-900"></span>
              )}
              Account
              <svg
                className={`ml-1 w-4 h-4 transition-transform ${
                  dropdown ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {dropdown && (
              <div
                className={`absolute right-0 mt-2 w-44 rounded shadow-lg border z-50 ${
                  darkMode ? "bg-gray-800 border-gray-700" : "bg-white"
                }`}
              >
                {accountLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      setActive(link.name);
                      setPageMode(link.name);
                      setDropdown(false);
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-green-50 ${
                      active === link.name
                        ? darkMode
                          ? "text-yellow-400 font-semibold"
                          : "text-green-700 font-semibold"
                        : darkMode
                        ? "text-gray-200"
                        : "text-slate-800"
                    }`}
                  >
                    {link.label || link.name}
                  </button>
                ))}
                {user && (
                  <button
                    onClick={() => {
                      if (onLogout) onLogout();
                      setDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-semibold border-t border-gray-200 dark:border-gray-700"
                  >
                    Log out
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
