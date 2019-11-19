
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
  },
  datePassDis(timeStamp) {
    timeStamp = parseInt(timeStamp)
    if (!timeStamp) return 'errot time or format'
    const nowTime = new Date()
    const oldTime = new Date(timeStamp)
    const dis = (nowTime - oldTime) / 1000
    const year = Math.floor(dis / (60 * 60 * 24 * 360))
    if (year !== 0) return `${year}年前`
    const month = Math.floor(dis / (60 * 60 * 24 * 30))
    if (month !== 0) return `${month}月前`
    const day = Math.floor(dis / (60 * 60 * 24))
    if (day !== 0) return `${day}天前`
    const hour = Math.floor(dis / (60 * 60))
    if (hour !== 0) return `${hour}时前`
    const minute = Math.floor(dis / (60))
    if (minute !== 0) return `${minute}分前`
    const second = dis
    if (second !== 0) return `${second}秒前`
  }
  // ,numberFormate() {}
}
export default function set(Vue) {
  Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
}

