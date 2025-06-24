import React from "react";

// actual accurate data, numbers and calculations have not been done
// just to showcase how it works

const foodItems = [
  { id: 1, name: "Milk", expiry: "2025-06-17" },
  { id: 2, name: "Eggs", expiry: "2025-06-20" },
  { id: 3, name: "Spinach", expiry: "2025-07-23" },
  { id: 4, name: "Bread", expiry: "2025-06-28" },
];

function daysLeft(date) {
  const today = new Date();
  const exp = new Date(date);
  return Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
}

const getStatus = (days) => {
  if (days <= 3) return "danger"; // 0-3 days: Expiring soon!
  if (days <= 10) return "warning"; // 4-10 days: Eat soon
  return "safe"; // 11+ days: Good to eat
};

const statusStyles = {
  safe: "from-green-200 to-green-400",
  warning: "from-yellow-200 to-yellow-400",
  danger: "from-red-200 to-red-400",
};

function friendlyDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // Remove time for comparison
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);

  if (date.getTime() === today.getTime()) return "Expires today";
  if (date.getTime() === tomorrow.getTime()) return "Expires tomorrow";

  // If within 7 days, show weekday
  const diff = (date - today) / (1000 * 60 * 60 * 24);
  if (diff > 1 && diff < 7) {
    return `Expires on ${date.toLocaleDateString(undefined, {
      weekday: "long",
    })}`;
  }

  // Otherwise, show "Expires on 16 May"
  return `Expires on ${date.getDate()} ${date.toLocaleDateString(undefined, {
    month: "short",
  })}`;
}

const Dashboard = () => {
  const maxDays = 90; // 90 days = full ring, 1 day = almost empty
  const sorted = [...foodItems].sort(
    (a, b) => daysLeft(a.expiry) - daysLeft(b.expiry)
  );

  return (
    <section className="bg-gradient-to-br from-purple-900 to-indigo-900 dark:bg-gradient-to-br dark:from-pink-100 dark:via-purple-100 dark:to-blue-100 border-2 border-black dark:border-white rounded-xl transition-all duration-300 shadow-lg p-8 my-8 text-white dark:text-black">
      {/* SECTION: Dashboard/Expiry */}
      <h2 className="text-2xl font-bold mb-6">Expiry Dashboard</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {sorted.map((item) => {
          const days = daysLeft(item.expiry);
          const status = getStatus(days);
          const percent = Math.max(0, Math.min(100, (days / maxDays) * 100));
          return (
            <div
              key={item.id}
              className={`relative bg-gradient-to-br ${statusStyles[status]} rounded-xl shadow-lg p-6 flex items-center space-x-6 animate-fade-in`}
            >
              {/* Progress ring */}
              <svg className="w-16 h-16" viewBox="0 0 36 36">
                <path
                  className="text-gray-200"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className={
                    status === "danger"
                      ? "text-red-500"
                      : status === "warning"
                      ? "text-yellow-500"
                      : "text-green-600"
                  }
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray={`${percent}, 100`}
                />
                <text
                  x="18"
                  y="22"
                  textAnchor="middle"
                  className="fill-current text-lg font-bold"
                  fill="#333"
                >
                  {days}d
                </text>
              </svg>
              <div>
                <div className="text-lg font-semibold">{item.name}</div>
                <div className="text-sm text-gray-700">
                  {friendlyDate(item.expiry)}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wide">
                  {status === "danger"
                    ? "Expiring Soon!"
                    : status === "warning"
                    ? "Eat Soon"
                    : "Good to Eat"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Dashboard;
