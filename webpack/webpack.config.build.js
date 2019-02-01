const path = require('path');
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

const settings = {
  entry: {
    'js/main': ['./src/js/base.js', './src/templates/modules/m02-accordion/index.js', './src/templates/modules/m02-accordion/main.js',],
    'js/preview': ['./src/js/base.js', './src/js/preview.js'],
    'modules/m01-grid/m01-grid': ['./src/js/base.js', './src/js/preview.js'],
    'modules/m03-demo/m03-demo': ['./src/js/base.js', './src/templates/modules/m03-demo/index.js', './src/templates/modules/m03-demo/main.js', './src/js/preview.js'],
    'modules/m02-accordion/m02-accordion': ['./src/js/base.js', './src/templates/modules/m02-accordion/index.js', './src/templates/modules/m02-accordion/main.js', './src/js/preview.js'],
  },
  output: {
    devtoolLineToLine: true,
    sourceMapFilename: '[name].[chunkhash].js.map',
    path: path.resolve(__dirname, 'dist'),
    pathinfo: false,
    filename: '[name].[chunkhash].js',
    chunkFilename: 'async/[name].chunk.js',
    publicPath: '/'
  },
  devtool: 'source-map',
};

module.exports = merge(webpackConfig, settings, js, css, config, fonts, images, modernizr, nunjucks, vue, sprites, analyzer);
