import React, { useState } from "react";
import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";

const Register = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("http://localhost:5001/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "An account with that email already exists. Please register with another email address.");
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-2xl p-10 mb-12 max-w-md mx-auto mt-20">
      {/* 3D floating icon */}
      <div className="absolute -top-8 right-8 bg-green-200 shadow-lg rounded-full p-4 animate-float">
        <FaUserPlus className="text-green-700 text-3xl" />
      </div>
      <h2 className="text-3xl font-extrabold text-green-700 mb-6 flex items-center gap-2">
        Sign Up
      </h2>
      {success ? (
        <div className="text-green-600 font-semibold">
          Registration successful! You can now{" "}
          <button
            type="button"
            className="text-green-700 underline"
            onClick={onLogin}
          >
            login
          </button>
          .
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-green-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white shadow-inner"
            />
          </div>
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
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition-transform"
          >
            Sign Up
          </button>
        </form>
      )}
      <div className="mt-6 text-center">
        <span className="text-gray-600 text-sm">Already have an account?</span>
        <button
          type="button"
          className="ml-2 text-green-700 font-semibold hover:underline"
          onClick={onLogin}
        >
          Login
        </button>
      </div>
    </section>
  );
};

export default Register;
