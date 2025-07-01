var path = require("path");

module.exports = {
  entry: {
    "react-controlled-dialog": "./src/index.js"
  },

  externals: {
    react: "commonjs react"
  },

  output: {
    path: path.resolve("lib"),
    filename: "ReactControlledDialog.js",
    libraryTarget: "commonjs2"
  },

  optimization: {
    minimize: true
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      }
    ]
  }
};
