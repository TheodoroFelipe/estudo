/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig

module.exports = {
  typescript: {
    ignoreBuildErrors: true
  }
}

module.exports = {
  webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    // Important: return the modified config
    return config
  },
}