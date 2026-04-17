/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Добавляем резолвинг для server-side тоже (убран if (!isServer))
    config.resolve.alias['@'] = path.resolve(__dirname, 'app');
    config.resolve.modules.push(path.resolve('./'));
    return config;
  },
};

module.exports = nextConfig;