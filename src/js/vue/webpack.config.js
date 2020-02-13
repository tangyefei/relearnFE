const path = require('path');
const RemoveStrictPlugin = require( 'remove-strict-webpack-plugin' );
module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js"
  },
  plugins: [
    new RemoveStrictPlugin()
  ]
}