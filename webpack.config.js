const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.join(__dirname, 'src', 'index.pug'),
      path.join(__dirname, 'src', 'bootstrap.jsx'),
    ],
  },

  output: {
    publicPath: '/',
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },

  resolve: {
    extensions: [
      '.js', '.jsx',
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
              presets: [
                'env', 'react',
              ],
              plugins: [
                'syntax-dynamic-import',
                'transform-decorators-legacy',
                'transform-class-properties',
                'transform-object-rest-spread',
              ],
            },
          },
        ],
      },
      {
        test: /index\.pug/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'index.html',
          },
        }, 'pug-html-loader'],
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify(NODE_ENV),
    //   },
    // }),
  ],

  target: 'web',
};
