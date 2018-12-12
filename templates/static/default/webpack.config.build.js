const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
    }]
  }
});
