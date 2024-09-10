const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      backgroundColor: {
        black: '#02050a',
        deepNavy: '#141c25',
        nightfall: '#08101a',
        mintGreen: '#55e6a5',
        silverGray: '#a2a2a2',
        charcoal: '#222831',
      },
      textColor: {
        black: '#02050a',
        deepNavy: '#141c25',
        nightfall: '#08101a',
        mintGreen: '#55e6a5',
        silverGray: '#a2a2a2',
        charcoal: '#222831',
      },
      zIndex: {
        2: '2',
      },
      width: {
        '15p': '15%',
      },
      borderColor: {
        charcoal: '#222831',
      },
      padding: {
        '16p': '15%',
        '100p': '100%',
        'wrapper-padding': '2rem',
        'section-padding-space': '5rem',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'pulse-scale': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
      screens: {
        xl: '1280px',
      },
      translate: {
        '120p': '120%',
      },
      animation: {
        'pulse-scale': 'pulse-scale 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
