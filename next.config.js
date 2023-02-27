/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  env: {
    API_BASE_URL: process.env.API_BASE_URL,
    PORT: process.env.PORT
  }
}

module.exports = nextConfig
