/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        'hover-gray': '#6B7280',
        'custom-gray': '#D1D5DB',
      },
      backgroundColor: {
        'custom-bg': '#f0f0f0',
      },
      maxWidth: {
        577: '577px',
      },
      gap: {
        3.5: '0.875rem',
      },
    },
  },
  plugins: [],
}
