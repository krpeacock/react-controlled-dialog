var webpack = require("webpack");
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

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],

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
