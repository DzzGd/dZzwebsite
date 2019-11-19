<template>
  <div class="head-nav-bar">
    <ul class="navbar-list">
      <li
        v-for="item in barList"
        :key="item.router"
        :class="currentRouter===item.router?'bb':''"
      >
        <router-link :to="item.router">{{item.font}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HeadNavBar",
  data() {
    return {
      barList: [
        { router: "/HomePage", font: "首页" },
        { router: "/TechShare", font: "技术分享" },
        { router: "/TechNews", font: "实时" },
        { router: "/WriteArticle", font: "写文章" },
        { router: "/FriendLink", font: "友情链接" }
      ],
      currentRouter: '/HomePage'
    };
  },
  watch: {
    $route(val) {
      this.currentRouter = val.path
    }
  }
};
</script>

<style scoped lang="scss">
.head-nav-bar {
  height: inherit;
  .navbar-list {
    width: 100%;
    display: flex;
    text-align: center;
    height: inherit;
    li {
      height: inherit;
      font-family: "新宋体";
      font-weight: bold;
      flex: 1;
      box-sizing: border-box;
      border-bottom: 4px solid transparent;
      height: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        color: #52a7fc;
        &:hover {
          color: #0080ff;
        }
      }
    }
    .bb {
      border-bottom: 4px solid #40a0ff96;
    }
  }
}
</style>