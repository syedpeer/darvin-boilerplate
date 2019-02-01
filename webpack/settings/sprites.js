const path = require('path');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

module.exports = {
  plugins: [
    new SVGSpritemapPlugin({
      src: path.resolve(__dirname, 'src/assets/images/icons/**/*.svg'),
      styles: path.resolve(__dirname, 'src/styles/tools/_svg-sprite.scss'),
      filename: 'images/sprites/svg-sprite.svg',
      gutter: 3,
    }),
  ],
};

