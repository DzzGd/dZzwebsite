const webpackMerge = require('webpack-merge')
const baseConfig   = require('./base.config')
const webpack      = require('webpack')
const uglify  = require('uglifyjs-webpack-plugin')

module.exports = webpackMerge(baseConfig, {
  plugins: [
    new uglify(),
    new webpack.BannerPlugin('最终版权归dZzGd © 所有, hiahia')
  ]
})