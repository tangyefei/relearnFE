
var baseWebpackConfig = require('./webpack.base')
const merge = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
})
