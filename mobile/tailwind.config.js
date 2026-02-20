/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}',
    './app/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './screens/**/*.{js,ts,tsx}',
    './constants/**/*.{js,ts,tsx}',
    './utils/**/*.{js,ts,tsx}',
    './types/**/*.{js,ts,tsx}',
    './services/**/*.{js,ts,tsx}',
    './data/**/*.{js,ts,tsx}',
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Cimas Brand Colors
        'cimas-blue': '#003399',
        'cimas-yellow': '#FFD600',
        'cimas-white': '#FFFFFF',
        'cimas-off-white': '#F8F9FA',
        
        // Semantic Colors (for nutrition data)
        'protein': '#AF52DE',
        'carbs': '#FF9500',
        'fat': '#34C759',
        'health-score': '#007AFF',
      },
      borderRadius: {
        'xs': '8px',
        'sm': '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '28px',
        '2xl': '32px',
        '3xl': '40px',
        'full': '9999px',
      },
      fontFamily: {
        'sans': ['PlusJakartaSans'],
      },
    },
  },
  plugins: [],
};
