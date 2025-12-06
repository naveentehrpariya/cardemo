/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary: '#222',
        secondary: '#181818',
        accent: '#fbbc06',
        light: '#f4eeee',
        gray: {
          DEFAULT: '#8a8888',
          dark: '#736e6e',
          light: '#faf7f7',
        },
      },
      fontFamily: {
        helvetica: ['var(--font-helvetica)', 'Arial', 'sans-serif'],
        eurostile: ['var(--font-eurostile)', 'Arial', 'sans-serif'],
        lato: ['var(--font-lato)', 'sans-serif'],
      },
      fontSize: {
        'xs': '11px',
        'sm': '13px',
        'base': '15px',
        'lg': '18px',
        'xl': '22px',
        '2xl': '30px',
        '3xl': '38px',
        '4xl': '40px',
        '5xl': '50px',
        '6xl': '60px',
        '7xl': '70px',
      },
      backdropBlur: {
        xs: '10px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
    },
  },
  plugins: [],
};
