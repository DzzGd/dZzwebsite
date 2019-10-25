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