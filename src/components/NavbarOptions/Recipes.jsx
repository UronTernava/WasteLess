import React from "react";

const Recipes = () => (
  <section className="bg-gradient-to-br from-pink-900 to-fuchsia-900 dark:bg-gradient-to-br dark:from-pink-100 dark:via-rose-100 dark:to-fuchsia-50 border-2 border-black dark:border-white rounded-xl transition-all duration-300 shadow-lg p-8 mb-8 text-white dark:text-black">
    {/* SECTION: Recipes */}
    <h2 className="text-2xl font-bold mb-4">
      Recipe Suggestions
    </h2>
    <p className="mb-4">
      Get quick recipe ideas based on what's expiring soon in your pantry!
    </p>
    <ul className="list-disc list-inside">
      <li>
        <span className="font-semibold">Spinach Omelette</span> – Use up your
        spinach and eggs!
      </li>
      <li>
        <span className="font-semibold">Bread Pudding</span> – Great for
        leftover bread.
      </li>
    </ul>
    <div className="mt-2 text-xs">* Demo suggestions</div>
  </section>
);

export default Recipes;
