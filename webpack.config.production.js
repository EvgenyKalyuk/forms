const webpack = require('webpack');
const config = require('./webpack.config');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

config.module.rules.push({
  test: /\.styl$/,
  exclude: /node_modules/,
  use: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: true,
        },
      },
      {
        loader: 'stylus-loader',
      },
    ],
  }),
});

config.plugins.push(
  new ExtractTextPlugin('css/[name].css'),
  new ProgressPlugin((percentage, msg) => {
    const percents = percentage * 100;
    const percentageFormatted = String(percents).split('.').length > 1 ? (percents).toFixed(2) : percents;
    if (percentageFormatted % 5 === 0) {
      console.log(`${percentageFormatted}% ${msg}`);
    }
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    unused: true,
    drop_debugger: true, // eslint-disable-line camelcase
    drop_console: true, // eslint-disable-line camelcase
    compress: {
      warnings: false,
      comparisons: false,
    },
    output: {
      comments: false,
      ascii_only: true,
    },
    sourceMap: false,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
);

module.exports = config;
