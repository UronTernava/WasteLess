import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";

const Login = ({ onForgot, onRegister, onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // Login request
      const res = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      // Store JWT token
      localStorage.setItem("token", data.token);

      // Fetch user info
      const userRes = await fetch("http://localhost:5001/api/auth/me", {
        headers: { Authorization: `Bearer ${data.token}` },
      });
      const user = await userRes.json();
      if (!userRes.ok)
        throw new Error(user.error || "Failed to fetch user info");

      // Pass user info to parent (e.g., App or context)
      if (onLoginSuccess) onLoginSuccess(user);

      // Redirect to home/dashboard (handled by parent or router)
      // Example: navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-2xl p-10 mb-12 max-w-md mx-auto mt-20">
      {/* 3D floating icon */}
      <div className="absolute -top-8 right-8 bg-green-200 shadow-lg rounded-full p-4 animate-float">
        <FaSignInAlt className="text-green-700 text-3xl" />
      </div>
      <h2 className="text-3xl font-extrabold text-green-700 mb-6 flex items-center gap-2">
        Login
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-green-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white shadow-inner"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-green-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white shadow-inner"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="text-green-600 hover:underline text-sm"
            onClick={onForgot}
          >
            Forgot password?
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition-transform"
          >
            Login
          </button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <span className="text-gray-600 text-sm">Don't have an account?</span>
        <button
          type="button"
          className="ml-2 text-green-700 font-semibold hover:underline"
          onClick={onRegister}
        >
          Register
        </button>
      </div>
    </section>
  );
};

export default Login;
