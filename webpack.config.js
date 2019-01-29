const path = require('path');
const glob = require('glob');

const basePath = process.cwd();
const isDev = (process.env.NODE_ENV === 'dev');

const {
  VueLoaderPlugin,
} = require('vue-loader');

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const RunOncePlugin = require('run-once-plugin');
const nunjucksContext = require('./src/templates/config/index');
const nunjucksDevConfig = require('./src/templates/config/config.dev.json');
const nunjucksProdConfig = require('./src/templates/config/config.prod.json');

nunjucksContext.config = (isDev) ? nunjucksDevConfig : nunjucksProdConfig;

const nunjucksOptions = JSON.stringify({
  searchPaths: `${basePath}/src/templates/`,
  context: nunjucksContext,
});

const htmlTemplates = nunjucksContext.htmlTemplates;


const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap({
  entry: {
    'js/main': ['./src/js/base.js', './src/templates/modules/m03-demo/main.js'],
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
  module: {
    rules: [{
      test: /\.(config.js)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'js/',
        },
      }],
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]',
        },
      },
      {
        loader: 'image-webpack-loader',
        options: {
          mozjpeg: {
            progressive: true,
            quality: 65,
          },
          // optipng.enabled: false will disable optipng
          optipng: {
            enabled: false,
          },
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
          gifsicle: {
            interlaced: false,
          },
          // the webp option will enable WEBP
          webp: {
            quality: 75,
          },
        },
      },
      ],
    },
    {
      test: /\.(njk|nunjucks)$/,
      loader: ['html-loader', `${path.resolve('src/js/libs/nunjucks-webpack.js')}?${nunjucksOptions}`],
    },
    {
      test: /modernizrrc\.js$/,
      loader: 'expose-loader?Modernizr!webpack-modernizr-loader',
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader?cacheDirectory',
      },
    },
    {
      test: /\.(css|sass|scss)$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 2,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
                require('autoprefixer'), // eslint-disable-line
          ],
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
      ],
    },
    {
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/',
        },
      }],
    },
    ],
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
    ...htmlTemplates,
    new VueLoaderPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new WebpackNotifierPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css',
    }),
  ],
  watchOptions: {
    aggregateTimeout: 300,
    ignored: ['**/*.woff', '**/*.woff2', '**/*.jpg', '**/*.png', '**/*.svg', 'node_modules'],
  },
});

module.exports = webpackConfig;
