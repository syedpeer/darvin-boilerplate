const path = require('path');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap({
  entry: {
    'js/main': ['./src/js/base.js', './src/templates/modules/m02-accordion/index.js', './src/templates/modules/m02-accordion/main.js',],
    'js/preview': ['./src/js/base.js', './src/js/preview.js'],
    'modules/m01-grid_row/m01-grid_row': ['./src/js/base.js', './src/js/preview.js'],
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
    publicPath: '/',
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new WebpackNotifierPlugin()
  ],
  watchOptions: {
    aggregateTimeout: 300,
    ignored: ['**/*.woff', '**/*.woff2', '**/*.jpg', '**/*.png', '**/*.svg', 'node_modules'],
  },
});

module.exports = webpackConfig;
