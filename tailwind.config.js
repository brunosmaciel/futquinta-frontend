/** @type {import('tailwindcss').Config} */

/**@reference */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  daisyui: {
    themes: [
      {
        aqua: {
          primary: '#000000',
          secondary: '#f5f5f4',
          accent: '#7cc94c',
          neutral: '#1C2632',
          'base-100': '#1C2632',
          info: '#A9DCEA',
          success: '#15B751',
          warning: '#B07311',
          error: '#FC222D',
        },
      },
      'light',
    ],
  },
  plugins: [require('daisyui')],
};
