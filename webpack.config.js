const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    detail: './src/detail.js',
    login: './src/login.js',
    manage: './src/manage.js',
  },
  resolve: {
    alias: {
      js: path.resolve(__dirname, 'src/js/common/'),
      template: path.resolve(__dirname, 'src/js/template/'),
      css: path.resolve(__dirname, 'src/css/'),
    }
  },
  devServer: {
    contentBase: './dist'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
};