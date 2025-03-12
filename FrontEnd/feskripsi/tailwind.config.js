/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/main.js", 
    "./src/App.vue",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Ensure Vue files are included
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
