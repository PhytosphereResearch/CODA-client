const { resolve } = require('path');
const webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');


const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  entry: PROD
    ? ['./index.jsx']
    : [
      'react-hot-loader/patch',
      // activate HMR for React

      'webpack-dev-server/client?http://localhost:8080',
      // bundle the client for webpack-dev-server
      // and connect to the provided endpoint

      'webpack/hot/only-dev-server',
      // bundle the client for hot reloading
      // only- means to only hot reload for successful updates

      './index.jsx'
      // the entry point of our app
    ],
  // Webpack config options on how to obtain modules
  resolve: {
    alias: {
      // react-mcp-mex-components requires will be searched in src folder, not in node_modules
      'coda': resolve(__dirname, 'src')
    }
  },
  output: {
    filename: PROD ? '[chunkhash].bundle.js' : 'bundle.js',
    // the output bundle

    path: resolve(__dirname, 'dist'),

    publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
  },

  context: resolve(__dirname, 'src'),

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server

    contentBase: resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/',
    // match the output `publicPath`

    historyApiFallback: true
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
        use: ['url-loader']
      }
    ]
  },

  plugins: PROD ? [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new ManifestPlugin(),
    new HtmlWebpackPlugin({
      template: './index.ejs'
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    })
  ] : [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin()
    // prints more readable module names in the browser console on HMR updates
  ]
};
