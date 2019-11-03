const axios = require('axios')


module.exports = {
  createAxios() {
    const instance = new axios.create({
      timeout: 5000,
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded'
      },
      baseURL: '/api/front/',
      // baseURL: 'http://127.0.0.1:5200/front/',
    })
    return instance
  },
  request(config) {
    const ax = this.createAxios()
    
    ax.interceptors.request
    .use(info => {
      return info
    }, err => {
      return err
    })

    ax.interceptors.response
    .use(info => {
      return info
    }, err => {
      return err
    })

    return ax(config)
  }
}