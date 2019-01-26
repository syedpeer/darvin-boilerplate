const path = require('path');
const glob = require('glob');

const basePath = process.cwd();
const isDev = (process.env.NODE_ENV === 'dev');

const {
  BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const {
  VueLoaderPlugin
} = require('vue-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const nunjucksContext = require('./src/templates/config/index');
const nunjucksDevConfig = require('./src/templates/config/config.dev.json');
const nunjucksProdConfig = require('./src/templates/config/config.prod.json');

nunjucksContext.config = (isDev) ? nunjucksDevConfig : nunjucksProdConfig;

const nunjucksOptions = JSON.stringify({
  searchPaths: `${basePath}/src/templates/`,
  context: nunjucksContext,
});

const htmlTemplates = glob.sync('**/*.preview.njk', {
  cwd: path.join(basePath, 'src/templates/'),
  root: '/'
}).map(page => {

    let chunk = 'js/main';

    // set specific chunk
    if(page.includes('modules/')||page.includes('components/')) {
      chunk = page.replace('.preview.njk', '');
    }

    return new HtmlWebpackPlugin({
      filename: page.replace('preview.njk', 'html'),
      template: `src/templates/${page}`,
      hash: true,
      cache: true,
      title: 'test',
      chunks: [chunk],
      templateParameters: {
        'foo': 'bar'
      }
    })
});


module.exports = {
  entry: {
    "js/main": ['./src/js/base.js', './src/templates/modules/m02-tabs/main.js', './src/templates/modules/m03-demo/main.js'],
    "modules/m01-grid_row/m01-grid_row": ['./src/js/base.js'],
    "modules/m02-tabs/m02-tabs": ['./src/js/base.js', './src/templates/modules/m02-tabs/index.js', './src/templates/modules/m02-tabs/main.js'],
    "modules/m03-demo/m03-demo": ['./src/js/base.js', './src/templates/modules/m03-demo/index.js', './src/templates/modules/m03-demo/main.js'],
    "components/c02-accordion/c02-accordion": ['./src/js/base.js', './src/templates/components/c02-accordion/index.js', './src/templates/components/c02-accordion/main.js']
  },
  output: {
    devtoolLineToLine: true,
    sourceMapFilename: '[name].[chunkhash].js.map',
    path: path.resolve(__dirname, 'dist'),
    pathinfo: true,
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
                quality: 65
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75
              }
            }
          },
        ],
      },
      {
        test: /\.(njk|nunjucks)$/,
        loader: ['html-loader', `nunjucks-html-loader?${nunjucksOptions}`],
      },
      {
        test: /modernizrrc\.js$/,
        loader: 'expose-loader?Modernizr!webpack-modernizr-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
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
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css',
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
  watchOptions: {
    aggregateTimeout: 300,
  },
};
