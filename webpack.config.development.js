const webpack = require('webpack');
const config = require('./webpack.config');

config.devtool = 'cheap-eval-source-map';
config.devServer = {
  hot: true,
  port: 3000,
  historyApiFallback: true,
  contentBase: config.output.path,
};
config.watch = true;
config.watchOptions = {
  poll: 500,
};
config.module.rules.push({
  test: /\.styl$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
    },
    {
      loader: 'stylus-loader',
    },
  ],
});

config.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.LoaderOptionsPlugin({
    options: {
      eslint: {
        failOnWarning: false,
        failOnError: false,
        fix: false,
        quiet: false,
      },
    },
  }),
);

module.exports = config;

