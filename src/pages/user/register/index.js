require('./index.less')
const userService = require('@common/network/user-service')
const tool = require('@common/utils/tool')

const Register = {
  registerInfo: {},
  regiBackInfo: 'REGISTER_BACKINFO',
  init() {
    this.fillForm()
    this.bindEvent()
  },
  // 载入localStorage
  setLocalstorage() {
    let info = {}
    info.username = this.registerInfo.username
    info.email = this.registerInfo.email
    localStorage.setItem(this.regiBackInfo, JSON.stringify(info))
  },
  // 回填用户信息
  fillForm() {
    let backInfo = JSON.parse(localStorage.getItem(this.regiBackInfo))
    if (!backInfo) return
    $('#username').val(backInfo.username)
    $('#email').val(backInfo.email)
  },
  // 获取表单数据
  getInfo() {
    this.registerInfo.username = $.trim($('#username').val())
    this.registerInfo.email = $.trim($('#email').val())
    this.registerInfo.password = $.trim($('#password').val())
    this.registerInfo.passwordConfirm = $.trim($('#password-confirm').val())
    this.setLocalstorage()
  },
  // 绑定事件 
  bindEvent() {
    const _this = this

    // 点击提交
    $('#submit').on('click', function () {
      _this.getInfo()

      // 判断信息内容
      let checkResult = _this.checkInfo(_this.registerInfo)
      if (checkResult.status) {
        userService.register(_this.registerInfo, res => {
          console.log(res)
        }, err => {
          console.log(err)
        })
      } else {
        console.log(checkResult.msg)
      }
    })

    $('.form-group:not(.submit-box) input').on('focus', function (e) {
      let target = $(e.target)
      target.next().css({ 'display': 'none' })
    })
    // 失去焦点即时检测
    $('.form-group:not(.submit-box) input').on('blur', function (e) {
      let target = $(e.target)
      let id = target.attr('id')
      let singleInfo = { [id]: target.val() }
      let ret = tool.validate(id, singleInfo)
      if (id === 'username') {
        if (ret) {
          userService.registerSingle(singleInfo, res => {
            if (res.status === 0) {
              target.next().css({ 'display': 'block' })
            }
          }, err => {
            console.log(err)
          })
        } else {
          console.log('用户名不能为空(4-10个字符)')
        }
      } else if (id === 'email') {
        if (ret) {
          userService.registerSingle(singleInfo, res => {
            if (res.status === 0) {
              target.next().css({ 'display': 'block' })
            }
          }, err => {
            console.log(err)
          })
        } else {
          console.log('用户名不能为空(4-10个字符)')
        }
      } else if (id === 'password') {

      } else if (id === 'username') {

      }
      e.stopPropagation()
    })
  },
  // 检查输入信息
  checkInfo(info) {
    let ret = { msg: '莫得问题', status: true }
    if (!tool.validate('username', info.username)) {
      ret.msg = '用户名不能为空(4-10个字符)'
      ret.status = false
      return ret
    } else if (!tool.validate('password', info.password)) {
      ret.msg = '密码不能为空(8-14个字符), 并且不能包含空格'
      ret.status = false
      return ret
    } else if (!tool.validate('email', info.email)) {
      ret.msg = '邮箱格式不正确'
      ret.status = false
      return ret
    } else if (info.password !== info.passwordConfirm) {
      ret.msg = '两次密码不相同'
      ret.status = false
      return ret
    } else {
      return ret
    }
  }
}

$(document).ready(function () {
  Register.init()
})