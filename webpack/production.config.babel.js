import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import base from './base.babel.js';
const PATH = require('./build_path');
const config = {
  ...base,
  mode: 'production',
  devtool: 'cheap-source-map',
  output: {
    publicPath: '/react-picky-date-time/dist/',
    filename: '[name]-[chunkhash].js',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          warnings: false,
          parse: {},
          compress: {},
          mangle: true,
          module: false,
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
        extractComments: true,
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: 'asset',
      cacheGroups: {
        vendors: {
          name: 'b',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          name: 'c',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
config.plugins.push(
  new MiniCssExtractPlugin({ filename: 'css/[name]-[hash].css' }),
  new HtmlWebpackPlugin({
    template: PATH.HTML_PATH + '/layout.html',
    title: 'react-picky-date-time',
    page: 'index',
    filename: '../index.html',
    hash: false,
    chunksSortMode: function(chunk1, chunk2) {
      var orders = ['index'];
      var order1 = orders.indexOf(chunk1.names[0]);
      var order2 = orders.indexOf(chunk2.names[0]);
      if (order1 > order2) {
        return 1;
      } else if (order1 < order2) {
        return -1;
      } else {
        return 0;
      }
    },
  }),
);
module.exports = config;
