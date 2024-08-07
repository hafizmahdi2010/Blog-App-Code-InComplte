/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#2C2C2E',
        'secondary-bg': '#3A3A3C',
        'primary-text': '#FFFFFF',
        'secondary-text': '#A3A3A3',
        'accent': '#00AEEF',
        'highlight': '#39FF14',
        'border': '#5A5A5C',
        'button-bg': '#00AEEF',
        'button-text': '#FFFFFF',
        'error': '#DC143C',
      },
    },
  },
  plugins: [],
}
