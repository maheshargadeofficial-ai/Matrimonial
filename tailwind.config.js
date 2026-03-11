/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['IBM Plex Sans', 'sans-serif']
      },
      colors: {
        primary: {
          DEFAULT: '#3A5A40',
          foreground: '#FFFFFF'
        },
        secondary: {
          DEFAULT: '#D08C60',
          foreground: '#FFFFFF'
        },
        background: {
          light: '#F9F7F2',
          dark: '#121212'
        },
        surface: {
          light: '#FFFFFF',
          dark: '#1E1E1E'
        },
        text: {
          primary: '#1A2F25',
          secondary: '#4A5D55',
          light: '#FFFFFF'
        },
        accent: {
          success: '#2D6A4F',
          warning: '#E9C46A',
          error: '#E63946'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
