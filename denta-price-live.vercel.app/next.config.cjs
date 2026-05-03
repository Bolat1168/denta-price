/** @type {import('next').NextConfig} */
const WebpackObfuscator = require('webpack-obfuscator');

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  webpack: (config, { dev, isServer }) => {
    // Применяем обфускацию только в production-сборке и только для клиентской части
    if (!dev && !isServer) {
      config.plugins.push(
        new WebpackObfuscator(
          {
            compact: true,
            controlFlowFlattening: true,
            controlFlowFlatteningThreshold: 0.75,
            deadCodeInjection: true,
            deadCodeInjectionThreshold: 0.4,
            debugProtection: true,
            debugProtectionInterval: 2000,
            disableConsoleOutput: true,
            identifierNamesGenerator: 'hexadecimal',
            numbersToExpressions: true,
          },
          []
        )
      );
    }
    return config;
  },
};

module.exports = nextConfig;