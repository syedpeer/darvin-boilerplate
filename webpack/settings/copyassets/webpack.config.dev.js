const CopyWebpackPlugin = require('copy-webpack-plugin');
const basePath = process.cwd();

module.exports = {
  plugins: [
    new CopyWebpackPlugin([{
      from: basePath + '/src/templates/**/*.md',
      to: '/',
      flatten: false,
      transformPath (targetPath) {
        return targetPath.split('/src/templates/')[1];
      }
    },
    {
      from: basePath + '/src/templates/**/*[!.preview].njk',
      to: '/',
      flatten: false,
      transformPath (targetPath) {
        return targetPath.split('/src/templates/')[1];
      }
    },
    {
      from: basePath + '/favicon.ico',
      to: '/',
      flatten: false,
      transformPath (targetPath) {
        return targetPath.split('/src/templates/')[1];
      }
    },
    {
      from: basePath + '/src/assets/images/renditions/**/*.{png,gif,jpg,svg}',
      to: 'images/',
      flatten: true,
    }], {})
  ],
};

