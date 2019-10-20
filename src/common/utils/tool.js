const axios = require('axios')

module.exports = {
  // 网络请求
  createAxios() {
    const instance = axios.create({
      timeout: 5000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    return instance
  },
  request(config) {
    const ax = this.createAxios()
    ax.interceptors.request.use(config => {
      return config
    }, err => {
      alert('获取登录状态失败', err)
    })
    ax.interceptors.response.use(config => {
      // if (config.data.status === 9) { 是否登录
      //   this.doLogin()
      // }
      return config
    }, err => {
      alert('获取登录状态失败', err)
    })
    return ax(config)
  },
  // 数据验证, 合格 返回true  反之 为false
  validate(type, value) {
    value = $.trim(value)
    if (!value) return false
    if (type === 'username') {
      return value.indexOf(' ') === -1 && value.length >= 4 && value.length <= 10
    } else if (type === 'email') {
      return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value) && value.length <= 25
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
      ret = ret ? ret : ''
    } else {
      ret = 'home'
    }
    return encodeURIComponent(ret)
  },
  // 统一登录处理并设置登录后的跳转路径
  doLogin() {
    this.toTarget('login?redirect=' + encodeURIComponent(window.location.pathname.slice(1)))
  },
  goHome() {
    window.location.href = '/home'
  },
  toTarget(url) {
    window.location.href = '/' + decodeURIComponent(url)
  },
  // 解析 带有 & 的字符串 返回对应值 比如 'name=dz&age=23' -> name -> dz
  parseString(param, str) {
    let reg = new RegExp(param + '=([^&]*)(&|$)')
    let ret = str.match(reg)
    console.log(ret)
    return ret[1]
  },
  // 时间格式化
  dateFormat(timeStamp, format) { // timeStamp: 2019-8-5 2:38:22  format: 'yyyy-MM-dd hh:mm:ss'
    if (!timeStamp || !format) return 'errot time or format'

    let time = new Date(timeStamp)
    let ret = (/(y+)/i).test(format)
    if (ret) {
      format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    //format: '2019-MM-dd hh:mm:ss'

    // 获取
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }

    //format: '2019-MMM-d hh:m:sss'
    for (let k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        let str = o[k] + ''
        format  = format.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
      }
    }

    function padLeftZero(str) {
      return ('00' + str).substr(str.length)
    }
  }
}
