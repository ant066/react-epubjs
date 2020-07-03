var merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devConfig = require('./webpack.config.dev')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, 'public/index.html'),
  filename: './index.html',
})

module.exports = merge(devConfig, {
  output: {
    path: path.join(__dirname, 'docs'),
    filename: 'bundle.js',
    library: 'react-epubjs',
    libraryTarget: 'umd',
  },
})
