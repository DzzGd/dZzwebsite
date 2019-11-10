const path = require('path')
function resolve(targetPath) {
  return path.join(__dirname, '../src/pages/', targetPath, './index.js')
} 
module.exports = {
  // index   : ['babel-polyfill', resolve('/main')],
  home    : resolve('/home'),
  login   : resolve('/user/login'),
  register: resolve('/user/register'),
  forget  : resolve('/user/forget'),
  index     : resolve('/main')
  // common   : resolve('/common'),
}