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
    path: '/TechShare/Articles/:id',
    component: resolve => require(['@components/articleDetail/ArticleDetail'], resolve)
  },
  {
    path: '/FriendShare',
    component: resolve => require(['@components/friendShare/FriendShare'], resolve)
  },
  {
    path: '/TechNews',
    component: resolve => require(['@components/techNews/TechNews'], resolve)
  },
  // {
  //   path: '/Entertainment',
  //   component: resolve => require(['@components/entertainment/Entertainment'], resolve)
  // },
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
  },
  {
    path: '/WriteArticle',
    component: resolve => require(['@components/writeArticle/WriteArticle'], resolve)
  },
  {
    path: '/SearchDetail',
    component: resolve => require(['@components/searchDetail/SearchDetail'], resolve)
  }
]
const router = new VueRouter({
  routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = 0
  next()
})
export default router