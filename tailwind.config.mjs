/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  darkMode: "class", // Ensure "class" mode is set
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default tailwindConfig; // Now assigned before export
