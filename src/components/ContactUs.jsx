import React, { useState } from "react";

const ContactUs = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      style={{ background: "#000", color: "#fff" }}
      className="border-2 border-black dark:border-white rounded-xl transition-all duration-300 shadow-lg p-8 my-8 dark:bg-white dark:text-black"
    >
      <h2 className="text-2xl font-bold text-green-700 mb-4">Contact Us</h2>
      {submitted ? (
        <div className="text-green-600 font-semibold">
          Thank you for reaching out! We'll get back to you soon.
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Message</label>
            <textarea
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>
      )}
    </section>
  );
};

export default ContactUs;
