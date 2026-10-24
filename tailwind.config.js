/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAF9F6',
        page: '#FFFFFF',
        ink: {
          DEFAULT: '#272927',
          muted: '#6D706D',
          faint: '#9CA19C',
        },
        forest: {
          DEFAULT: '#3D5C42',
          light: '#5C7D62',
          dark: '#2A4230',
          pale: '#E8EDE7',
        },
        dusty: {
          DEFAULT: '#6B8CA8',
          light: '#9AB3C9',
          pale: '#E4ECF2',
        },
        mustard: {
          DEFAULT: '#C89B3F',
          light: '#DDB968',
          pale: '#F5EDD8',
        },
        terracotta: {
          DEFAULT: '#B5683E',
          light: '#D08A60',
          pale: '#F0E2D6',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'soft-zoom': 'softZoom 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        softZoom: {
          '0%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
