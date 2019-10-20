export function debounce(fn, delay = 50) {
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

