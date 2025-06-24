import React, { useState, useEffect } from "react";
import { FaLightbulb } from "react-icons/fa";

const tips = [
  "Store herbs in a glass of water to keep them fresh longer.",
  "Plan your meals for the week to avoid overbuying.",
  "Freeze leftovers in small portions for quick meals.",
  "Use vegetable scraps to make homemade broth.",
  "First in, first out: use older food before new groceries.",
];

const TipsBlog = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % tips.length),
      7200 // 8 seconds before next tip
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section
    style={{ background: "#000", color: "#fff" }}
    className="border-2 border-black dark:border-white rounded-xl transition-all duration-300 shadow-lg p-8 my-8 dark:bg-white dark:text-black"
  >
      <div className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4">
        <FaLightbulb className="text-yellow-400 text-3xl" />
        <div>
          <div className="text-lg font-semibold text-green-700">
            Food-Saving Tip
          </div>
          <div className="text-gray-700">{tips[current]}</div>
        </div>
      </div>
    </section>
  );
};

export default TipsBlog;
