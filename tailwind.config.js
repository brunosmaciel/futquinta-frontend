/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  daisyui: {
    themes: [
      {
        appTheme: {
          primary: '#1B8325',
          secondary: '#85eaa2',
          accent: '#7cc94c',
          neutral: '#1C2632',
          'base-100': '#1C2632',
          info: '#A9DCEA',
          success: '#15B751',
          warning: '#B07311',
          error: '#FC222D',
        },
      },
      'dark',
    ],
  },
  plugins: [require('daisyui')],
};
