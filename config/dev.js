import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';

export const devConfig = {
  entry: {
    app: [
      'babel-polyfill',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
      path.join(__dirname, '..', 'src', 'bootstrap.jsx')
    ],
  },

  module: {
    rules: [
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'stylus-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};