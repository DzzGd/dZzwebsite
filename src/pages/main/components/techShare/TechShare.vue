<template>
  <div class="tech-share">
    <div class="tech-share-header">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        menu-trigger="click"
        background-color="#fff"
        active-text-color="#e60023"
        text-color="#00965e"
        @select="handleSelect"
      >
        <el-menu-item index="1">HTML</el-menu-item>
        <el-menu-item index="2">CSS</el-menu-item>
        <el-menu-item index="3">JavaScript</el-menu-item>
        <el-menu-item index="5">Vue</el-menu-item>
        <el-menu-item index="6">Node</el-menu-item>
        <el-menu-item index="7">webpack</el-menu-item>
        <el-menu-item index="8">
          <a href="javascript:void(0)">React</a>
        </el-menu-item>
      </el-menu>
      <el-input placeholder="请输入内容"  clearable>
        <i slot="prefix" class="el-input__icon el-icon-search search-icon"
           ontouchstart=""
           @click="handleclcik"></i><!-- @touchstart="handleclcik" -->
      </el-input>
    </div>

    <div class="tech-share-list">
      <transition appear>
        <tech-share-list :data-list="arr"></tech-share-list>
      </transition>
      <load-more @loadMore="loadMore"></load-more>
    </div>
  </div>
</template>

<script>
import TechShareList from "./childCmps/TechShareList";
import LoadMore from "@commonCmps/loadMore/LoadMore";
export default {
  name: "TechShare",
  data() {
    return {
      activeIndex: "3",
      id: 5,
      arr: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      newarr: null
    };
  },
  methods: {
    handleSelect(index, indexPath) {},
    loadMore() {
      this.arr.push({ id: this.id++ });
    },
    handleclcik() {
     console.log(1)
    }
  },
  components: {
    TechShareList,
    LoadMore
  }
};
</script>

<style scoped lang="scss">
.el-menu-demo{
  display: flex !important;
  justify-content: flex-start;
  flex-wrap: wrap;
  li{
    height: 42px;
    line-height: 42px;
    flex: 0;
  }
}
.search-icon{
  cursor: pointer;
  &:hover{
    transform: scale(1.1);
  }

  &:active{
    color: rgb(0, 110, 70);
  }
}
.v-enter-active {
  transition: all 0.5s;
}
.v-enter {
  opacity: 0;
  transform: translate(4px, 4px);
}
.tech-share {
  margin-bottom: 10px;
}
</style>