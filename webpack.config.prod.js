var merge = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const commonConfig = require("./webpack.config");

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "public/index.html"),
  filename: "./index.html",
});

module.exports = merge(commonConfig, {
  entry: "./src/index",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js",
    library: "react-epubjs",
    libraryTarget: "umd",
  },
  externals: {
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "ReactDOM",
    },
    epubjs: {
      commonjs: "epubjs",
      commonjs2: "epubjs",
      amd: "epubjs",
      root: "epubjs",
    },
  },
});
