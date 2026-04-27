/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = path.resolve(__dirname, 'app');
    config.resolve.modules.push(path.resolve('./'));
    return config;
  },
};

module.exports = nextConfig;