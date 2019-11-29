const tool = require('../utils/tool')
const qs = JSON
// 这里axios需要引用querystring来对post传输的数据进行解析
module.exports = {
  // 登录 
  logIn(userInfo, resolve, reject) {
    tool.request({
      url   : '/user/login',
      method: 'post',
      data  : qs.stringify(userInfo),
      withCredentials: true
    }).then(res  => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  },
  register(userInfo, resolve, reject) {
    tool.request({
      url   : '/user/register',
      method: 'post',
      data: qs.stringify(userInfo)
    }).then(res  => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  },
  registerSingle(userInfo, resolve, reject) {
    tool.request({
      url   : '/user/register/single',
      method: 'get',
      params: userInfo
    }).then(res  => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  },
  isLogined(resolve, reject) {
    tool.request({
      url   : '/user/isLogined',
      method: 'get',
    }).then( res  => {
      resolve(res)
    }).catch( err => {
      reject(err)
    })
  },
  forget(userInfo) {
    return tool.request({
      url   : '/user/forget',
      method: 'post',
      data  : qs.stringify(userInfo)
    })
  }
}