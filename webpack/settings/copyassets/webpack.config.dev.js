const CopyWebpackPlugin = require('copy-webpack-plugin');
const basePath = process.cwd();

module.exports = {
  plugins: [
    new CopyWebpackPlugin([{
      from: basePath + '/src/templates/modules/**/*.{md,json}',
      to: '/',
      flatten: false,
      transformPath (targetPath) {
        return targetPath.split('/src/templates/')[1];
      }
    },
    {
      from: basePath + '/src/templates/components/**/*.{md,json}',
      to: '/',
      flatten: false,
      transformPath (targetPath) {
        return targetPath.split('/src/templates/')[1];
      }
    },
    {
      from: basePath + '/src/templates/pages/**/*.{md,json}',
      to: '/',
      flatten: false,
      transformPath (targetPath) {
        return targetPath.split('/src/templates/')[1];
      }
    },
    {
      from: basePath + '/src/templates/modules/**/*[!.preview].njk',
      to: '/',
      flatten: false,
      transformPath (targetPath) {
        return targetPath.split('/src/templates/')[1];
      }
    },
    {
      from: basePath + '/src/templates/components/**/*[!.preview].njk',
      to: '/',
      flatten: false,
      transformPath (targetPath) {
        return targetPath.split('/src/templates/')[1];
      }
    },
    {
      from: basePath + '/src/templates/pages/**/*[!.preview].njk',
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

