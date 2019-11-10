import Vue from "vue"
import App from './App'
import store from './store/index'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@assets/css/base.css'
import filterSet from './filter/filter'
import VueLazyload from "vue-lazyload"

filterSet(Vue) //设置过滤器
Vue.prototype.$bus = new Vue() //事件总线
Vue.use(VueLazyload, {preLoad:1.4, loading:require('@assets/images/lazyload/loading.gif'), error: require('@assets/images/lazyload/error.jpg'),attempt:1}) //懒加载
Vue.use(ElementUI) //安装elementui

new Vue({
  router,
  store,
  render: c => c(App)
}).$mount('#app')

/**
 * 简单的自我约定
 * 组件不采用小驼峰标识 采用首字母大写 比如 HeadNav, HomePage
 * 路由也都采用大写  /HeadNav/Components
 * css样式class或者id都采用 ' - ' 连接  head-nav
 * methods 方法 统一采用小驼峰  handleClick
 * prop传输传递时 利用 ' - '连接, 同时 接受时的参数props 利用 驼峰 :head-nav="变量"   props:['headNav']
 * 
 */