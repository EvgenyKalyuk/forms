import path from 'path';
import webpack from 'webpack';

export const devConfig = {
  entry: {
    app: [
      'babel-polyfill',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
      path.join(__dirname, '..', 'src', 'bootstrap.jsx')
    ],
    vendors: [
      'react',
      'react-dom',
      'redux',
      'react-router'
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};