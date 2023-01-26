module.exports = {
  distDir: 'build',
  reactStrictMode: true,
  images: {
    domains: ['Konfigurator', 'ah.immokonfigurator.ch'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    },);

    return config;
  }
}
