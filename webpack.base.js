
// var baseWebpackConfig = require('./webpack.base')
// const merge = require('webpack-merge')

// module.exports = merge(baseWebpackConfig, {
  // mode: 'production',

const path = require('path');
// const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  entry: {
    index: './src/index.js',
    detail: './src/detail.js',
    login: './src/login.js',
    manage: './src/manage.js',
  },
  resolve: {
    alias: {
      js: path.resolve(__dirname, 'src/js/common/'),
      vue: path.resolve(__dirname, 'src/js/vue/'), 
      template: path.resolve(__dirname, 'src/js/template/'),
      css: path.resolve(__dirname, 'src/css/'),
    }
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === 'development',
          }
        },
        'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  }
}

// })
