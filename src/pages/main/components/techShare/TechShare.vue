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
        <el-menu-item index="React">React</el-menu-item>
        <el-menu-item index="other">其他</el-menu-item>
      </el-menu>
    </div>
    <dz-input v-model="keyword" 
              @clickEvent="handleclcik"
              @keyupEvent="handleclcik"></dz-input>
    <list-item :list-data="categoryList[currentCategory].list"></list-item>
    <load-more @loadMore="loadMore" :hasMore="hasMore"></load-more>

  </div>
</template>

<script>
import      ListItem from "@commonCmps/listItem/ListItem"
import      LoadMore from "@commonCmps/loadMore/LoadMore"
import       service from "@common/network/homepage-service"
import       DzInput from "@commonCmps/dzInput/DzInput"
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
        other:{currentPage: 0, list: [], totalPage: 0},
      },
      currentCategory: 'HTML',
      firstLoad: true
    };
  },
  created() {
    this.getDataList(this.currentCategory)
  },
  activated() {
    if (this.firstLoad) return this.firstLoad = false
    for(let item of Object.keys(this.categoryList)) {
      this.categoryList[item].currentPage = 0
      this.categoryList[item].list = []
      this.categoryList[item].totalPages = 0
    }
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
        if (res.data.status === 1) {
          this.categoryList[category].list.push(...res.data.data.list)
          this.categoryList[category].totalPage = res.data.data.totalPages
        }
      }).catch(err => {})
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
    ListItem,
    LoadMore,
    DzInput
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