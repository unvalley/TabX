const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    app: './src/app/index.tsx',
    background: './src/background.ts',
  },
  output: {
    path: __dirname + '/dist',
  },
  optimization: {
    noEmitOnErrors: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {minimize: true},
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(jpg|png|gif|woff|woff2|eot|ttf|svg)$/,
        use: [{loader: 'file-loader'}],
      },
    ],
  },

  resolve: {
    extensions: ['*', '.js', '.ts', '.tsx', '.json', '.mjs', '.wasm'],
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: 'src/public/index.html',
      filename: 'index.html',
      chunks: ['app'],
      favicon: 'src/assets/favicon.ico',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/manifest.json',
        to: 'manifest.json',
      },
      {
        from: 'src/assets/icons',
        to: 'assets/icons',
      },
    ]),
  ],
}
