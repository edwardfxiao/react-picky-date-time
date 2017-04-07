const base = require('./base.js');
const _ = require('lodash');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = _.merge(base, {
  devtool: 'cheap-source-map',
  output: {
    publicPath: '/',
    filename: '[name]-[chunkhash].js'
  },
});

config.plugins.push(
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false
  }),
  new ExtractTextPlugin({ filename: 'css/[name]-[hash].css', disable: false, allChunks: false })
);

module.exports = config;
