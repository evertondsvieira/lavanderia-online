/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        mainBlue: '#0074B2',
        secondaryBlue: '#66A3D2',
        customGray: '#f9fafc',
      },
    },
  },
  plugins: [],
}

