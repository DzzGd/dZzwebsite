import Vue from "vue"
import App from './App'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@assets/css/base.css'

Vue.prototype.$bus = new Vue() //事件总线
Vue.use(ElementUI)
new Vue({
  router,
  render: c => c(App)
}).$mount('#app')