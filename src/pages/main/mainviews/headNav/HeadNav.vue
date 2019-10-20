<template>
  <el-header height="80px" class="head-nav">
    <div class="logo">
      <a href="/" class="logo-link"></a>
    </div>

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
  components: {
    HeadNavBar,
    HeadNavAvatar
  }
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 570px) {
  .head-nav {
    height: 60px !important;
    .head-nav-bar {
      display: none;
    }
    .menu {
      justify-content: flex-end;
    }
  }
}
.head-nav {
  user-select: none;
  height: 80px;
  width: 100%;
  margin: 0 auto;
  border-bottom: 1px solid rgba(99, 99, 99, 0.3);
  margin-bottom: 10px;
  background-color: rgb(250, 250, 250);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    background: url("~@images/logos/4.png") no-repeat -260px -232px;
    position: relative;
    left: 0px;
    top: -6px;
    .logo-link {
      display: block;
      height: 30px;
      width: 90px;
    }
  }
  .menu {
    height: 80px;
    width: 520px;
    display: flex;
    align-items: center;
    .head-nav-bar {
      flex: 1;
    }
    .head-nav-avatar {
      flex-basis: auto;
    }
  }
}
</style>