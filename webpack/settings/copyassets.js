const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/assets/images/renditions/**/*.{png,gif,jpg,svg}',
      to: 'images/',
      flatten: true,
    }], {})
  ],
};

