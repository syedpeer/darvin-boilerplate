const merge = require('webpack-merge');

const config = require('./settings/config');
const css = require('./settings/css');
const js = require('./settings/babel');
const fonts = require('./settings/fonts');
const images = require('./settings/images');
const modernizr = require('./settings/modernizr');
const nunjucks = require('./settings/nunjucks');
const vue = require('./settings/vue');

module.exports = merge(js, css, config, fonts, images, modernizr, nunjucks, vue);
