
const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
var autoprefixer = require('autoprefixer');


const config = {
  entry: path.join(__dirname, 'src', 'js', 'base.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: 'chunk-[id].js',
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel' },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass') },
      { test: /\.(eot|svg|ttf|woff|woff2|png|jpg)$/, loader: 'file' },
    ],
  },

  postcss: [autoprefixer],

  plugins: [
    new ExtractTextPlugin('main.css', { allChunks: true }),
  ],
};

// config.devtool = 'sourcemap';
// config.debug = true;

config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
config.plugins.push(new webpack.optimize.DedupePlugin());
config.plugins.push(new webpack.optimize.UglifyJsPlugin());

module.exports = config;
