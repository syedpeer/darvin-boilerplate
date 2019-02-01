const merge = require('webpack-merge');

const analyzer = require('./settings/analyzer');
const clean = require('./settings/clean');
const sprites = require('./settings/sprites');
const copyassets = require('./settings/copyassets');

const css = require('./settings/css');
const fonts = require('./settings/fonts');

module.exports = merge(analyzer, clean, sprites, copyassets, css, fonts);
