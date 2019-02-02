const path = require('path');
const basePath = process.cwd();
const merge = require('webpack-merge');

const webpackConfig = require('../webpack.config');

const config = require('./settings/config/webpack.config.build');
const css = require('./settings/sass/webpack.config.build');
const js = require('./settings/babel/webpack.config.build');
const fonts = require('./settings/fonts/webpack.config.build');
const images = require('./settings/images/webpack.config.build');
const modernizr = require('./settings/modernizr/webpack.config.build');
const nunjucks = require('./settings/nunjucks/webpack.config.build');
const vue = require('./settings/vue/webpack.config.build');
const analyzer = require('./settings/analyzer/webpack.config.build');
const sprites = require('./settings/sprites/webpack.config.build');
const clean = require('./settings/clean/webpack.config.build');
const copy = require('./settings/copyassets/webpack.config.build');

const settings = {
  entry: require('./libs/create-entrys'),
  output: {
    devtoolLineToLine: true,
    sourceMapFilename: '[name].[chunkhash].js.map',
    path: path.resolve(basePath, 'dist'),
    pathinfo: false,
    filename: '[name].[chunkhash].js',
    chunkFilename: 'async/[name].chunk.js',
    publicPath: '/'
  },
  devtool: 'source-map',
};

module.exports = merge(webpackConfig, settings, js, css, config, clean, fonts, images, modernizr, nunjucks, vue, sprites, analyzer, copy);
