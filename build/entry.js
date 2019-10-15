const path = require('path')
function resolve(targetPath) {
  return path.join(__dirname, '../src/pages/', targetPath, './index.js')
}
module.exports = {
  login   : resolve('/user/login'),
  home    : resolve('/home'),
  register: resolve('/user/register'),
  // common   : resolve('/common'),
}