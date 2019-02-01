module.exports = {
  module: {
    rules: [
      {
        test: /modernizrrc\.js$/,
        loader: 'expose-loader?Modernizr!webpack-modernizr-loader',
      },
    ]
  },
};
