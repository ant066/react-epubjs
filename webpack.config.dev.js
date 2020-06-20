const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const merge = require('webpack-merge')
const prodConfig = require('./webpack.config.js')

module.exports = merge(prodConfig, {
  mode: 'development',
  entry: './demo/app.jsx',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
})
