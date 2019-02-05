const path = require('path');
const basePath = process.cwd();

const merge = require('webpack-merge');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

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
const sprites = require('./settings/sprites/webpack.config.dev');
const clean = require('./settings/clean/webpack.config.dev');
const markdown = require('./settings/markdown/webpack.config.dev');
const copy = require('./settings/copyassets/webpack.config.dev');

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
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new WebpackNotifierPlugin()
  ],
  watchOptions: {
    aggregateTimeout: 300,
    ignored: ['**/*.woff', '**/*.woff2', '**/*.jpg', '**/*.png', '**/*.svg', 'node_modules'],
  },
};

module.exports = merge(webpackConfig, settings, clean, copy, js, css, config, fonts, images, modernizr, nunjucks, vue, browserSync, sprites, markdown);
