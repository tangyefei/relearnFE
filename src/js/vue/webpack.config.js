const path = require('path');
const RemoveStrictPlugin = require( 'remove-strict-webpack-plugin' );
module.exports = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js"
  },
  plugins: [
    new RemoveStrictPlugin()
  ]
}