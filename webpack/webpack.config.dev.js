const merge = require('webpack-merge');

const webpackConfig = require('../webpack.config');

const config = require('./settings/config/webpack.config.dev');
const css = require('./settings/sass/webpack.config.dev');
const js = require('./settings/babel/webpack.config.dev');
const fonts = require('./settings/fonts/webpack.config.dev');
const images = require('./settings/images/webpack.config.dev');
const browserSync = require('./settings/browsersync/webpack.config.dev');
const modernizr = require('./settings/modernizr/webpack.config.dev');
const nunjucks = require('./settings/nunjucks/webpack.config.dev');
const vue = require('./settings/vue/webpack.config.dev');

const settings = {
  devtool: 'cheap-module-eval-source-map',
};

module.exports = merge(webpackConfig, settings, js, css, config, fonts, images, modernizr, nunjucks, vue, browserSync);
