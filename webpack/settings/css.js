const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const webpackConfig = {
  module: {
    rules: [
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
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.[contenthash].css',
    }),
  ]
};

module.exports = webpackConfig;
