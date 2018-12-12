const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

module.exports = merge(webpackConfig, {
  plugins: [
    new SVGSpritemapPlugin({
      src: path.resolve(__dirname, 'src/assets/images/icons/**/*.svg'),
      styles: path.resolve(__dirname, 'src/assets/styles/tools/_svg-sprite.scss'),
      filename: 'images/sprites/svg-sprite.svg',
      gutter: 3
    })
  ]
});
