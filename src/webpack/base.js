const webpack = require('webpack');
const path = require('path');
const PATH = require('./build_path');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const stylelintRules = require('../../stylelint.config.js');
const styleVariables = require(path.join(PATH.SOURCE_PATH, 'css/variables'));

var config = module.exports = {
  context: PATH.ROOT_PATH,
  entry: {
    index: PATH.ROOT_PATH + 'src/js/index.js'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js?$/,
      exclude: /node_modules/,
      use: [{ loader: 'eslint-loader', options: {} }],
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{ loader: 'babel-loader', options: { presets: ['es2015', 'react', 'stage-2'] } }],
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)\??.*$/,
      use: [{ loader: 'url-loader?limit=8192&name=font/[name].[ext]' }]
    }, {
      test: /\.(jpe?g|png|gif|svg)\??.*$/,
      use: [{ loader: 'url-loader?limit=8192&name=img/[name].[ext]' }]
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1,
          }
        }, {
          loader: 'sass-loader'
        }]
      }),
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function(webpack) {
              return [
                require('lost'),
                require('postcss-import')({
                  addDependencyTo: webpack
                }),
                require('postcss-cssnext')({
                  autoprefixer: {
                    browsers: "ie >= 9, ..."
                  },
                  features: {
                    customProperties: {
                      variables: styleVariables
                    }
                  }
                }),
              ];
            }
          }
        }]
      })
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.coffee', '.json'],
    alias: {
      COMPONENTS: path.join(PATH.SOURCE_PATH, 'js/App/components'),
      STYLES: path.join(PATH.SOURCE_PATH, '/css'),
    }
  },
  output: {
    path: PATH.ASSET_PATH,
    filename: 'js/[name].js'
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/),
    new ManifestPlugin({
      fileName: 'rev-manifest.json'
    }),
    // new webpack.DllReferencePlugin({
    //   context: PATH.ROOT_PATH,
    //   manifest: require(path.join(PATH.ASSET_PATH, './react_vendors-manifest.json'))
    // }),
  ]
};
