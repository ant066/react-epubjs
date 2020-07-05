var merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonConfig = require('./webpack.config')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'public/index.html'),
  filename: './index.html',
})

module.exports = merge(commonConfig, {
  entry: path.join(__dirname, 'src/demo'),
  plugins: [htmlWebpackPlugin],
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
  },
  module: {
    rules: [
      {
        test: /\.(epub|png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
})
