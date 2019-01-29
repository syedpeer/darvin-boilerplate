const path = require('path');
const merge = require('webpack-merge');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackConfig = require('./webpack.config');
const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');

module.exports = merge(webpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname),
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets/images/renditions/**/*.{png,gif,jpg,svg}',
      to: 'images/',
      flatten: true,
    }], {}),
    new SVGSpritemapPlugin({
      src: path.resolve(__dirname, 'src/assets/images/icons/**/*.svg'),
      styles: path.resolve(__dirname, 'src/styles/tools/_svg-sprite.scss'),
      filename: 'images/sprites/svg-sprite.svg',
      gutter: 3,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    })
  ]
});
