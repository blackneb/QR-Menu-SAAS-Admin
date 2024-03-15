/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'madimi-one': ['Madimi One', 'cursive'],
        'newfont':['Truculenta', 'sans-serif'],
        'mainfont':['Nunito', 'sans-serif']
      },
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}

