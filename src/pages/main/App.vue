<template>
  <div class="App">
    <el-container class="is-vertical">
      <!-- 头部 -->
      <head-nav></head-nav>

      <el-container>
        <!-- 侧边广告 -->
        <side-adver></side-adver>

        <!-- 主体 -->
        
        <router-view></router-view>
        <!-- 侧边信息广播 -->
        <side-broadcast></side-broadcast>

      </el-container>

      <!-- 底部 -->
      <footer-content></footer-content>
    </el-container>
  </div>
</template> 
<script>
import HeadNav from "@mainviews/headNav/headNav";
import MainBody from "@mainviews/mainBody/MainBody";
import SideAdver from "@mainviews/sideAdver/SideAdver";
import SideBroadcast from "@mainviews/sideBroadcast/SideBroadcast";
import FooterContent from "@mainviews/footerContent/FooterContent";

import { debounce } from "@common/utils/homepagetool"
export default {
  name: "App",
  data: () => ({
    resiponsiveView: true
  }),
  mounted() {
    let windowResize = debounce(this.resiponsiveEvent, 50)
    window.addEventListener('resize', (e) => {
      windowResize()
    })
  },
  methods: {
    resiponsiveEvent() {
      this.$bus.$emit('resizeWindow', document.body.clientWidth)
    }
  },
  components: {
    HeadNav,
    MainBody,
    SideAdver,
    SideBroadcast,
    FooterContent
  }
};
</script>
<style lang="scss">
body {
  &::-webkit-scrollbar {
    width: 4px;
    height: 10px;
    // display: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: lightblue;
  }
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
}

</style>