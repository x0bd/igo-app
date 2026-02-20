/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'cimas-blue': '#003399',
        'igo-green': '#4CAF50',
        'accent': '#FF9800',
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
      },
      fontFamily: {
        'sans': ['PlusJakartaSans'],
      },
    },
  },
  plugins: [],
}

