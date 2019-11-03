const axios = require('./axios')
const qs = require('querystring')
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
      url   : '/interactive/upDateLeaveMessage',
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
  },
  sendArticle(data, resolve, reject) {
    axios.request({
      url   : '/interactive/sendArticle',
      method: 'post',
      data : qs.stringify(data)
    })
      .then(res => {
        if (res.data.status === 500) reject(err)
        if (res.data.status === 1) resolve(true)
      })
      .catch(err => {
        reject(err)
      })
  },
  getRankArticles(resolve, reject) {
    axios.request({
      url   : '/interactive/getRankArticles',
      method: 'get',
    })
      .then(res => {
        if (res.data.status === 500) reject(err)
        if (res.data.status === 1) resolve(res.data.data)
      })
      .catch(err => {
        reject(err)
      })
  },
  getHotArticles(params, resolve, reject) {
    axios.request({
      url   : '/interactive/getHotArticles',
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
      url   : '/interactive/getSingleCategory',
      method: 'get',
      params: {
        category,
        currentPage
      }
    })
  },
  getArticleDetail(articleId) {
    return axios.request({
      url   : '/interactive/getArticleDetail',
      method: 'get',
      params: {
        articleId
      }
    })
  },
  sendComment(data, resolve, reject) {
    return axios.request({
      url   : '/interactive/sendComment',
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
      url   : '/interactive/getRelated',
      method: 'get',
      params: data
    })
  },
  increseWatch(arcitleId) {
    return axios.request({
      url   : '/interactive/increseWatch',
      method: 'get',
      params: { arcitleId }
    })
  },
  // getComments(articleId) {
  //   return axios.request({
  //     url   : '/interactive/getComments',
  //     method: 'get',
  //     params: { articleId }
  //   })
  // },
}
