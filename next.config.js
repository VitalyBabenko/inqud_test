/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['www.datocms-assets.com'],
  },
};
const withNextIntl = require('next-intl/plugin')('./src/config.ts');

module.exports = withNextIntl(nextConfig);
