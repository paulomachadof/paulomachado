/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/projects',
        destination: '/blog',
      },
      {
        source: '/projects/:slug',
        destination: '/blog/:slug',
      },
    ]
  },
}

module.exports = nextConfig
