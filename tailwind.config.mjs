/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  darkMode: "class", // Ensure "class" mode is set
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default tailwindConfig; // Now assigned before export
