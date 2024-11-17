/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#0F0B1A', // Deep purple-black
          lighter: '#1A1625', // Slightly lighter purple-black
          card: '#1E1A2E',   // Card background
          accent: '#2D2640', // Purple accent
        },
        purple: {
          light: '#B794F4',
          DEFAULT: '#9F7AEA',
          dark: '#805AD5',
        },
        accent: {
          blue: '#4299E1',
          green: '#48BB78',
          yellow: '#ECC94B',
          pink: '#ED64A6',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-purple': 'linear-gradient(135deg, #2D2640 0%, #1A1625 100%)',
        'gradient-glow': 'radial-gradient(circle at top, rgba(157, 122, 234, 0.15) 0%, rgba(15, 11, 26, 0) 70%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(157, 122, 234, 0.15)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  plugins: [],
};