/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
export default {
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('children', '&>*')
    })
    //require('tailwind-scrollbar')({ nocompatible: true })
  ]
}
