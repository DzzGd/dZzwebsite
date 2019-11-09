<template>
  <div class="tech-news-nav">
    <ul class="nav-list">
      <li class="nav-item" v-for="(item,index) in contentArr" :key="item">
        <span @click="changeIndex(index)" :class="currentIndex===index?'active':''">{{item}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TechNewsNav",
  data() {
    return {
      currentIndex: 0,
      contentArr: ["新闻", "科技", "手机"]
    };
  },
  components: {
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
      this.$emit('changeIndex', this.currentIndex)
    }
  }
};
</script>

<style scoped lang="scss">
.active {
  background-color: lightblue;
  width: 100% !important;
}
.tech-news-nav {
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  .nav-list {
    display: flex;
    .nav-item {
      flex: 1;
      text-align: center;
      span {
        width: 48px;
        height: 42px;
        box-sizing: border-box;
        cursor: pointer;
        display: inline-block;
        line-height: 42px;
        transition: width 0.3s;
        &:hover {
          background-color: lightblue;
        }
      }
    }
  }
}
</style>