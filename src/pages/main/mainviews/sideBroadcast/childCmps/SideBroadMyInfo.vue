<template>
  <div class="side-broad-myinfo">
    <h2 class="title">我的信息</h2>
    <div class="container">
      <p>
        <span class="ptitle">叫啥:</span>
        <span>dzzgd | 油炸小书包</span>
      </p>
      <p>
        <span class="ptitle">现住:</span>
        <span>重庆市 渝北 | 南岸</span>
      </p>
      <p>
        <span class="ptitle">职业:</span>
        <span>高级前端...游民</span>
      </p>
      <p>
        <span class="ptitle">邮箱:</span>
        <span>190567444@qq.com</span>
      </p>
      <p>
        <span class="ptitle">分享或联系:</span>
      </p>
      <div class="share">
        <a href="http://wpa.qq.com/msgrd?v=3&uin=190567444&site=qq&menu=yes" target="blank">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-QQ" />
          </svg>
        </a>

        <a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=190567444@qq.com">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youxiang" />
          </svg>
        </a>
        <a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=190567444@qq.com">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weixin" />
          </svg>
        </a>
        <a href="http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=190567444@qq.com">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-share" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SideBroadMyInfo",
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang='scss'>
.side-broad-myinfo {
  margin: 10px 5px 0;
  padding: 20px;
  border-radius: 3px;
  background: url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573190278906&di=8e08388ecb7216b60f2a7fb08b9415ca&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F9%2F59c8c8057910e.jpg) -380px -480px;
  .title {
    font-size: 16px;
    line-height: 40px;
    color: rgb(72, 72, 72);
    font-weight: normal;
    position: relative;
    margin-bottom: 10px;
    border-bottom: 1px solid rgb(238, 238, 238);
    &:hover::after {
      width: 80px;
    }
    &::after {
      position: absolute;
      width: 60px;
      height: 2px;
      content: "";
      left: 0px;
      bottom: 0px;
      background: rgb(0, 0, 0);
      transition: all 0.5s ease 0s;
    }
  }
  .container {
    p {
      margin: 15px 0;
    }
    .ptitle {
      font-weight: bold;
    }
    .share {
      font-size: 38px;
      display: flex;
      justify-content: space-around;
      a {
        &:last-child{
          font-size: 32px;
        }
        &:hover{
          transition: .2s;
          transform: scale(1.2)
        }
      }
    }
  }
}
</style>
