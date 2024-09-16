/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  theme: {
    extend: {
      fontFamily: {
        'cormorant-unicase': ['Cormorant Unicase', 'sans-serif']
      }
    }
  },
  plugins: [typography]
}
