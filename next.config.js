/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    JWT: process.env.JWT,
    PROD_URL: process.env.PROD_URL,
    DEV_URL: process.env.DEV_URL,
  },
  images: {
    domains: ['ui-avatars.com', 'res.cloudinary.com'],
  },
};
