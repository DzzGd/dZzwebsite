// 防抖
export function debounce(fn, delay = 50) { //防抖
  if (typeof fn !== 'function') throw new Error('is not a function')
  let timer = null
  let _this = this
  return function (...arg) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(_this, arg)
    }, delay);
  }
}

// 节流
export function throttle(fn, delay = 10) {
  if (typeof fn !== 'function') throw new Error('is not a function')
  let oldTime = new Date()
  let _this = this

  return function (...arg) {
    if (new Date() - oldTime < delay) return
    fn.apply(_this, arg)
    oldTime = new Date()
  }
}

// 时间格式化
export function dateFormat(timeStamp, format) { // timeStamp: 2019-8-5 2:38:22  format: 'yyyy-MM-dd hh:mm:ss'
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
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }

  function padLeftZero(str) {
    return ('00' + str).substr(str.length)
  }
}

export function setStorage(name, body) { //存储到localStorage
  window.localStorage.setItem(name, JSON.stringify(body))
}

export function getStorage(name) { //从localStorage取出
  return JSON.parse(window.localStorage.getItem(name) || '{}')
}