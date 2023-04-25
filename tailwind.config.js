// 項目の3 tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./resources/**/*.blade.php", 
      "./resources/**/*.js", 
      "./resources/**/*.tsx", 
  ],
  variants: {
    extend: {
      textColor: ['disabled'],
      opacity: ['disabled'],
    },
  },
  theme: {
    extend: {
      textColor: {
        'black-important': 'black !important',
      },
    },
  },
  plugins: [],
}