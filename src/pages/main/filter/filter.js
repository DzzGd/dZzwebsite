
const filters = {
  dateFormat(timeStamp, format = 'yyyy-MM-dd hh:mm:ss') {
    timeStamp = parseInt(timeStamp)
    /// timeStamp: 2019-8-5 2:38:22  format: 'yyyy-MM-dd hh:mm:ss'
    if (!timeStamp || !format) return 'errot time or format'

    let time = new Date(timeStamp)
    let ret = (/(y+)/i).test(format)
    if (ret) {
      format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    //format: '2019-MM-dd hh:mm:ss'

    // 获取
    let o = {
      'M+': time.getMonth() + 1,
      'd+': time.getDate(),
      'h+': time.getHours(),
      'm+': time.getMinutes(),
      's+': time.getSeconds()
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

    return format
  }
  // ,numberFormate() {}
}
export default function set(Vue) {
  Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
}

