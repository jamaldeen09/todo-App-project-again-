// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // App router pages/components
    './pages/**/*.{js,ts,jsx,tsx}', // If you still have Pages
    './components/**/*.{js,ts,jsx,tsx}', // Reusable components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}