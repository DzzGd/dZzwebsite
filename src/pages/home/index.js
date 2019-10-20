require('./index.less')
const userService = require('@common/network/user-service')

userService.isLogined(res => {
  console.log(res)
}, err => {
  console.log(err)
})