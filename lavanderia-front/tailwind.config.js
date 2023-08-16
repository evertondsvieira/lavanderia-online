/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#DA4B30',
        customOrange: '#EE6F57',
        customGray: '#f9fafc',
      },
    },
  },
  plugins: [],
}

