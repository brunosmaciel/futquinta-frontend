/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    REBUILD_PLAYER_PROFILE_HOOK: process.env.REBUILD_PLAYER_PROFILE_HOOK,
  },
  images: {
    domains: [
      'ui-avatars.com',
      'res.cloudinary.com',
      'picsum.photos',
      'instagram.fpoa37-1.fna.fbcdn.net',
    ],
  },
};
