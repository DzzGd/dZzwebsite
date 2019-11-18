import {
  SET_LOGIN,
  SET_LOGOUT,
  SET_AVATAR,
  SET_POS
} from './mutations-types'
import service from "@common/network/homepage-service"
export default {
  store_changeLogStatus({ commit, state }, Info) {
    if (Info.access === false) {
      commit(SET_LOGOUT)
    }
    if (Info.access === true) {
      commit(SET_LOGIN, Info.userInfo)
    }
  },
  store_changeAvatar({ commit }, addr) {
    commit(SET_AVATAR, addr)
  },
  store_getPosition({ commit }) {
    return new Promise((res, rej) => {
      const geolocation = new BMap.Geolocation()
      geolocation.getCurrentPosition(pos => {
        let city = pos.address.city
        if (!city) return rej(flase)
        commit(SET_POS, city)
        res(true)
      })
    })

  }
}