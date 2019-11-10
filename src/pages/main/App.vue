<template>
  <div class="App">
    <!-- class="is-vertical" 是element-ui竖直布局的标识 不能删 -->
    <el-container class="is-vertical">
      <!-- 头部 -->
      <head-nav></head-nav>
      <div class="container">
        <el-container class="main-body">
          <!-- 侧边广告 -->
          <side-adver></side-adver>

          <!-- 主体 -->
          <el-main class="el-main">
            <transition name="body-transition" mode="out-in">
              <keep-alive exclude="ArticleDetail,SearchDetail">
                <router-view></router-view>
              </keep-alive>
            </transition>
          </el-main>

          <!-- 侧边信息广播 -->
          <side-broadcast></side-broadcast>
        </el-container>
      </div>

      <leave-message class="dz-leave-message"></leave-message>
      <!-- 底部 -->
      <footer-content></footer-content>
      <back-to-top :duration="300">
        <img src="~@assets/images/homepage/top.jpg" alt="">
      </back-to-top>
    </el-container>
  </div>
</template> 
<script>
import HeadNav from "@mainviews/headNav/headNav";
import MainBody from "@mainviews/mainBody/MainBody";
import SideAdver from "@mainviews/sideAdver/SideAdver";
import SideBroadcast from "@mainviews/sideBroadcast/SideBroadcast";
import FooterContent from "@mainviews/footerContent/FooterContent";

import LeaveMessage from "@commonCmps/leaveMessage/LeaveMessage";

import BackToTop from "@commonCmps/backToTop/BackToTop"
import homepageService from "@common/network/homepage-service";
import { debounce, throttle } from "@common/utils/apptools";
export default {
  name: "App",
  data: () => ({
    resiponsiveView: true
  }),
  created() {
    this.getUserInfo();
  },
  mounted() {
    // 全局宽度变化和滚动监听  设定事件总线
    let windowResize = debounce(this.resiponsiveResize, 50);
    let windowScroll = throttle(this.resiponsiveScroll, 50);
    window.addEventListener("resize", e => {
      windowResize();
    });
    document.addEventListener("scroll", e => {
      windowScroll();
    });
  },
  methods: {
    resiponsiveResize() {
      this.$bus.$emit("resizeWindow", document.body.clientWidth);
    },
    resiponsiveScroll() {
      let scrolltop =
        document.documentElement.scrollTop || document.body.scrollTop;
      this.$bus.$emit("windowScroll", scrolltop);
    },
    // 获取全局登录状态
    getUserInfo() {
      homepageService.getUserInfo(
        (isAccess, userInfo) => {
          if (!isAccess)
            return this.$store.dispatch("store_changeLogStatus", {
              access: false
            });
          this.$store.dispatch("store_changeLogStatus", {
            access: true,
            userInfo
          });
        },
        err => {
          this.$store.dispatch("store_changeLogStatus", { access: false });
        }
      );
    }
  },
  components: {
    HeadNav,
    MainBody,
    SideAdver,
    SideBroadcast,
    FooterContent,
    LeaveMessage,
    BackToTop
  }
};
</script>
<style lang="scss" scoped>
.body-transition-enter-active,
.body-transition-leave-active {
  transition: all 0.3s;
}
.body-transition-enter,
.body-transition-leave-to {
  opacity: 0;
  transform: scale(.99)
}
</style>
<style lang="scss">
@media screen and (min-width: 320px) and (max-width: 991px) {
  .main-body{
    flex-wrap: wrap !important;
  }
  .dz-leave-message {
    display: block !important;
  }
}
@media screen and (max-width: 570px) {
  .is-vertical {
    padding-top: 60px !important;
  }
}

body {
  background-color: #E9EAED;
  .dz-leave-message {
    display: none;
  }
  .is-vertical {
    padding-top: 80px;
  }
  .main-body {
    max-width: 1400px;
    margin: 0 auto;
  }
  .el-main {
    padding: 0;
    overflow: hidden;
  }
  &::-webkit-scrollbar {
    width: 4px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(119, 190, 214);
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
}
</style>