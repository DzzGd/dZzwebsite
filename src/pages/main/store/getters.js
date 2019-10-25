export default {
  get_log_status(state) {
    return state.logStatus
  },
  get_userinfo(state) {
    let userInfo = {
      username : state.username,
      _id      : state._id,
    }
    return userInfo
  }
}