const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const PATH = require('./build_path');
const env = require('yargs').argv.env; // use --env with webpack 2
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const styleVariables = require(path.join(PATH.SOURCE_PATH, 'css/variables'));

let libraryName = 'react-picky-date-time';

let plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  outputFile;

if (env === 'build') {
  plugins.push(
    new UglifyJsPlugin({ minimize: true }),
    new ExtractTextPlugin({
      filename: libraryName + '.min.css',
      disable: false,
      allChunks: true
    })
  );
  outputFile = libraryName + '.min.js';
} else {
  plugins.push(
    new ExtractTextPlugin({
      filename: libraryName + '.css',
      disable: false,
      allChunks: true
    })
  );
  outputFile = libraryName + '.js';
}

const config = {
  entry: PATH.ROOT_PATH + 'src/js/PickyDateTime/index.js',
  devtool: 'source-map',
  output: {
    path: PATH.ROOT_PATH + '/lib',
    filename: outputFile,
    library: libraryName,
    // libraryTarget: 'umd',
    // libraryTarget: 'commonjs2',
    libraryTarget: 'umd'
    // libraryTarget: ifNode('commonjs2', 'umd'),
    // umdNamedDefine: true
  },
  // externals: {
  //   // Use external version of React
  //   react: 'React'
  // },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    }
  },
  module: {
    // noParse: 'react',
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: { presets: ['es2015', 'react', 'stage-2'] }
          }
        ],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        use: [{ loader: 'eslint-loader', options: {} }],
        exclude: /node_modules/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)\??.*$/,
        use: [
          {
            loader: 'url-loader?limit=8192&name=font/[name].[ext]',
            query: {
              // outputPath: 'assets/',
              // publicPath: 'http://localhost:8080/',
              // emitFile: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)\??.*$/,
        use: [{ loader: 'url-loader?limit=8192&name=img/[name].[ext]' }]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
                importLoaders: 1,
                minimize: env === 'build' ? true : false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                // ident: 'postcss',
                plugins: function(webpack) {
                  return [
                    require('postcss-import')({
                      addDependencyTo: webpack
                    }),
                    require('postcss-cssnext')({
                      autoprefixer: {
                        browsers: 'ie >= 9, ...'
                      },
                      features: {
                        customProperties: {
                          variables: styleVariables
                        }
                      }
                    })
                  ];
                }
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: plugins
};

module.exports = config;
