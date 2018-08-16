
const CleanWebpackPlugin = require('clean-webpack-plugin')
const { resolve, join } = require('path')

const path = {
  src: resolve(__dirname, 'src'),
  dist: resolve(__dirname, 'lib')
}

module.exports = ({ production = false } = {}) => ({
  entry: {
    'style-diff': join(path.src, 'index.js')
  },
  plugins: [
    new CleanWebpackPlugin(path.dist)
  ],
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'standard-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  mode: production ? 'production' : 'development',
  devtool: production ? false : 'inline-source-map',
  output: {
    path: path.dist,
    filename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  }
})
