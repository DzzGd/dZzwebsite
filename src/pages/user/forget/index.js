require('./index.less')

const userService = require('@common/network/user-service')
const tool = require('@common/utils/tool')

class Forget {
  constructor() {
    this.status        = ['stepOne', 'stepTwo', 'stepThree', 'stepFour']
    this.color         = ['#e60023', '#ffc107', '#007bff', '#28a745']
    this.progress      = $('.progress')
    this.progressNum   = 4
    this.singleProgressWidth = 100 / this.progressNum// 25 不带单位 %
    this.currentStatus = 0 //当前处于哪一步内容框
    this.currentStatusBox = $('.' + this.status[this.currentStatus]) // 获取当前内容框的对象
    this.isPreButton = false // 上一步按钮是否可以使用
    this.preButton   = $('#preStep')
    this.nextButton  = $('#nextStep')
    this.resetInfo   = {}
    this.$errTip     = $('.errTip')
    this.$loading    = $('.icon-loading')
    this.$question   = $('#question')
    this.question    = ''
  }

  init(){
    this.banPreButton()
    this.changeProgressWidth()
    this.bindEvent() //绑定事件
  }
  changeProgressWidth() {
    this.progress.children('.progress-bar').css(
      {
        width: (this.currentStatus + 1) * this.singleProgressWidth + '%',
        background: this.color[this.currentStatus]
      })
  }
  banPreButton() {
    this.preButton.prop({disabled: true})
  }
  usePreButton() {
    this.preButton.prop({disabled: false})
  }
  checkPreButton () { //检查pre按钮的可用状态
    if (this.currentStatus === 0) {
      this.banPreButton()
    } else {
      this.usePreButton()
    }
  }
  switchStatus(num) {  // 切换当前步骤状态
    this.currentStatus = Math.max(0, num)
    this.currentStatus = Math.min(this.status.length - 1, this.currentStatus)
    this.checkPreButton()
    this.currentStatusBox = $('.' + this.status[this.currentStatus])
    this.switchToShowOrHide()
    this.changeProgressWidth()
  }
  switchToShowOrHide() { //显示隐藏步骤容器
    // this.errTips(false)
    $('.' + this.status[this.currentStatus]).show().siblings('.stepBox').hide()
  }

  checkInput() {
    let inputs = this.currentStatusBox.find('input')
    if (this.currentStatus === 0) {
      let username = inputs[0].value
      if (!username) {
        this.errTips(true, '用户名不能为空')
        return false
      }
      this.resetInfo.username = username
    } else if (this.currentStatus === 1) {
      let email = inputs[0].value
      if (!email) {
        this.errTips(true, '邮箱不能为空')
        return false
      }
      this.resetInfo.email = email
    } else if (this.currentStatus === 2) {
      let question = inputs[0].value
      let answer   = inputs[1].value
      if (!answer) {
        this.errTips(true, '答案不能为空')
        return false
      }
      this.resetInfo.question = question
      this.resetInfo.answer = answer
    } else if (this.currentStatus === 3) {
      let password = inputs[0].value
      let passwordConfim = inputs[1].value
      if (!tool.validate('password', password)) {
        this.errTips(true, '格式不正确不能含有空格(8-16个字符)')
        return false
      }
      if (password !== passwordConfim) {
        this.errTips(true, '两次密码不相同')
        return false
      }
      this.resetInfo.password = password
      this.resetInfo.passwordConfim = passwordConfim
    }
    return true
  }
  bindEvent() {
    $('.stepBox').find('input').on('focus', () => {
      this.errTips(false)
    })
    this.preButton.on('click', (e) => {
      e.preventDefault()
      this.switchStatus(this.currentStatus -1)
    })
    this.nextButton.on('click', (e) => {
      e.preventDefault()//阻止默认事件跳转
      if (this.checkInput()) { //数据格式检测
        if (this.currentStatus === 1 || this.currentStatus === 3) { //如果是请求问题
          this.doLoading()
          userService.forget(this.resetInfo) 
                    .then(res => {
                      if (this.currentStatus === 1){
                        this.$question.val(res.data.question)
                        this.responseDo1(res)
                      } else {
                        this.responseDo(res)
                      }
                      this.switchStatus(res.data.exStatus)
                      this.cancelLoading()
                    })
                    .catch(err => {
                      this.cancelLoading()
                      this.errTips(true, '网络错误, 请稍后再试')
                    })
        } else {
          this.switchStatus(this.currentStatus + 1)
        }
      }
    })
  }

  // 响应检测错误信息跳转和成功跳转
  responseDo(res) {
    var res = res.data
    if (res.status === 1) {
      alert('修改成功')
      tool.toTarget('login')
    } else {
      this.errTips(true, res.msg)
    }
  }
  // 响应得到问题
  responseDo1(res) {
    var res = res.data
    if (res.exStatus === 0) {
      this.errTips(true, res.msg)
    } 
  }
  doLoading() {
    this.loading(true)
    this.nextButton.prop({disabled :true})
  }
  cancelLoading() {
    this.loading(false)
    this.nextButton.prop({disabled :false})
  }
  errTips(is, text) {
    if (is) this.$errTip.text(text).show()
    if (!is) this.$errTip.hide()
  }
  loading(is) {
    if (is ) this.$loading.show()
    if (!is) this.$loading.hide()
  }
}

$(document).ready(function() {
  (new Forget()).init()
})