const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
function config(title, name) {
  return new htmlWebpackPlugin({
    template: path.join(__dirname, '../src/views', name) + '.html',
    filename: name,
    title: title,
    inject: 'body',
    hash: true,
    chunks: [name]
  })
}
module.exports.arr = [
  config('登录 Login'   , 'login'),
  config('首页 dZz'     , 'home' ),
  config('注册 Register', 'register')
]
