const baseConfig = require('./base.config')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const os = require('os');
// 动态获取局域网ip地址
function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}
module.exports = webpackMerge(baseConfig, {
  devServer: {
    // contentBase: '/',
    // publicPath: '/',
    inline    : true,  
    hot       : true,
    host      : getIPAdress(),
    port      : 8080,
    historyApiFallback: true,
    //SPA页面中, 依赖HTML5的history模式
    // 代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5200',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
})