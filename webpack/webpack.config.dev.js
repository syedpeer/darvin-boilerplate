const merge = require('webpack-merge');

const webpackConfig = require('../webpack.config');
const config = require('./settings/config');
const css = require('./settings/css');
const js = require('./settings/babel');
const fonts = require('./settings/fonts');
const images = require('./settings/images');
const browserSync = require('./settings/browsersync');
const modernizr = require('./settings/modernizr');
const nunjucks = require('./settings/nunjucks');
const vue = require('./settings/vue');

const settings = {
  devtool: 'cheap-module-eval-source-map',
};

module.exports = merge(webpackConfig, settings, js, css, config, fonts, images, modernizr, nunjucks, vue, browserSync);
