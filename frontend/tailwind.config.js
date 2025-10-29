/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nima-pink': '#E8B4D9',
        'nima-purple': '#9B59B6',
        'nima-teal': '#006B7D',
        'nima-orange': '#FF6B4A',
        'nima-light-blue': '#E8F4F8',
      },
    },
  },
  plugins: [],
}
