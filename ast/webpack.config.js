// const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: 'virtual',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: resolve(__dirname, 'www/index.html')
  //   })
  // ],
  devServer: {
    contentBase: 'www'
  }
}
