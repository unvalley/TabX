const { merge } = require('webpack-merge')
const path = require('path')
const base = require('./webpack.config.js')
const ExtensionReloader = require('webpack-extension-reloader')

module.exports = merge(base, {
  mode: 'development',
  watch: true,
  entry: {
    background: './src/background.ts',
  },
  devtool: 'source-map',
  plugins: [
    new ExtensionReloader({
      manifest: path.resolve(__dirname, './src/manifest.json'),
      port: 3001,
      reloadPage: true,
      entries: {
        background: 'background',
      },
    }),
  ],
})
