const path = require('path')
const VueLoaderPlugin  = require('vue-loader/lib/plugin')
const htmlConfig       = require('./htmlConfig')
const entryConfig      = require('./entry')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')


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
      '@src'   : resolve('src'),
      '@pages' : resolve('src/pages'),
      '@common': resolve('src/common'),
      '@assets': resolve('src/assets'),
      '@images': resolve('src/assets/images'),
      '@main'  : resolve('src/pages/main'),
      '@commonCmps': resolve('src/pages/main/commonCmps'),
      '@components': resolve('src/pages/main/components'),
      '@mainviews': resolve('src/pages/main/mainviews'),
    },
    extensions: ['.js', '.vue', '.less', '.scss', '.css']
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
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(sass|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        'elementUI-vendor': {
          name: 'elementUI-vendor',
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          chunks   : 'all',
          filename : 'js/elementUI-vendor.js',
          minSize  : 0,
          minChunks: 1,
          priority : 10
        },
        'vue-vendor' : {
          name: 'vue-vendor',
          test: /node_modules[\\/](vue|vue-router|vuex)[\\/]/,
          filename : 'js/vue-vendor.js',
          chunks   : 'initial',
          minSize  : 0,
          minChunks: 1,
          priority : 9
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks   : 'initial',
          filename : 'js/vendors.js',
          minSize  : 0,
          minChunks: 1,
          priority : 1
        },
        common     : {
          name     : 'common',
          filename : 'js/common.js',
          chunks   : 'initial',
          minSize  : 0,
          minChunks: 2,
          priority : 0
        },
        runtimeChunk: 'single'
      }
    }
  },
  plugins: [
    new extractTextWebpackPlugin("css/[name].css"),
    new VueLoaderPlugin(),
    ...htmlConfig.arr,
  ]
}

