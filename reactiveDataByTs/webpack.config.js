const { resolve } = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './index.ts',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'index.js',
    environment: {
      arrowFunction: false
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: 'amd',
                    targets: {
                      ie: '11',
                    },
                    corejs: '3',
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          },
          'ts-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {
    open: true,
    hot: true
  }
}