/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      colors: {
        accent: {
          DEFAULT: '#f91460',
          dark: '#80032d',
          muted: '#17032c',
        },
      },
      animation: {
        blob: 'blob 8s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        blob: {
          '0%,100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '25%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '50%': { borderRadius: '50% 50% 30% 70% / 30% 70% 50% 50%' },
          '75%': { borderRadius: '70% 30% 50% 50% / 60% 40% 60% 40%' },
        },
      },
    },
  },
  plugins: [],
}
