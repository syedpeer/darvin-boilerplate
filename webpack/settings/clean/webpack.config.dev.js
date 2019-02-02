const CleanWebpackPlugin = require('clean-webpack-plugin');

const basePath = process.cwd();

module.exports = {
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: basePath,
    }),
  ],
};

