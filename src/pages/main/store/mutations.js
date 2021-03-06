import {
  SET_LOGIN,
  SET_LOGOUT,
  SET_AVATAR,
  SET_POS
} from './mutations-types'

export default {
  [SET_LOGIN](state, payLoad) {
    state.logStatus = true
    state.createTime= payLoad.createTime
    state.username  = payLoad.username
    state.identify  = payLoad.identify
    state._id       = payLoad._id
    state.avatar    = payLoad.avatar
  },
  [SET_LOGOUT](state) {
    state.logStatus = false
    state.identify  = 2
    state.username  = '匿名网友' + (Math.random()+1).toString(16).slice(-6)
    state._id       = null
    state.avatar    = 'http://static.bigbigbigdz.xyz:8111/static/img/avatars/default.png'
    state.createTime= 4102329600000
  },
  [SET_AVATAR] (state, payLoad){
    state.avatar = payLoad
  },
  [SET_POS] (state, payLoad) {
    state.position = payLoad
  }
}