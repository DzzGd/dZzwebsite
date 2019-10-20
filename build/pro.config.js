const webpackMerge = require('webpack-merge')
const baseConfig   = require('./base.config')
const webpack      = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const uglify       = require('uglifyjs-webpack-plugin')

module.exports = webpackMerge(baseConfig, {
  plugins: [
    new uglify(),
    new webpack.BannerPlugin('最终版权归dZzGd © 所有, hiahia'),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      generateStatsFile: true,
      statsOptions: {source: false},
    })
  ]
})