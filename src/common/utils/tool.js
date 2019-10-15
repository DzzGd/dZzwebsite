const axios = require('axios')
const instance1 = axios.create({
  baseURL: 'http://172.20.10.3:8080',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
module.exports = {
  // 网络请求
  request(config) {
    return instance1(config)
  },
  // 数据验证, 合格 返回true  反之 为false
  validate(type, value) {
    value = $.trim(value)
    if (value) return true
    if (type === 'username') {
      return value.length >= 4 && value.length <= 10
    } else if (type === 'email') {
      return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)
    } else if (type === 'password') {
      return value.indexOf(' ') === -1 && value.length >= 8 && value.length <= 16
      // return (!/[^a-zA-Z0-9\_\u4e00-\u9fa5\.\-_]/.test(value)) && value.length >= 8 && value <= 16
    } else if (type === 'password-confirm') {
      return value.indexOf(' ') === -1 && value.length >= 8 && value.length <= 16
    } else if (type === 'phone') {
      return /^1[^12]\d{9}$/.test(value)
    } 
    return !!value
  },
  getRedirectUrl(param) {
    // 如果跳转到登录页, 会带有原来的地址redirect,如果没有re直接跳到home
    let urlParamsStr = window.location.search
    let ret = null
    if (urlParamsStr) {
      ret = this.parseString(param, urlParamsStr)
      // 虽然有参数 但不一定是redirect
      ret = ret ? ret[param] : 'home'
    } else {
      ret = 'home'
    }
    return encodeURIComponent(ret)
  },
  // 统一登录处理并设置登录后的跳转路径
  doLogin() {
    window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.href)
  },
  goHome() {
    window.location.href = '/home'
  },
  toTarget(url) {
    window.location.href = '/' + decodeURIComponent(url)
  },
  // setLocalStotage(itemName, data) {
  //   let info = ''
  //   for (let item in data) {
  //     if (!data.hasOwnProperty(item)) return
  //     info += `${item}=${data[item]}&`
  //   }
  //   localStorage.setItem(itemName, info)
  // },
  // 解析 带有 & 的字符串 以对象形式返回 比如 'name=dz&age=23' -> {name:dz,age=23}
  parseString(param, str) {
    let reg = new RegExp(param + '=([^&]*)(&|$)')
    let ret = str.match(reg)
    return ret ? ret[0] : null
  }
}
