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
        footerTextColor: '#9bc25b',
        footerSubscribeBg: '#ff5722',
        footerBoxColor: '#727272',
        footerProfileNameColor: '#000000',
        footerBackgroundColor: '#f9f9f9',
        footerLinkedinHoverColor: '#0072B1',
        navSignupButton: '#F4743B',
        navSignupButtonWhite: '#ffffff',
        borderColor: '#D9D9D9',

        primary: 'var(--primary)', //white
        'primary-dark': 'var(--primary-dark)', //black #0D0D0D   #1E1E1E
        'secondary-light': 'var(--secondary-light)', //light gray #e5e7eb
        'secondary-dark': 'var(--secondary-dark)', //dark gray
        'brand-primary': 'var(--brand-primary)', //orange
        'brand-secondary': 'var(--brand-secondary)', //green
        'brand-secondary-light': 'var(--brand-secondary-light)', // light green
        'brand-secondary-light-95': 'var(--brand-secondary-light-95)', // light green
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
    },
  },
  darkMode: 'class',
  // eslint-disable-next-line no-undef
  plugins: [require('tailwind-scrollbar')],
};
