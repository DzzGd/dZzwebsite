import Vue from 'vue'
import VueRouter from "vue-router";

import HomePage from '@components/homePage/HomePage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/HomePage'
  },
  {
    path: '/HomePage',
    component: HomePage
  },
  {
    path: '/TechShare',
    component: resolve => require(['@components/techShare/TechShare'], resolve)
  },
  {
    path: '/FriendShare',
    component: resolve => require(['@components/friendShare/FriendShare'], resolve)
  },
  {
    path: '/Entertainment',
    component: resolve => require(['@components/entertainment/Entertainment'], resolve)
  },
  {
    path: '/FriendLink',
    component: resolve => require(['@components/friendLink/FriendLink'], resolve)
  },
  {
    path: '/UserCenter',
    component: resolve => require(['@components/userCenter/UserCenter'], resolve)
  },
  {
    path: '/MessageBoard',
    component: resolve => require(['@components/messageBoard/MessageBoard'], resolve)
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router