/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nextjswp.dreamhosters.com'
      }
    ]
  }
}

module.exports = nextConfig
