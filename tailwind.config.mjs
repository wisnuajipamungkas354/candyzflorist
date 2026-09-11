/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        floral: {
          pink: {
            50: '#FDF5F7',
            100: '#FCEBF0',
            200: '#F9D5E1',
            300: '#F4B0C7',
            400: '#EC82A6',
            500: '#E05785',
            600: '#CA386B',
            700: '#A92654',
            DEFAULT: '#F4B0C7',
          },
          gold: {
            50: '#FFFDF5',
            100: '#FFFBEA',
            200: '#FEF3C7',
            300: '#FDE68A',
            400: '#FACC15',
            500: '#EAB308',
            600: '#CA8A04',
            DEFAULT: '#D4AF37',
          },
          cream: '#FCF9F6',
          warm: '#F7F3EE',
          dark: '#2E2628',
          muted: '#76676A',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 10px 30px -5px rgba(224, 87, 133, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.03)',
        'soft-lg': '0 20px 40px -10px rgba(224, 87, 133, 0.12), 0 8px 20px -4px rgba(0, 0, 0, 0.04)',
        'gold': '0 10px 25px -5px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}
