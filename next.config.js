/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        //  pathname: '/account123/**',
      },
      {
        protocol: 'http',
        hostname: 'uhdtv.io',
        port: '',
        //  pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'mango.blender.org',
        port: '',
        //  pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'download.blender.org',
        port: '',
        //  pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig