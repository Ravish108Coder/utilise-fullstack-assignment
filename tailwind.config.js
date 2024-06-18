/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  options: {
      safelist: [
        'grid-rows-3',
        'grid-cols-4',
        'max-h-[300px]',
        'max-w-[400px]',
        // Add more dynamic class names here as needed
      ],
    }
}

