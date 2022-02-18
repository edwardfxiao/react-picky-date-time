import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import base from './base.babel.js';
const PATH = require('./build_path');
const config = {
  ...base,
  mode: 'development',
  output: {
    publicPath: '/',
    filename: '[name].js',
  },
};
config.plugins.push(
  new ESLintPlugin({
    context: 'src',
    emitWarning: true,
    failOnError: false,
    exclude: ['data', 'locales'],
    extensions: ['airbnb-typescript'],
  }),
);
config.plugins.push(
  new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
  new HtmlWebpackPlugin({
    template: PATH.HTML_PATH + '/layout.html',
    title: 'react-picky-date-time',
    page: 'index',
    filename: 'index.html',
    hash: false,
    chunksSortMode: function (chunk1, chunk2) {
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
