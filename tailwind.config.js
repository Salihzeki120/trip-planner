/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: '#03391c',
      secondary: '#f8f5f0',
      accent: '#e19233',
      'primary-button': '#0a964c',
      'secondary-button': '#ccdbd3',
    },
  },
  plugins: [],
}
