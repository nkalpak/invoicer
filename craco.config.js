const webpack = require("webpack");

module.exports = {
  eslint: {
    enable: false,
  },
  webpack: {
    configure(webpackConfig) {
      // eslint-disable-next-line no-param-reassign
      webpackConfig.resolve.fallback = {
        process: require.resolve("process/browser"),
        zlib: require.resolve("browserify-zlib"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util"),
        buffer: require.resolve("buffer"),
        asset: require.resolve("assert"),
      };
      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: "process/browser.js",
          Buffer: ["buffer", "Buffer"],
        })
      );
      return webpackConfig;
    },
  },
};
