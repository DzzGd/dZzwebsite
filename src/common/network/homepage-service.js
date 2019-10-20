const axios =  require('./axios')

export default {
  isLoged(resolve, reject) {
    axios.request({
      url: '/api/front/isLogined',
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
      url: 'api/front/logOut',
      method: 'get'
    })
    .then(res => {
      if (res.data.status === 1) resolve(true)
      if (res.data.status === 0) resolve(false)
    })
  }
}
