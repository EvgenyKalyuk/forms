import path from 'path';
import webpack from 'webpack';
import ProgressPlugin from 'webpack/lib/ProgressPlugin';
import CompressionPlugin from 'compression-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

export const prodConfig = {
  entry: {
    app: [
      'babel-polyfill',
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
    new webpack.HotModuleReplacementPlugin(),
    new ProgressPlugin((percentage, msg) => {
      let percents = percentage * 100,
        percentageFormatted = String(percents).split('.').length > 1 ? (percents).toFixed(2) : percents;
      if (percentageFormatted % 5 === 0) {
        console.log(percentageFormatted + '%', msg);
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJSPlugin({
      minimize: true,
      beautify: false,
      unused: true,
      drop_debugger: true, // eslint-disable-line camelcase
      drop_console: true, // eslint-disable-line camelcase
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      comments: false,
      sourceMap: false,
    }),
  ]
};