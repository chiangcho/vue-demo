let webpack = require("webpack");
module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete("prefetch").delete("preload");
  },
  configureWebpack: {
    externals: {
      jquery: "jQuery",
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        maxInitialRequests: Infinity,
        minSize: 1000,
      },
    },
    plugins: [
      //   new webpack.ProvidePlugin({
      //     $: "jquery",
      //     jQuery: "jquery",
      //     "window.jQuery": "jquery",
      //   }),
    ],
  },
};
