/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  important: true,
  theme: {
    extend: {
      fontFamily: {
        'cormorant-unicase': ['Georgia', 'sans-serif']
      },
      colors: {
        hram: {
          'light-6': '#FFFFFF',
          'light-5': '#F4F2F2',
          'light-4': '#DFD5D7',
          'light-3': '#D3C1BD',
          'light-2': '#C0A19B',
          'light-1': '#A70D20',
          DEFAULT: '#78101D',
          'dark-1': '#4B040D',
          'dark-2': '#31191F',
          'dark-3': '#221115',
          'dark-4': '#000000'
        }
      },
      screens: {
        sm: '320px',
        md: '640px',
        laptop: '1300px'
      },
      fontSize: {
        '2sm': '0.750rem'
      }
    }
  },
  plugins: [typography]
}
