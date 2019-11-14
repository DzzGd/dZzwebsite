const axios = require('axios')

// 网站request
function createAxios() {
  const instance = new axios.create({
    timeout: 5000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // baseURL: '/api/front/',
    // baseURL: 'http://127.0.0.1:5200/front/',
    baseURL: 'http://dzzlcxx.top:8888/front/',
  })
  return instance
}

// 图片request
function createAxios2() {
  const instance = new axios.create({
    timeout: 5000,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    // baseURL: 'http://192.168.43.181:8889/api/v1/upload/',
    // baseURL: 'http://127.0.0.1:8889/api/v1/upload/',
    // baseURL: 'http://10.161.230.250:8889/api/v1/upload/',
    baseURL: 'http://static.bigbigbigdz.xyz:8111/api/v1/upload/',
  })
  return instance
}

module.exports.request = function (config) {
  const ax = createAxios()
  ax.interceptors.request
    .use(info => {
      return info
    }, err => {
      return err
    })

  ax.interceptors.response
    .use(info => {
      return info
    }, err => {
      return err
    })
  return ax(config)
}

module.exports.request2 = function (config) {
  const ax = createAxios2()
  ax.interceptors.request
    .use(info => {
      return info
    }, err => {
      return err
    })

  ax.interceptors.response
    .use(info => {
      return info
    }, err => {
      return err
    })
  return ax(config)
}
