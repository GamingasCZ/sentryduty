/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      dropShadow: {
        glow: "0px 0px 3px white"
      }
    },
  },
  plugins: [],
}

