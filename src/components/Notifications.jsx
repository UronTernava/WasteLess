import React from "react";
import { FaBell } from "react-icons/fa";

const notifications = [
  { message: "Milk expires in 2 days!", type: "warning" },
  { message: "Spinach expires tomorrow!", type: "danger" },
  { message: "Eggs are good for another week.", type: "safe" },
];

const typeStyles = {
  safe: "bg-green-100 text-green-700",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-700",
};

const Notifications = () => (
  <section
    style={{ background: "#000", color: "#fff" }}
    className="border-2 border-black dark:border-white rounded-xl transition-all duration-300 shadow-lg p-8 my-8 dark:bg-white dark:text-black"
  >
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <FaBell className="text-green-600 text-xl" />
        <span className="text-lg font-semibold text-green-700">
          Expiry Alerts
        </span>
      </div>
      <ul className="space-y-2">
        {notifications.map((n, i) => (
          <li
            key={i}
            className={`rounded px-4 py-2 flex items-center gap-2 ${
              typeStyles[n.type]
            }`}
          >
            {n.message}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Notifications;
