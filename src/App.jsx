import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Scan from "./components/NavbarOptions/Scan";
import Pantry from "./components/NavbarOptions/Pantry";
import Recipes from "./components/NavbarOptions/Recipes";
import Register from "./components/NavbarOptions/Register";
import Login from "./components/NavbarOptions/Login";
import ForgotPassword from "./components/NavbarOptions/ForgotPassword";
import Header from "./components/Header";
import AboutUs from "./components/AboutUs";
import StatsWidget from "./components/StatsWidget";
import TipsBlog from "./components/TipsBlog";
import Notifications from "./components/Notifications";
import Welcome from "./components/Welcome";
import LoadingScreen from "./components/LoadingScreen";
import ReleaseOnScroll from "./components/ReleaseOnScroll";
import Footer from "./components/Footer";

function App() {
  const [active, setActive] = useState("Dashboard");
  const [showWelcome, setShowWelcome] = useState(true);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [pageMode, setPageMode] = useState("main"); // 'main', 'Pantry', 'Receipt', etc.

  const dashboardRef = useRef(null);
  const scanRef = useRef(null);

  // Check for saved dark mode preference
  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
  }, []);

  // Apply dark mode class to root element
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  // Simulate loading screen
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // On mount, check for token and fetch user info if present
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data) setUser(data);
        })
        .catch(() => setUser(null));
    }
  }, []);

  // Handle login success: set user, set active to Dashboard
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setActive("Dashboard");
    setPageMode("main");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setActive("Login");
    setPageMode("main");
  };

  // Smooth scroll functions
  const scrollToDashboard = () => {
    if (dashboardRef.current) {
      const y = dashboardRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  const scrollToScan = () => {
    if (scanRef.current) {
      const y = scanRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Navigation handler
  const handleNav = (target) => {
    if (pageMode === "main") {
      if (target === "Scan") scrollToScan();
      else if (target === "Dashboard") scrollToDashboard();
      else if (target === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
      else {
        setActive(target);
        setPageMode(target);
      }
    } else {
      // If on Pantry or Receipt, allow switching directly between them
      if ((pageMode === "Pantry" && target === "Receipt") || (pageMode === "Receipt" && target === "Pantry")) {
        setActive(target);
        setPageMode(target);
    } else {
      setActive("Dashboard");
      setPageMode("main");
      setTimeout(() => {
        if (target === "Scan") scrollToScan();
          else if (target === "Dashboard") scrollToDashboard();
          else if (target === "Home") window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
      }
    }
  };

  let content = null;
  switch (active) {
    case "Pantry":
      content = <Pantry user={user} />;
      break;
    case "Receipt":
      content = <Recipes user={user} />;
      break;
    case "Login":
      content = (
        <Login
          onForgot={() => setActive("ForgotPassword")}
          onRegister={() => setActive("Register")}
          onLoginSuccess={handleLoginSuccess}
        />
      );
      break;
    case "Register":
      content = <Register onLogin={() => setActive("Login")} />;
      break;
    case "ForgotPassword":
      content = <ForgotPassword user={user} />;
      break;
    default:
      content = null;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={pageMode !== "main" ? "min-h-screen flex flex-col" : "min-h-screen"}>
      {showWelcome && <Welcome onClose={() => setShowWelcome(false)} />}
      <Navbar
        active={active}
        setActive={setActive}
        user={user}
        onLogout={handleLogout}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onNav={handleNav}
        pageMode={pageMode}
        setPageMode={setPageMode}
      />
      <main className={pageMode !== "main" ? "flex-1 container mx-auto px-4 py-8 w-full" : "container mx-auto px-4 py-8"}>
        {pageMode === "main" && (
          <>
            <ReleaseOnScroll>
              <Header
                user={user}
                onHomeClick={() => handleNav("Home")}
                onRegisterClick={() => {
                  if (user) {
                    // If logged in, scroll to Scan section
                    handleNav("Scan");
                  } else {
                    // If not logged in, go to Register
                    setActive("Register");
                    setPageMode("Register");
                  }
                }}
              />
            </ReleaseOnScroll>
            <ReleaseOnScroll>
              <AboutUs />
            </ReleaseOnScroll>
            <ReleaseOnScroll>
              <div ref={dashboardRef}><Dashboard user={user} /></div>
            </ReleaseOnScroll>
            <ReleaseOnScroll>
              <div ref={scanRef}><Scan user={user} /></div>
            </ReleaseOnScroll>
            <ReleaseOnScroll>
              <StatsWidget user={user} />
            </ReleaseOnScroll>
            <ReleaseOnScroll>
              <Notifications user={user} />
            </ReleaseOnScroll>
            <ReleaseOnScroll>
              <TipsBlog />
            </ReleaseOnScroll>
          </>
        )}
        {pageMode !== "main" && content}
      </main>
      <Footer />
    </div>
  );
}

export default App;
