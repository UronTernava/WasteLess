export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  safelist: [
    "bg-black",
    "bg-neutral-900",
    "bg-gray-900",
    "bg-white",
    "text-white",
    "text-black",
    "border-black",
    "border-white",
  ],
  theme: { extend: {} },
  plugins: [],
}