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
        'hover-gray': '#6B7280', // Пользовательский цвет для text-hover-gray
        'custom-gray': '#D1D5DB', // Пользовательский цвет для focus:ring-custom-gray
      },
      backgroundColor: {
        'custom-bg': '#f0f0f0', // Пользовательский цвет фона для input
      },
      maxWidth: {
        577: '577px', // Пользовательское значение для max-w-[577px]
      },
      gap: {
        3.5: '0.875rem', // gap-3.5, уточнение значения (уже есть в Tailwind)
      },
    },
  },
  plugins: [],
}
