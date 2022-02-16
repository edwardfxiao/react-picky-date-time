const env = require('yargs').argv.env; // use --env with webpack 2
const path = require('path');
const PATH = require('./build_path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const styleVariables = require(path.join(PATH.SOURCE_PATH, 'css/variables'));
let libraryName = 'react-picky-date-time';

let plugins = [],
  outputFile;

if (env === 'build') {
  plugins.push(new MiniCssExtractPlugin({ filename: libraryName + '.min.css' }));
  outputFile = libraryName + '.min.js';
} else {
  plugins.push(new MiniCssExtractPlugin({ filename: libraryName + '.css' }));
  outputFile = libraryName + '.js';
}

module.exports = {
  mode: 'production',
  entry: PATH.ROOT_PATH + 'src/js/PickyDateTime/index.umd.js',
  context: PATH.ROOT_PATH,
  module: {
    rules: [
      {
        test: /\.mp3?$/,
        include: [PATH.ROOT_PATH],
        exclude: [PATH.NODE_MODULES_PATH],
        loader: 'file-loader?name=audio/[name]-[hash].[ext]',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)\??.*$/,
        include: [PATH.ROOT_PATH],
        // exclude: [PATH.NODE_MODULES_PATH],
        loader: 'url-loader?limit=1&name=font/[name]-[hash].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif|svg)\??.*$/,
        include: [PATH.ROOT_PATH],
        // exclude: [PATH.NODE_MODULES_PATH],
        loader: 'url-loader?limit=1&name=img/[name]-[hash].[ext]',
      },
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              // emitWarning: true
            },
          },
        ],
      },
      { test: /\.(ts|tsx)$/, loader: 'awesome-typescript-loader' },
      {
        test: /\.jsx?$/,
        include: [PATH.ROOT_PATH],
        exclude: [PATH.NODE_MODULES_PATH],
        enforce: 'post',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.jsx?$/,
        include: [PATH.ROOT_PATH],
        exclude: [PATH.NODE_MODULES_PATH],
        loader: 'babel-loader',
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
              //   context: path.resolve(__dirname, 'src'),
              //   localIdentName: '[name]__[local]',
              // },
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: loader => [
                require('postcss-import')({
                  root: loader.resourcePath,
                }),
                require('postcss-cssnext')(),
                require('autoprefixer')(),
                require('cssnano')({ safe: true }),
                require('postcss-simple-vars')({
                  variables: styleVariables,
                }),
              ],
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
