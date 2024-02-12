/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.nextjswp.com'
      },
      {
        protocol: 'https',
        hostname: '**.gravatar.com'
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
}

module.exports = nextConfig
