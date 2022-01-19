const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  env: {
    // apiUrl: 'http://localhost:4567'
    apiUrl: 'https://fleshas.lt'
  },
  images: {
    disableStaticImages: true
  },
  basePath: process.env.NODE_ENV == 'production' ? '/amxbans/stats' : ''
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
