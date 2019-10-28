const axios = require('./axios')
const qs = require('querystring')

export default {
  isLoged(resolve, reject) {
    axios.request({
      url: '/api/front/user/isLogined',
      method: 'get'
    })
      .then(res => {
        if (res.data.status === 9) resolve(false)
        if (res.data.status === 10) resolve(true)
      })
      .catch(err => {
        reject(err)
      })
  },
  logOut(resolve, reject) {
    axios.request({
      url: 'api/front/user/logOut',
      method: 'get'
    })
      .then(res => {
        console.log(res)
        if (res.data.status === 1) resolve(true)
        if (res.data.status === 0) resolve(false)
      })
      .catch(err => {
        reject(err)
      })
  },
  sendLeaveMessage(data, resolve, reject) {
    axios.request({
      url: 'api/front/interactive/leaveMessage',
      method: 'post',
      data: qs.stringify(data)
    })
      .then(res => {
        if (res.data.status === 1) resolve(true)
        if (res.data.status === 0) resolve(false)
      })
      .catch(err => {
        reject(err)
      })
  },
  getUserInfo(resolve, reject) {
    axios.request({
      url: 'api/front/user/isLogined',
      method: 'get',
    })
      .then(res => {
        if (res.data.status === 9) resolve(false)
        if (res.data.status === 10) resolve(true, res.data.userInfo)
      })
      .catch(err => {
        reject(err)
      })
  },
  getLeaveMessage(params, resolve, reject) {
    axios.request({
      url: 'api/front/interactive/getLeaveMessage',
      method: 'get',
      params
    })
      .then(res => {
        if (res.data.status === 1) resolve(res.data.leaveMessage)
      })
      .catch(err => {
        reject(err)
      })
  },
  updateLikesOrDislikes(data, resolve, reject) {
    axios.request({
      url   : 'api/front/interactive/upDateLeaveMessage',
      method: 'post',
      data : qs.stringify(data)
    })
      .then(res => {
        if (res.data.status === 1) resolve(true)
        if (res.data.status === 0) resolve(false)
      })
      .catch(err => {
        reject(err)
      })
  }
}
