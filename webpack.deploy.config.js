const path = require('path');
const Myplugin = require('swnb-webpack-learning-plugin');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');

const htmlTmp = path.resolve('./template/template.html');
const {
  resolve,
} = path;
module.exports = {
  entry: {
    index: path.join(__dirname, 'app', 'index'),
    // test: resolve(__dirname, 'app', 'test'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      include: [path.resolve(__dirname, 'app')],
      exclude: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'bower_components'),
      ],
      loader: 'babel-loader',
      query: {
        presets: ['env', 'react'],
      },
    },
    {
      test: /\.css$/,
      include: [path.resolve(__dirname, 'app')],
      exclude: [path.resolve(__dirname, 'node_modules')],
      use: extractCSS.extract(['css-loader', 'postcss-loader']),
    },
    ],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.css'],
    alias: {
      com: resolve('./app/components'),
      base: resolve('./app/components/base'),
      src: resolve('./app/src/css'),
      util: resolve('./app/util'),
      store: resolve('./app/redux'),
      api: resolve('./app/api'),
    },
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join('./dist'),
    port: '8000',
  },
  plugins: [
    extractCSS,
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    }), new Myplugin(htmlTmp, {
      title: 'playRoom',
    }),
  ],
};
