/** @type {import('tailwindcss').Config} */
const nativewind = require('nativewind/tailwind');

module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cimasBlue: '#003399',
        igoGreen: '#4CAF50',
        igoAccent: '#FF9800',
      },
      fontFamily: {
        jakarta: ['PlusJakartaSans', 'system-ui', 'sans-serif'],
      },
    },
  },
  presets: [nativewind],
};


