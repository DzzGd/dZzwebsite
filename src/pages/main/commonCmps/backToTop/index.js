import BackToTop from './BackToTop'

const obj = {}

obj.install = function(vue) {
  const toTopConstructor = vue.extend(BackToTop)

  const backtotop = new toTopConstructor()

  backtotop.$mount(document.getElementById('div'))

  document.body.appendChild(backtotop.$el)

  vue.prototype.$toTop = backtotop
}

export default obj