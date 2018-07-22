// webpack v4
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

module.exports = {
  entry: { main: './js/main.js' },
  output: {
    devtoolLineToLine: true,
    sourceMapFilename: 'main.js.map',
    path: path.resolve(__dirname, 'dist/js'),
    pathinfo: true,
    filename: 'main.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(config.js)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              outputPath: '../'
            }
          }
        ]
      },
      {
        test: /modernizrrc\.js$/,
        loader: 'expose-loader?Modernizr!webpack-modernizr-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
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
                outputPath: '../fonts/'
            }
        }]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
          test: /\.png$/,
          use: ['file-loader?name=i/[hash].[ext]']
      }
    ]
  },
  resolve: {
    modules: ["node_modules", "spritesmith-generated"]
},
  plugins: [
      new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname)
      }),
      new SVGSpritemapPlugin({
          src: path.resolve(__dirname, 'images/icons/**/*.svg'),
          styles: path.resolve(__dirname, 'styles/tools/_svg-sprite.scss'),
          filename: '../sprites/svg-sprite.svg',
          gutter: 3
      }),
      new SpritesmithPlugin({
          src: {
              cwd: path.resolve(__dirname, 'images/icons'),
              glob: '*.png'
          },
          target: {
              image: path.resolve(__dirname, 'dist/sprites/png-sprite.png'),
              css: path.resolve(__dirname, 'styles/tools/_png-sprite.scss')
          },
          apiOptions: {
              cssImageRef: "~png-sprite.png"
          }
      }),
      new MiniCssExtractPlugin({
          filename: "../css/styles.css",
      }),
      new BrowserSyncPlugin({
        /*proxy: 'https://cms.local',*/
        port: 8080,
        startPath: "/dist/templates",
        files: 'css/styles.css',
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
