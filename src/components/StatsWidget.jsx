import React from "react";
import { FaLeaf, FaMoneyBillWave, FaTrashAlt } from "react-icons/fa";

const stats = [
  {
    icon: <FaLeaf className="text-green-500 text-2xl" />,
    label: "Food Saved",
    value: "18 kg",
    desc: "in the last 3 months",
  },
  {
    icon: <FaMoneyBillWave className="text-yellow-500 text-2xl" />,
    label: "Money Saved",
    value: "$120",
    desc: "by reducing waste",
  },
  {
    icon: <FaTrashAlt className="text-red-400 text-2xl" />,
    label: "Waste Prevented",
    value: "25 kg",
    desc: "from landfill",
  },
];

const StatsWidget = () => (
  <section
    style={{ background: "#000", color: "#fff" }}
    className="border-2 border-black dark:border-white rounded-xl transition-all duration-300 shadow-lg p-8 my-8 dark:bg-white dark:text-black"
  >
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:scale-105 transition-transform"
        >
          <div className="mb-2">{stat.icon}</div>
          <div className="text-2xl font-bold text-green-700">{stat.value}</div>
          <div className="text-lg font-semibold text-gray-700">
            {stat.label}
          </div>
          <div className="text-xs text-gray-500 mt-1">{stat.desc}</div>
        </div>
      ))}
    </div>
  </section>
);

export default StatsWidget;
