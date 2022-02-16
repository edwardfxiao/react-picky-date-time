const base = require('./base.js');
const PATH = require('./build_path');
const objectAssign = require('object-assign');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = objectAssign(base, {
  mode: 'production',
  devtool: 'cheap-source-map',
  output: {
    publicPath: '/react-picky-date-time/dist/',
    filename: '[name]-[chunkhash].js',
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
          warnings: false,
        },
      }),
    ],
  },
});

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
