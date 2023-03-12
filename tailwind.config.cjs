/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alegreya: "'Alegreya', serif",
        alegreya_Sc: "'Alegreya SC', serif",
        alegreya_Sans: "'Alegreya plex Sans', sans-serif",
        crimson: "'Crimson Pro', serif",
        IBMPlex_Sans: "'IBM Plex Sans', sans-serif",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'),
  ],
}
