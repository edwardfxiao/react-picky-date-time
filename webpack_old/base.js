const webpack = require('webpack');
const path = require('path');
const PATH = require('./build_path');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const styleVariables = require(path.join(PATH.SOURCE_PATH, 'css/variables'));
module.exports = {
  context: PATH.ROOT_PATH,
  entry: {
    index: PATH.ROOT_PATH + 'example/index.js',
  },
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
        exclude: [PATH.NODE_MODULES_PATH, path.join(__dirname, '../', './example')],
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
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
        test: /\.css$/,
        include: [PATH.NODE_MODULES_PATH],
        enforce: 'post',
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
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
                require('autoprefixer')(),
                require('cssnano')(),
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: [PATH.SOURCE_PATH, path.join(__dirname, '../', './src')],
        exclude: [PATH.NODE_MODULES_PATH],
        enforce: 'post',
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              // modules: {
              //   mode: 'local',
              //   context: path.resolve(__dirname, 'src'),
              //   localIdentName: '[name]__[local]___[hash:base64:5]',
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
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 9000,
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/),
    new webpack.ProvidePlugin({
      React: 'React',
      react: 'React',
      'window.react': 'React',
      'window.React': 'React',
    }),
    new WebpackAssetsManifest({
      fileName: 'manifest-rev.json',
    }),
  ],
};
