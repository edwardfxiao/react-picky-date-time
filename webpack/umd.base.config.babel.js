const env = require('yargs').argv.env; // use --env with webpack 2
const path = require('path');
const PATH = require('./build_path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let libraryName = 'react-picky-date-time';

let plugins = [],
  outputFile;

  if (env === 'minify') {
    plugins.push(new MiniCssExtractPlugin({ filename: libraryName + '.min.css' }));
    outputFile = libraryName + '.min.js';
  } else {
    plugins.push(new MiniCssExtractPlugin({ filename: libraryName + '.css' }));
    outputFile = libraryName + '.js';
  }

module.exports = {
  mode: 'production',
  context: PATH.ROOT_PATH,
  module: {
    rules: [
      {
        test: /\.mp3?$/,
        include: [PATH.ROOT_PATH],
        exclude: [PATH.NODE_MODULES_PATH],
        loader: 'file-loader',
        options: {
          name: 'audio/[name]-[hash].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)\??.*$/,
        include: [PATH.ROOT_PATH],
        // exclude: [PATH.NODE_MODULES_PATH],
        loader: 'url-loader',
        options: {
          limit: 1,
          name: 'font/[name]-[hash].[ext]',
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg)\??.*$/,
        include: [PATH.ROOT_PATH],
        // exclude: [PATH.NODE_MODULES_PATH],
        loader: 'url-loader',
        options: {
          limit: 1,
          name: 'img/[name]-[hash].[ext]',
        },
      },
      {
        test: /\.jsx?$/,
        include: [PATH.ROOT_PATH],
        exclude: [PATH.NODE_MODULES_PATH],
        enforce: 'post',
        loader: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)$/,
        include: [PATH.ROOT_PATH],
        exclude: [PATH.NODE_MODULES_PATH],
        enforce: 'post',
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        enforce: 'post',
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // modules: {
              //   localIdentName: '[path][name]__[local]--[hash:base64:5]',
              // },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-import', {}],
                  ['postcss-preset-env', { stage: 0 }],
                  ['cssnano', { safe: true }],
                ],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'app')],
    extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.css'],
  },
  devtool: 'source-map',
  output: {
    path: PATH.ROOT_PATH + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  plugins,
};
