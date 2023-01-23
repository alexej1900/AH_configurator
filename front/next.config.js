module.exports = {
  distDir: 'build',
  reactStrictMode: true,
  images: {
    domains: ['configurator', 'staging.immokonfigurator.ch'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    },);

    return config;
  }
}
