import React, { useState } from "react";
import { FaKey } from "react-icons/fa";

const ForgotPassword = ({ user }) => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    return (
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-2xl p-10 mb-12 max-w-md mx-auto mt-20">
        <div className="absolute -top-8 right-8 bg-green-200 shadow-lg rounded-full p-4 animate-float">
          <FaKey className="text-green-700 text-3xl" />
        </div>
        <h2 className="text-3xl font-extrabold text-green-700 mb-6 flex items-center gap-2">
          Forgot Password
        </h2>
        <div className="text-green-700 font-semibold text-lg">
          You are already logged in.<br />
          If you want to change your password, please use your account settings.
        </div>
      </section>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Reset failed");
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-2xl p-10 mb-12 max-w-md mx-auto mt-20">
      {/* 3D floating icon */}
      <div className="absolute -top-8 right-8 bg-green-200 shadow-lg rounded-full p-4 animate-float">
        <FaKey className="text-green-700 text-3xl" />
      </div>
      <h2 className="text-3xl font-extrabold text-green-700 mb-6 flex items-center gap-2">
        Forgot Password
      </h2>
      {submitted ? (
        <div className="text-green-600 font-semibold">
          If your email is registered, your password has been reset!
        </div>
      ) : (
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
            <label className="block text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-green-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white shadow-inner"
            />
          </div>
          {error && <div className="text-red-600">{error}</div>}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white px-6 py-2 rounded-lg shadow hover:scale-105 transition-transform"
          >
            Reset Password
          </button>
        </form>
      )}
    </section>
  );
};

export default ForgotPassword;
