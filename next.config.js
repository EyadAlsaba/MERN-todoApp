/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/terms',
        destination: '/about',
        permanent: false,
      },
      {
        source: '/privacy',
        destination: '/about',
        permanent: false
      }
    ]
  },
}

module.exports = nextConfig
