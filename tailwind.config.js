/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ink': '#1a1a1a',
        'paper': '#fffbf7',
        'accent': {
          DEFAULT: '#c45d3a',
          light: '#fff5f0',
          dark: '#a04a2d',
        },
        'muted': '#7a7a7a',
        'border': '#e8e4e0',
        'warm': {
          50: '#fffbf7',
          100: '#fff5f0',
          200: '#ffe8dc',
          300: '#ffd4c4',
          400: '#f5b8a0',
          500: '#d4826a',
          600: '#c45d3a',
          700: '#a04a2d',
          800: '#7a3820',
          900: '#5a2a18',
        },
        'gray': {
          50: '#fafaf8',
          100: '#f5f4f2',
          200: '#e8e4e0',
          300: '#d6d2cc',
          400: '#a8a4a0',
          500: '#7a7a7a',
          600: '#5c5c5c',
          700: '#404040',
          800: '#262626',
          900: '#1a1a1a',
        },
      },
      fontFamily: {
        'display': ['Syne', 'sans-serif'],
        'body': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        'warm': '0 10px 40px -10px rgba(196, 93, 58, 0.2)',
        'warm-lg': '0 20px 60px -15px rgba(196, 93, 58, 0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100%)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
