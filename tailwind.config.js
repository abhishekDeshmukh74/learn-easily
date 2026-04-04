/** @type {import('tailwindcss').Config} */

function varColor(name) {
  return `rgb(var(--${name}) / <alpha-value>)`;
}

function colorScale(prefix, shades) {
  return Object.fromEntries(shades.map((s) => [s, varColor(`${prefix}-${s}`)]));
}

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: colorScale('gray', [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]),
        primary: colorScale('primary', [300, 400, 500, 600]),
        accent: colorScale('accent', [400, 500]),
        green: colorScale('green', [400, 500]),
        purple: colorScale('purple', [400, 500]),
        red: { 400: varColor('red-400') },
      },
    },
  },
  plugins: [],
}
