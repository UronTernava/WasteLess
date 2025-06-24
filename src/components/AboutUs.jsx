import React from "react";

const AboutUs = () => (
  <section className="bg-gradient-to-br from-blue-900 to-gray-900 dark:bg-gradient-to-br dark:from-yellow-100 dark:via-green-100 dark:to-blue-100 border-2 border-black dark:border-white rounded-xl transition-all duration-300 shadow-lg p-8 my-16 flex items-start justify-between text-white dark:text-black">
    {/* SECTION: About Us */}
    <div>
      <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-2">
        <span role="img" aria-label="leaf">🌱</span>
        About WasteLess
      </h2>
      <div className="space-y-6 text-lg leading-relaxed">
        <p className="flex items-center gap-2">
          <span role="img" aria-label="sparkles" className="text-blue-200 dark:text-yellow-700">✨</span>
          <span className="font-semibold">WasteLess</span> is your smart kitchen sidekick!
        </p>
        <p className="flex items-center gap-2">
          <span role="img" aria-label="alarm" className="text-yellow-200 dark:text-pink-600">⏰</span>
          Get friendly expiry alerts before your food goes bad.
        </p>
        <p className="flex items-center gap-2">
          <span role="img" aria-label="chef" className="text-pink-200 dark:text-blue-600">👩‍🍳</span>
          Discover quick recipes for ingredients you already have.
        </p>
        <p className="flex items-center gap-2">
          <span role="img" aria-label="earth" className="text-gray-200 dark:text-gray-600">🌍</span>
          Every meal you save helps the planet (and your wallet)!
        </p>
      </div>
      <div className="mt-10">
        <span className="inline-block bg-white/80 dark:bg-yellow-100 text-blue-900 dark:text-pink-900 px-4 py-2 rounded-full font-semibold shadow border border-black dark:border-white">
          Let's waste less, together!
        </span>
      </div>
    </div>
    {/* 3D-like decorative SVG on the right */}
    <div className="ml-8 hidden md:block">
      <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
        <ellipse cx="55" cy="70" rx="38" ry="15" fill="#6ee7b7" />
        <ellipse cx="55" cy="55" rx="35" ry="35" fill="url(#paint0_radial_v2)" />
        <ellipse cx="55" cy="45" rx="18" ry="8" fill="#38bdf8" opacity="0.7" />
        <ellipse cx="70" cy="60" rx="7" ry="3" fill="#0ea5e9" opacity="0.5" />
        <ellipse cx="40" cy="65" rx="6" ry="2.5" fill="#0ea5e9" opacity="0.5" />
        <defs>
          <radialGradient
            id="paint0_radial_v2"
            cx="0"
            cy="0"
            r="1"
            gradientTransform="translate(55 55) scale(35)"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#6ee7b7" />
            <stop offset="1" stopColor="#38bdf8" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  </section>
);

export default AboutUs;
