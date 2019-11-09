const htmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const env = process.env.NODE_ENV
function config(title, name) {
  return new htmlWebpackPlugin({
    template: path.join(__dirname, '../src/views', name) + '.html',
    filename: env === 'production'? name + '.html' : name, 
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
  config('dDz shares haha', 'index')
]
