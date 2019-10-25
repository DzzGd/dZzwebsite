import {
  SET_LOGIN,
  SET_LOGOUT,
} from './mutations-types'

export default {
  store_changeLogStatus({ commit, state }, Info) {
    if (Info.access === false) {
      commit(SET_LOGOUT)
    }
    if (Info.access === true) {
      commit(SET_LOGIN, Info.userInfo)
    }
  }
}