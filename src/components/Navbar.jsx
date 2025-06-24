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
  const [mobileMenu, setMobileMenu] = useState(false);
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
      <div className="container mx-auto flex justify-between items-center py-2 sm:py-3 px-3 sm:px-4">
        <button
          onClick={() => onNav("Home")}
          className={`text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors ${
            darkMode ? "text-yellow-400" : "text-green-700"
          }`}
          aria-label="Go to Home"
        >
          WasteLess
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 lg:space-x-6 items-center">
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
              className={`relative px-2 py-1 font-medium transition-colors duration-200 text-sm lg:text-base
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
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Sun/Moon Toggle */}
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="text-lg sm:text-xl transition-colors"
            aria-label="Toggle color mode"
          >
            {darkMode ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-600" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Account Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdown((d) => !d)}
              className={`flex items-center px-2 py-1 font-medium transition-colors text-sm sm:text-base ${
                darkMode ? "text-gray-200" : "text-gray-700"
              } hover:text-green-700`}
            >
              <FaUserCircle className="text-xl sm:text-2xl mr-1" />
              {/* Active icon */}
              {user && (
                <span className="inline-block w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full ml-1 border-2 border-white dark:border-gray-900"></span>
              )}
              <span className="hidden sm:inline">Account</span>
              <svg
                className={`ml-1 w-3 h-3 sm:w-4 sm:h-4 transition-transform ${
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
                className={`absolute right-0 mt-2 w-36 sm:w-44 rounded shadow-lg border z-50 ${
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
                    className={`block w-full text-left px-3 sm:px-4 py-2 text-sm sm:text-base hover:bg-green-50 ${
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
                    className="block w-full text-left px-3 sm:px-4 py-2 text-red-600 hover:bg-red-50 font-semibold border-t border-gray-200 dark:border-gray-700 text-sm sm:text-base"
                  >
                    Log out
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg">
          <div className="px-4 py-3 space-y-2">
            {filteredNavLinks.map((link) => (
              <button
                key={link.name}
                onClick={(e) => {
                  e.preventDefault();
                  if (pageMode === "main" && link.name === "Dashboard") onNav("Dashboard");
                  else if (pageMode === "Pantry" && link.name === "Receipt") onNav("Receipt");
                  else if (pageMode === "Receipt" && link.name === "Pantry") onNav("Pantry");
                  else if (active !== link.name && onNav) onNav(link.name);
                  setMobileMenu(false);
                }}
                disabled={
                  (pageMode === "Pantry" && link.name === "Pantry") ||
                  (pageMode === "Receipt" && link.name === "Receipt")
                }
                className={`block w-full text-left px-3 py-2 rounded-lg font-medium transition-colors ${
                  ((pageMode === "Pantry" && link.name === "Pantry") ||
                  (pageMode === "Receipt" && link.name === "Receipt"))
                    ? darkMode
                      ? "text-yellow-400 bg-yellow-400/10"
                      : "text-green-700 bg-green-100"
                    : darkMode
                    ? "text-gray-200 hover:bg-gray-800"
                    : "text-slate-800 hover:bg-gray-100"
                }`}
              >
                {link.label || link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
