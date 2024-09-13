/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  theme: {
    extend: { fontFamily: { roboto: ['Roboto', 'sans-serif'] } }
  },
  plugins: [typography]
}
