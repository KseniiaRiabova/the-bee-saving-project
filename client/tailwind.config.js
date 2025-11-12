/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      // sans: ["ui-sans-serif", "system-ui"],
      // serif: ["ui-serif", "Georgia"],
      // mono: ["ui-monospace", "SFMono-Regular"],
      // display: ["Oswald"],
      // body: ["Blinker"],
      bold: ['BlinkerBold'],
      // blinker: ["BlinkerBold"],
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

        'primary-light': '#FFFFFF', //white
        'primary-dark': '#1E1E1E', //black
        'secondary-light': '#F8F8F8', //light gray #e5e7eb
        'secondary-dark': '#727272', //dark gray
        'brand-primary': '#F4743B', //orange
        'brand-secondary': '#9BC25B', //green
        'brand-secondary-light': '#D8E5C3', // light green
        'brand-secondary-dark': '#3D4D22', //dark green
        'border-color': '#ADAAAA', //gray
        'outline-color': '#D1D5DB', //light gray
      },
      fontSize: {
        '18px': '18px',
        '22px': '22px',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
