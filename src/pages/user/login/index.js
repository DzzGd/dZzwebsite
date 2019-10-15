require('./index.less')
const userService = require('@common/network/user-service')
const tool = require('@common/utils/tool')

const logIn = {
  userInfo: {},
  $alert: null,
  init() {
    this.$alert = $('.alert-danger')
    this.eventBind()
  },
  getUserInfo() {
    this.userInfo.username = $('.un').val()
    this.userInfo.password = $('.pwd').val()
  },
  // 幕布提示
  doSuccess() {
    $('.curtain').show()
    setTimeout(() => {
      tool.toTarget(tool.getRedirectUrl('redirect'))
    }, 1000);
  },
  eventBind() {
    const _this = this

    // 失去焦点时
    $('.form-group-item').on('focus', 'input', function () {
      return _this.$alert.hide()
    })

    // 提交表单 验证是否为空
    $('#login').on('click', function () {
      _this.getUserInfo()
      if (!tool.validate('username', _this.userInfo.username)) {
        return _this.$alert.text('用户名不能为空').show()
      }
      if (!tool.validate('password', _this.userInfo.password)) {
        return _this.$alert.text('密码不能为空').show()
      }
      // 发送请求
      userService.logIn(_this.userInfo, function (ret) {
        let msg = ret.msg
        if (ret.status === 1) {
          _this.$alert.removeClass('alert-danger').addClass('alert-success').text(msg).show()
          _this.doSuccess()
        } else if (ret.status === 0) {
          _this.$alert.removeClass('alert-success').addClass('alert-danger').text(msg).show()
        }
      }, function (err) {
        _this.$alert.removeClass('alert-success').addClass('alert-danger').text('网络出现错误,请稍后再试').show()
      })
    })
  }
}
$(document).ready(function () {
  logIn.init()
})