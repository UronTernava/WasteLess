import React from "react";

const Pantry = ({ onHome, onScan }) => (
  <section className="bg-gradient-to-br from-green-900 to-lime-900 dark:bg-gradient-to-br dark:from-lime-100 dark:via-green-100 dark:to-emerald-50 border-2 border-black dark:border-white rounded-xl transition-all duration-300 shadow-lg p-8 mb-8 text-white dark:text-black">
    {/* SECTION: Pantry */}
    <h2 className="text-2xl font-bold mb-4">My Pantry</h2>
    <p className="mb-4">
      View and manage all your tracked food items here. (CRUD features coming
      soon!)
    </p>
    <ul className="list-disc list-inside">
      <li>Milk – Expires in 3 days</li>
      <li>Eggs – Expires in 7 days</li>
      <li>Bread – Expires in 2 days</li>
    </ul>
    <div className="mt-2 text-xs">* Demo data</div>
  </section>
);

export default Pantry;
