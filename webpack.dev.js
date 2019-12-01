
var baseWebpackConfig = require('./webpack.base')
const merge = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    disableHostCheck: true
  },
})