const merge = require('webpack-merge');

const webpackConfig = require('../webpack.config');

const analyzer = require('./settings/analyzer');
const clean = require('./settings/clean');
const sprites = require('./settings/sprites');
const copyassets = require('./settings/copyassets');

const css = require('./settings/css');
const fonts = require('./settings/fonts');

const settings = {
  devtool: 'cheap-module-eval-source-map',
};

module.exports = merge(webpackConfig, settings, analyzer, clean, sprites, copyassets, css, fonts);
