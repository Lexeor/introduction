// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.html', './src/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '(var(--primary) / <alpha-value>)',
        secondary: '(var(--secondary) / <alpha-value>)',
        background: '(var(--background) / <alpha-value>)',
      },
    },
  },
  variants: {},
  plugins: [],
};
