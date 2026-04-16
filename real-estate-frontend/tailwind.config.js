/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          600: '#A7856F',
        },
      },
      boxShadow: {
        card: '0 18px 45px -24px rgba(15, 23, 42, 0.32)',
        'card-hover': '0 28px 60px -24px rgba(15, 23, 42, 0.42)',
      },
    },
  },
  plugins: [],
};
