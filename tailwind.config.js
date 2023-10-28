/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors:{
        // 'custom-navbar': 'rgb(76, 17, 178)',
        'navbar-hover': 'rgb(85,115,75)',
      }
    },
  },
  plugins: [],
}

