module.exports = {
  entry: './src/index',
  output: {
    publicPath: 'virtual',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: 'www',
    open: true
  }
}
