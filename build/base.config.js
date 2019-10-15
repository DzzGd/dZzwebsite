const path = require('path')

const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const htmlConfig = require('./htmlConfig')
const entryConfig = require('./entry')


function resolve(targetPath) {
  return path.join(__dirname, '../', targetPath)
}
module.exports = {
  mode  : "development",
  entry : entryConfig,
  output: {
    path      : resolve('dist'),
    filename  : 'js/[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@'      : resolve('/'),
      '@src'   : resolve('/src'),
      '@common': resolve('/src/common'),
      '@pages' : resolve('src/pages'),
      '@assets': resolve('src/assets'),
    }
  },
  externals: {
    'jquery': 'window.Jquery'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: extractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.less$/,
        // use: ['style-loader', 'css-loader', 'less-loader']
        use: extractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(jpg|jpeg|gif|svg|png|)$/,
        use: 'url-loader?limit=10000&name=img/pic/[name][hash:8].[ext]'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: 'url-loader?name=img/font/[name][hash:8].[ext]'
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common     : {
          name     : 'commonChunk',
          filename : 'js/conmmonChunk.js',
          chunks   : 'initial',
          minSize  : 0,
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new extractTextWebpackPlugin("css/[name].css"),
    ...htmlConfig.arr
  ]
}

