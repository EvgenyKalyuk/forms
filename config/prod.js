import path from 'path';
import webpack from 'webpack';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export const prodConfig = {
  entry: {
    app: [
      'babel-polyfill',
      path.join(__dirname, '..', 'src', 'bootstrap.jsx')
    ],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: true,
              presets: [
                'env', 'react'
              ],
              plugins: [
                'syntax-dynamic-import',
                'transform-decorators-legacy',
                'transform-class-properties',
                'transform-object-rest-spread'
              ]
            }
          }
        ]
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'stylus-loader'
            }
          ]
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new ProgressPlugin((percentage, msg) => {
      const percents = percentage * 100;
      const percentageFormatted = String(percents).split('.').length > 1 ? (percents).toFixed(2) : percents;
      if (percentageFormatted % 5 === 0) {
        console.log(`${percentageFormatted}% ${msg}`);
      }
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
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
  ]
};