<template>
  <div class="head-nav-bar">
    <ul class="navbar-list">
      <li>
        <router-link to="/HomePage">首页</router-link>
      </li>
      <li>
        <router-link to="/TechShare">技术分享</router-link>
      </li>
      <li>
        <router-link to="/FriendShare">大家分享</router-link>
      </li>
      <li>
        <router-link to="/Entertainment">娱乐</router-link>
      </li>
      <li>
        <router-link to="/FriendLink">友情链接</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HeadNavBar"
};
</script>

<style scoped lang="scss">
.navbar-list {
  width: 100%;
  display: flex;
  text-align: center;
  li {
    flex: 1;
    height: 80px;
    box-sizing: border-box;
    border-bottom: 4px solid transparent;

    &:hover {
      border-bottom: 4px solid #40a0ff96;
      // background-color: #40a0ff96;
    }
    a {
      line-height: 80px;

      color: #52a7fc;
      &:hover {
        color: #0080ff;
      }
    }
  }
}
</style>