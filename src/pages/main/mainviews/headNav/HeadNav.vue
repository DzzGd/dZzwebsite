<template>
  <el-header height="80px" class="head-nav" id="head-nav" :class="{isScrollTop: scrollTop}">
    <a href="/" class="logo-link">
      <div class="logo"></div>
    </a>

    <div class="menu">
      <head-nav-bar class="head-nav-bar"></head-nav-bar>
      <head-nav-avatar class="head-nav-avatar"></head-nav-avatar>
    </div>
  </el-header>
</template>

<script>
import HeadNavBar from "./childCmps/HeadNavBar";
import HeadNavAvatar from "./childCmps/HeadNavAvatar";
export default {
  name: "HeadNav",
  data() {
    return {
      scrollTop: false
    };
  },
  mounted() {
    this.$bus.$on("windowScroll", this.adjustHeadNav);
  },

  beforeDestroy() {
    this.$bus.$off("windowScroll", this.adjustHeadNav);
  },
  methods: {
    adjustHeadNav(scroll) {
      if (scroll >= 100) {
        this.scrollTop = true;
      } else {
        this.scrollTop = false;
      }
    }
  },
  components: {
    HeadNavBar,
    HeadNavAvatar
  }
};
</script>

<style scoped lang="scss">
@import "@css/mixin";
@media screen and (max-width: 570px) {
  #head-nav {
    height: 60px !important;
    .head-nav-bar {
      display: none;
    }
    .menu {
      justify-content: flex-end;
    }
  }
}
.isScrollTop {
  box-shadow: 2px 0 5px rgba(99, 99, 99, 0.3);
}
.head-nav {
  @include wh(100%, 80px);
  @include fj(space-between);
  @include positionLT(fixed, 0, 0, 2000);
  user-select: none;
  border-bottom: 1px solid rgba(99, 99, 99, 0.3);
  margin-bottom: 10px;
  background-color: rgb(250, 250, 250);
  .logo-link {
    @include positionLT(relative, 0, -6px, 1);
    .logo {
      @include wh(90px, 30px);
      display: block;
      @include bg("~@images/logos/header_logo.png", -260px, -232px);
    }
  }
  .menu {
    @include wh(520px, 80px);
    @include fj(normal);
    .head-nav-bar {
      flex: 1;
    }
    .head-nav-avatar {
      flex-basis: auto;
    }
  }
}

</style>