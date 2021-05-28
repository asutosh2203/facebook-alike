module.exports = {
  node: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      borderWidth: ['active'],
      borderColor: ['active'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
