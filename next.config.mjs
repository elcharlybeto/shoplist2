/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

import nextPWA from 'next-pwa';

export const withPWA = nextPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
  });
  
//   module.exports = withPWA({
//     reactStrictMode: true,
//   });
