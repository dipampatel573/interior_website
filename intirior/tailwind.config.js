/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#151515',
          dark: '#0e0e0e',
          light: '#1e1e1e',
          surface: '#252525',
          muted: '#2a2a2a'
        },
        ivory: {
          DEFAULT: '#F5F1E8',
          light: '#FAF7F2',
          dark: '#EAE4D6',
          muted: '#D8CFBC'
        },
        bronze: {
          DEFAULT: '#A88B67',
          light: '#C2A785',
          dark: '#8B704F',
          muted: 'rgba(168, 139, 103, 0.2)'
        },
        warmWhite: '#FBF9F5',
        warmGray: '#8C8880'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cinzel"', '"Playfair Display"', 'serif']
      },
      letterSpacing: {
        widest: '0.25em',
        ultra: '0.35em'
      }
    },
  },
  plugins: [],
}
