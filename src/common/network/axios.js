const axios = require('axios')


module.exports = {
  createAxios() {
    const instance = new axios.create({
      timeout: 5000,
      headers: {
        'ContentType' : 'application/x-www-form-urlencoded'
      }
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