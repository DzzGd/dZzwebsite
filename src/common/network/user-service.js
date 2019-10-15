const tool = require('../utils/tool')
const qs = require('querystring')
// 这里axios需要引用querystring来对post传输的数据进行解析
module.exports = {
  // 登录 
  logIn(userInfo, resolve, reject) {
    tool.request({
      url: '/front/login',
      method: 'post',
      data: qs.stringify(userInfo),
      withCredentials: true
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  },
  register(userInfo, resolve, reject) {
    tool.request({
      url: '/front/register',
      method: 'post',
      data: qs.stringify(userInfo)
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  },
  registerSingle(userInfo, resolve, reject) {
    tool.request({
      url: '/front/register/single',
      method: 'post',
      data: qs.stringify(userInfo)
    }).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  },

}