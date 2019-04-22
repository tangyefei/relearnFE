const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    detail: './src/detail.js',
    login: './src/login.js',
    manage: './src/manage.js',
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