module.exports = {
  module: {
    rules: [
      {
        test: /\.(config.js)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'js/',
          },
        }],
      },
    ]
  },
};
