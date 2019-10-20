const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
function config(title, name, arr) {
  return new htmlWebpackPlugin({
    template: path.join(__dirname, '../src/views', name) + '.html',
    filename: name, 
    hash  : true,
    title : title,
    inject: 'body',
    chunks: [name]
  })
}
module.exports.arr = [ 
  config('登录 Login'    , 'login'),
  config('首页 dZz'      , 'home' ),
  config('注册 Register' , 'register'),
  config('忘记密码 forget', 'forget'),
  new htmlWebpackPlugin({
    template: path.join(__dirname, '../src/views', 'index') + '.html',
    hash  : true,
    title : 'dDz shares haha',
    inject: 'body',
    chunks: ['index']
  })
]
