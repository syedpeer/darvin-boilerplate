const path = require('path'),
      basePath = process.cwd(),
      glob = require('glob'),
      isDev = (process.env.NODE_ENV === 'development') ? true : false;

const { VueLoaderPlugin } = require('vue-loader'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
      FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'),
      WebpackNotifierPlugin = require('webpack-notifier'),
      SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin'),
      nunjucksContext = require('./src/data/index'),
      nunjucksDevConfig = require('./src/html/config.dev.json'),
      nunjucksProdConfig = require('./src/html/config.prod.json');


nunjucksContext.config = (isDev) ? nunjucksDevConfig : nunjucksProdConfig;

const nunjucksOptions = JSON.stringify({
  searchPaths: basePath + '/src/html/',
  context: nunjucksContext
});

const pages = glob.sync('**/*.njk', {
  cwd: path.join(basePath, 'src/html/pages/'),
  root: '/',
}).map(page => new HtmlWebpackPlugin({
  filename: page.replace('njk', 'html'),
  template: `src/html/pages/${page}`,
}));


module.exports = {
  entry: { main: './src/assets/scripts/main.js' },
  output: {
    devtoolLineToLine: true,
    sourceMapFilename: 'js/main.js.map',
    path: path.resolve(__dirname, 'dist'),
    pathinfo: true,
    filename: 'js/main.js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.(config.js)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'js/'
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]?[hash]'
            }
          },
          {
            loader: 'img-loader',
            options: {
              enabled: !isDev
            }
          }
        ]
      },
      {
        test: /\.(njk|nunjucks)$/,
        loader: ['html-loader', `nunjucks-html-loader?${nunjucksOptions}`]
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
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          { loader: 'css-loader', options: { sourceMap: true, importLoaders: 2 } },
          {
            loader: 'postcss-loader',
            options: {
                plugins: () => [
                    require('autoprefixer')
                ],
                sourceMap: true
            }
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: '/fonts/'
            }
        }]
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, 'node_modules'), path.join(__dirname, 'spritesmith-generated')],
    extensions: ['.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
      ...pages,
      new VueLoaderPlugin(),
      new FriendlyErrorsWebpackPlugin(),
      new WebpackNotifierPlugin(),
      new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname)
      }),
      new CopyWebpackPlugin([
        {
          from: 'src/assets/images/renditions/**/*.{png,gif,jpg,svg}',
          to: 'images/',
          flatten: true
        }
      ], {}),
      new SVGSpritemapPlugin({
          src: path.resolve(__dirname, 'src/assets/images/icons/**/*.svg'),
          styles: path.resolve(__dirname, 'src/assets/styles/tools/_svg-sprite.scss'),
          filename: 'images/sprites/svg-sprite.svg',
          gutter: 3
      }),
      new MiniCssExtractPlugin({
          filename: "css/styles.css",
      }),
      new BrowserSyncPlugin({
        /* proxy: 'https://cms.local', */
        server: {
          baseDir: ['dist'],
          directory: true
        },
        port: 1712,
        files: ["css/*.css", "js/*.js", "**/*.njk"],
        open: true,
        https: true,
        notify: false,
        logConnections: true,
        reloadOnRestart: true,
        injectChanges: true,
        online: true,
        ghostMode: {
          clicks: false,
          forms: false,
          scroll: false
        }
      })
  ],
  watchOptions: {
    aggregateTimeout: 300
  }
};
