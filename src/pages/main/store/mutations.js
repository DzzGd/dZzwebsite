import {
  SET_LOGIN,
  SET_LOGOUT,
} from './mutations-types'

export default {
  [SET_LOGIN](state, payLoad) {
    state.logStatus = true
    state.username  = payLoad.username
    state.identify  = payLoad.identify
    state._id       = payLoad._id
  },
  [SET_LOGOUT](state) {
    state.logStatus = false
    state.identify  = 2
    state.username  = '匿名网友'
    state._id       = null
  }
}