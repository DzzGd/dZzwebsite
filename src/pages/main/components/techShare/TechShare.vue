<template>
  <div class="tech-share">
    <div class="tech-share-header">
      <el-menu
        :default-active="currentCategory"
        class="el-menu-demo"
        mode="horizontal"
        menu-trigger="click"
        background-color="#fff"
        active-text-color="#e60023"
        text-color="#00965e"
        @select="handleSelect"
      >
        <el-menu-item index="HTML">HTML</el-menu-item>
        <el-menu-item index="CSS">CSS</el-menu-item>
        <el-menu-item index="JavaScript">JavaScript</el-menu-item>
        <el-menu-item index="Vue">Vue</el-menu-item>
        <el-menu-item index="Node">Node</el-menu-item>
        <el-menu-item index="webpack">webpack</el-menu-item>
        <el-menu-item index="React">
          <a href="javascript:void(0)">React</a>
        </el-menu-item>
      </el-menu>
      <el-input placeholder="请输入内容" clearable v-model="keyword">
        <i
          slot="prefix"
          class="el-input__icon el-icon-search search-icon"
          ontouchstart
          @click="handleclcik"
        ></i>
      </el-input>
    </div>

    <div class="tech-share-list">
        <tech-share-list :data-list="categoryList[currentCategory].list"></tech-share-list>
      <load-more @loadMore="loadMore" :hasMore="hasMore"></load-more>
    </div>
  </div>
</template>

<script>
import TechShareList from "./childCmps/TechShareList";
import LoadMore from "@commonCmps/loadMore/LoadMore";
import service  from "@common/network/homepage-service"
export default {
  name: "TechShare",
  data() {
    return {
      keyword: '',
      categoryList:{
        CSS :{currentPage: 0, list: [], totalPage: 0},
        HTML:{currentPage: 0, list: [], totalPage: 0},
        Vue :{currentPage: 0, list: [], totalPage: 0},
        Node:{currentPage: 0, list: [], totalPage: 0},
        React  :{currentPage: 0, list: [], totalPage: 0},
        webpack:{currentPage: 0, list: [], totalPage: 0},
        JavaScript:{currentPage: 0, list: [], totalPage: 0},
      },
      currentCategory: 'HTML'
    };
  },
  created() {
    this.getDataList(this.currentCategory)
  },
  methods: {
    handleSelect(category) {
      this.currentCategory = category
      if(this.categoryList[this.currentCategory].currentPage === 1) return
      this.getDataList(category)
    },
    loadMore() {
      this.getDataList(this.currentCategory)
    },
    handleclcik() {
      this.$router.push({
        path: '/SearchDetail' ,
        query: {
          type: 'keyword',
          value: this.keyword
        } 
      })
    },
    getDataList(category) {
      const page = ++this.categoryList[category].currentPage
      service.getSingleCategory(category, page).then(res => {
        console.log(res)
        if (res.data.status === 1) {
          this.categoryList[category].list.push(...res.data.data.list)
          this.categoryList[category].totalPage = res.data.data.totalPages
        }
      }).catch(err => {
        console.log(err)
      })
    },
  },
  computed:{
    hasMore() {
      if (this.categoryList[this.currentCategory].totalPage <= this.categoryList[this.currentCategory].currentPage) {
        return false
      }
      if (this.categoryList[this.currentCategory].totalPage === 0) {
        return false
      }
    }
  },
  components: {
    TechShareList,
    LoadMore
  }
};
</script>

<style scoped lang="scss">
.el-menu-demo {
  display: flex !important;
  justify-content: flex-start;
  flex-wrap: wrap;
  li {
    height: 42px;
    line-height: 42px;
  }
}
.search-icon {
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }

  &:active {
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