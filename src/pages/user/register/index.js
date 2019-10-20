require('./index.less')
const tool        = require('@common/utils/tool')
const userService = require('@common/network/user-service')

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
    info.email    = this.registerInfo.email
    info.username = this.registerInfo.username
    info.question = this.registerInfo.question
    info.answer = this.registerInfo.answer
    localStorage.setItem(this.regiBackInfo, JSON.stringify(info))
  },
  deletelocalStorage() {
    localStorage.removeItem(this.regiBackInfo)
  },
  // 回填用户信息
  fillForm() {
    let backInfo = JSON.parse(localStorage.getItem(this.regiBackInfo))
    if (!backInfo) return 0
    $('#username').val(backInfo.username)
    $('#email').val(backInfo.email)
    $('#question').val(backInfo.question)
    $('#answer').val(backInfo.answer)
  },
  // 获取表单数据 
  getInfo() {
    this.registerInfo.email    = $.trim($('#email').val())
    this.registerInfo.answer   = $.trim($('#answer').val())
    this.registerInfo.username = $.trim($('#username').val())
    this.registerInfo.password = $.trim($('#password').val())
    this.registerInfo.question = $.trim($('#question').val())
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
          if (res.status === 1) {
            _this.deletelocalStorage()
            alert('注册成功')
            tool.toTarget('login')
          } else {
            alert(res.msg)
          }
        }, err => {
          alert('网络错误')
        })
      } else {
        alert(checkResult.msg)
      }
    })

    $('.form-group:not(.submit-box) input').on('focus', function (e) {
      let target = $(e.target)
      target.next().css({ 'display': 'none' })
    })
    // 失去焦点即时检测
    $('.form-group:not(.submit-box) input').on('blur', function (e) {
      _this.getInfo()
      let target     = $(e.target)
      let id         = target.attr('id')
      let singleInfo = { [id]: target.val() }
      let ret        = tool.validate(id, target.val())
      if (ret) {
        if (id === 'password-confirm' && _this.registerInfo.password !== _this.registerInfo.passwordConfirm) target.next().text('两次密码不相同').css({ 'display': 'block' })
        if (id === 'password' || id === 'password-confirm' || id === 'question' || id === 'answer') return //密码问题答案不用发送请求
        userService.registerSingle(singleInfo, res => { // 发送请求
          if (res.status === 0) {
            target.next().text('已存在').css({ 'display': 'block' })
          }
        }, err => { 
          alert('网络错误')
        })
      } else {
        let errMsg = ''
        if (id === 'username') errMsg = '用户名不能为空或者含有空格(4-10个字符)'
        if (id === 'email'   ) errMsg = '邮箱格式不正确, 并且长度小于25个字符'
        if (id === 'password') errMsg = '密码不能为空(8-14个字符), 并且不能包含空格'
        if (id === 'password-confirm') errMsg = '不能为空(8-14个字符), 并且不能包含空格'
        if (id === 'question' || id === 'answer') errMsg = '不能为空'
        target.next().text(errMsg).css({ 'display': 'block' })
      }
      e.stopPropagation()
    })
  },
  // 检查输入信息
  checkInfo(info) {
    let ret = { msg: '莫得问题', status: true }
    if (!tool.validate('username', info.username)) {
      ret.msg = '用户名不能为空或者含有空格(4-10个字符)'
      ret.status = false
      return ret
    }
    else if (!tool.validate('email', info.email)) {
      ret.msg = '邮箱格式不正确, 并且长度小于25个字符'
      ret.status = false
      return ret
    }
    else if (!tool.validate('password', info.password)) {
      ret.msg = '密码不能为空(8-14个字符), 并且不能包含空格'
      ret.status = false
      return ret
    }
    else if (info.password !== info.passwordConfirm) {
      ret.msg = '两次密码不相同'
      ret.status = false
      return ret
    } else if (info.question === '' || info.answer === '') {
      ret.msg = '问题或者密码不能为空'
      ret.status = false
      return ret
    }
      return ret
  }
}

$(document).ready(function () {
  Register.init()
})