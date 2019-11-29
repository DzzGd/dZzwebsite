const axios = require('./axios')
// const qs = require('querystring')
const qs = JSON
export default {
  isLoged(resolve, reject) {
    axios.request({
      url: '/user/isLogined',
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
      url: '/user/logOut',
      method: 'get'
    })
      .then(res => {

        if (res.data.status === 1) resolve(true)
        if (res.data.status === 0) resolve(false)
      })
      .catch(err => {
        reject(err)
      })
  },
  sendLeaveMessage(data, resolve, reject) {
    axios.request({
      url: '/interactive/leaveMessage',
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
      url: '/user/isLogined',
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
      url: '/interactive/getLeaveMessage',
      method: 'get',
      params
    })
      .then(res => {
        if (res.data.status === 1) resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  },
  updateLikesOrDislikes(data, resolve, reject) {
    axios.request({
      url: '/interactive/upDateLeaveMessage',
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
  sendArticle(data, resolve, reject) {
    axios.request({
      url: '/interactive/sendArticle',
      method: 'post',
      data: JSON.stringify(data)
    })
      .then(res => {
        if (res.data.status === 500) reject()
        if (res.data.status === 2) reject()
        if (res.data.status === 1) resolve(true)
      })
      .catch(err => {
        reject(err)
      })
  },
  getRankArticles(params, resolve, reject) {
    axios.request({
      url: '/interactive/getRankArticles',
      method: 'get',
      params
    })
      .then(res => {
        if (res.data.status === 500) reject(err)
        if (res.data.status === 1) resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  },
  getHotArticles(params, resolve, reject) {
    axios.request({
      url: '/interactive/getHotArticles',
      method: 'get',
      params
    })
      .then(res => {
        if (res.data.status === 500) reject(err)
        if (res.data.status === 1) resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  },
  getSingleCategory(category, currentPage) {
    return axios.request({
      url: '/interactive/getSingleCategory',
      method: 'get',
      params: {
        category,
        currentPage
      }
    })
  },
  getArticleDetail(articleId) {
    return axios.request({
      url: '/interactive/getArticleDetail',
      method: 'get',
      params: {
        articleId
      }
    })
  },
  sendComment(data, resolve, reject) {
    return axios.request({
      url: '/interactive/sendComment',
      method: 'post',
      data: qs.stringify(data)
    }).then(res => {
      if (res.status === 500) return reject('服务器错误')
      resolve(res)
    }).catch(err => {
      console.log(err)
      reject(err)
    })
  },
  getRelated(data) {
    return axios.request({
      url: '/interactive/getRelated',
      method: 'get',
      params: data
    })
  },
  increseWatch(articleId) {
    return axios.request({
      url: '/interactive/increseWatch',
      method: 'get',
      params: { articleId }
    })
  },

  getNewsList(type, page, resolve, reject) {
    return axios.request({
      url: '/interactive/getNewsList',
      method: 'get',
      params: { type, page }
    }).then(res => {
      if (res.data.status !== 1) return reject()
      resolve(JSON.parse(res.data.data))
    }).catch(err => reject(err))
  },

  getTagsCategory(tagCategory, resolve, reject) {
    return axios.request({
      url: '/interactive/gettagscategory',
      method: 'get',
      params: { tagCategory }
    }).then(res => {
      resolve(res.data)
    }).catch(err => reject(err))
  },

  getTagNumber(resolve, reject) {
    return axios.request({
      url: '/interactive/gettagnumber',
      method: 'get'
    }).then(res => {
      resolve(res.data)
    }).catch(err => reject(err))
  },

  getCalendarData(start, end, resolve, reject) {
    return axios.request({
      url: '/interactive/getcalendardata',
      method: 'get',
      params: { start, end }
    }).then(res => {
      resolve(res.data)
    }).catch(err => reject(err))
  },
  getGuessLike(resolve, reject) {
    return axios.request({
      url: '/interactive/getguesslike',
      method: 'get'
    }).then(res => {
      resolve(res.data)
    }).catch(err => reject(err))
  },

  getSearchData(type, currentPage, quantity, value, resolve, reject) {
    return axios.request({
      url: '/interactive/getsearchdata',
      method: 'get',
      params: { type, currentPage, quantity, value }
    }).then(res => {
      resolve(res.data)
    }).catch(err => reject(err))
  },

  imgUpload(formData, resolve, reject) {
    return axios.request2({
      url: '/articles',
      method: 'post',
      data: formData
    }).then(res => {
      resolve(res.data.imgUrl)
    }).catch(err => reject(err))
  },

  getAvatarList(currentPage, quantity, resolve, reject) {
    return axios.request({
      url: '/interactive/getavatarlist',
      method: 'get',
      params: {
        currentPage,
        quantity
      }
    }).then(res => {
      resolve(res.data)
    }).catch(err => reject(err))
  },

  setAvater(id, addr, resolve, reject) {
    return axios.request({
      url: '/interactive/setavatar',
      method: 'post',
      data: qs.stringify({id, addr})
    }).then(res => {
      resolve(res.data)
    }).catch(err => reject(err))
  },

  getCnodeCommunity(params, resolve, reject) {
    return axios.request3({
      url: '/topics',
      method: 'get',
      params
    }).then(res => {
      resolve(res.data)
    }).catch(err => reject(err))
  }
}
