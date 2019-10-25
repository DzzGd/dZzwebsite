import vuex from 'vuex' 
import vue  from 'vue' 
import mutations from './mutations'
import actions   from './actions'
import getters   from './getters'
vue.use(vuex)
const store = new vuex.Store({
  state: {
    logStatus  : false,
    _id        : null,
    identify   : 2,
    username   : '匿名网友'
  },
  mutations,
  actions,
  getters
})

export default store

