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
      '.js', '.jsx',
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      }
    })
  ],

  target: 'web'
};
