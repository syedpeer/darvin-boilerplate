const merge = require('webpack-merge');

const webpackConfig = require('../webpack.config');

const analyzer = require('./settings/analyzer/webpack.config.build');
const clean = require('./settings/clean/webpack.config.build');
const sprites = require('./settings/sprites/webpack.config.build');
const copyassets = require('./settings/copyassets/webpack.config.build');
const css = require('./settings/sass/webpack.config.build');
const fonts = require('./settings/fonts/webpack.config.build');

const settings = {
  devtool: 'cheap-module-eval-source-map',
};

module.exports = merge(webpackConfig, settings, analyzer, clean, sprites, copyassets, css, fonts);
