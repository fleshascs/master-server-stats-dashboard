const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');
const cfg = require('./site.config');

const nextConfig = {
  env: cfg,
  images: {
    disableStaticImages: true
  },
  basePath: cfg.basePath
};

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        // optimisation disabled by default, to enable check https://github.com/cyrilwanner/next-optimized-images
        optimizeImages: false
      }
    ]
  ],
  nextConfig
);
