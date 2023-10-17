/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors:{
        'custom-navbar': 'rgb(76, 17, 178)',
        'navbar-hover': '#5616c4',
        'navbar-hover-text': '#0f2a54',
      }
    },
  },
  plugins: [],
}

