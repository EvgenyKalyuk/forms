import path from 'path';
import webpack from 'webpack';

const devConfig = {
  devtool: 'cheap-eval-source-map',

  entry: {
    app: [
      'babel-polyfill',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
      path.join(__dirname, '..', 'src', 'bootstrap.jsx'),
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
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
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
      },
    ],
  },

  plugins: [
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
  ],
};

export default devConfig;
