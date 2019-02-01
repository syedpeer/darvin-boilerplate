const merge = require('webpack-merge');

const webpackConfig = require('./webpack.config');
const webpackDefault = require('./webpack/webpack.default');
const browserSync = require('./webpack/settings/browsersync');

const devSettings = {
  devtool: 'cheap-module-eval-source-map',
};

module.exports = merge(webpackConfig, devSettings, browserSync, webpackDefault);
