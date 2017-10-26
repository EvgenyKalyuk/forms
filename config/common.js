import path from 'path';
import webpack from 'webpack';
import {NODE_ENV} from '../bin/env-config';

export const commonConfig = {
  output: {
    publicPath: '/',
    path: path.join(__dirname, '..', 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },

  resolve: {
    extensions: [
      '.js', '.jsx'
    ]
  },

  module: {
    rules: [
      {
        test: /\.bundle\.js$/,
        use: {
          loader: 'bundle-loader',
          options: {
            lazy: true
          }
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                'env', 'react'
              ],
              plugins: [
                'syntax-dynamic-import',
                'transform-class-properties',
                'transform-object-rest-spread'
              ]
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   minChunks: Infinity,
    //   async: true
    // }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify(NODE_ENV)
    //   }
    // }),
  ],

  target: 'web'
};
