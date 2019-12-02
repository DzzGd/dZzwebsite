const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')
const getHtmlConfig = function (name, title) {
  return {
    template: './src/views/' + name + '.html',
    filename: name + '.html',
    title: title,
    inject: 'body',
    hash: true,
    chunks: ['gloabl', name]
  }
}
function resolve(targetPath) {
  return path.join(__dirname, targetPath)
}
module.exports = {
  mode  : "development",
  // entry : entryConfig.obj,
  entry: {
    'index': ['./src/pages/index/index.js'],
    'login': ['./src/pages/user/login/index.js'],
    'home' : ['./src/pages/home/index.js']
  },
  output: {
    path      : resolve('dist'),
    filename  : 'js/[name].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@'      : resolve('/'),
      '@src'   : resolve('/src'),
      '@utils' : resolve('/src/utils'),
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
        commons     : {
          name     : 'commonChunk',
          filename : 'js/conmmonChunk.js',
          chunks   : 'initial',
          minSize  : 0,
          minChunks: 2
        }
      }
    }
  },
  devServer: {
    // contentBase: '/',
    publicPath: '/',
    inline    : true,  
    hot       : true,
    // host      : '192.168.1.5',
    open      : false,
    port      : 5200
    // port: 
    // historyApiFallback 在SPA页面中, 依赖HTML5的history模式
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new extractTextWebpackPlugin("css/[name].css"),
    new HtmlWebpackPlugin(getHtmlConfig('index', 'index页面')),
    new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('home', 'home')),
  ]
}

