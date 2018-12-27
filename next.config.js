// next.config.js
const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const withSass = require("@zeit/next-sass");

const nextConfig = {
  webpack: config => {
    config.node = {
      fs: "empty",
      modules: false
    };

    return config;
  }
};

module.exports = withPlugins([withCSS, withSass], nextConfig);
