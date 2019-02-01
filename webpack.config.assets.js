const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const webpackAssets = require('./webpack/webpack.assets');

const devSettings = {
  devtool: 'cheap-module-eval-source-map',
};

module.exports = merge(webpackConfig, devSettings, webpackAssets);
