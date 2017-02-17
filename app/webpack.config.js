const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;

const cssExtract = new ExtractTextPlugin('main.css');

module.exports = {
  entry: './src/app.js',
  output: {
    path: '../server/public',
    filename: 'main.js'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    cssExtract
  ],
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015'],
        cacheDirectory: true
        // plugins: ['transform-runtime']
      },
    }, {
      test: /\.scss$/,
      loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap'	
    }, {
      test: /\.html$/,
      loader: 'html-loader'	
    }, {
      test: /\.css$/,
      loader: cssExtract.extract(
        'style-loader',
        'css-loader'
      )
    }]
  },
  sassLoader: {
    includePaths: ['./src/scss/partials']
  },
  target: 'web'
};