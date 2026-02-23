/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      bold: ['BlinkerBold'],
      sans: ['Blinker', 'Arial', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      display: ['BlackOpsOne', 'Oswald'],
    },
    extend: {
      colors: {
        primary: 'var(--primary)', //white
        'primary-dark': 'var(--primary-dark)', //black
        secondary: 'var(--secondary)', //gray
        'secondary-light': 'var(--secondary-light)', //light gray #e5e7eb
        'secondary-dark': 'var(--secondary-dark)', //dark gray
        'brand-primary': 'var(--brand-primary)', //orange
        'brand-secondary': 'var(--brand-secondary)', //green
        'brand-secondary-dark': 'var(--brand-secondary-dark)', //dark green
        'brand-secondary-light': 'var(--brand-secondary-light)', // light green
        'brand-secondary-light-95': 'var(--brand-secondary-light-95)', // light green
        'brand-third': 'var( --brand-third)', // blue
        // 'brand-secondary-light':
        //   'rgb(from var(--brand-secondary-light) r g b / <alpha-value>)',
        'border-color': 'var(--border-color)', //gray
        'outline-color': 'var(--outline-color)', //light gray
        'backdrop-color': 'var(--backdrop-color)', //black with opacity
        'error-color': 'var(--error-color)', //red
      },

      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        // 'fade-out': {
        //   '0%': { opacity: '1' },
        //   '100%': { opacity: '0' },
        // },
      },

      animation: {
        'fade-in': 'fade-in 0.3s ease-in forwards',
        // 'fade-out': 'fade-out 0.3s ease-out forwards',
      },

      dropShadow: {
        white: '0 0 8px rgba(255, 255, 255, 1)',
      },
    },
  },
  darkMode: 'class',
  // eslint-disable-next-line no-undef
  plugins: [require('tailwind-scrollbar')],
};
