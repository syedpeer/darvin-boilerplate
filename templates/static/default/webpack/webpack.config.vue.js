const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

const {
  VueLoaderPlugin
} = require('vue-loader');

module.exports = merge(webpackConfig, {
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
});
