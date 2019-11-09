<template>
  <div class="tech-news">
    <tech-news-nav @changeIndex="changeIndex"></tech-news-nav>

    <tech-news-list :info-list="infoList"></tech-news-list>

    <load-more @loadMore="loadMore"></load-more>
  </div>
</template>

<script>
import TechNewsList from "./childCmps/TechNewsList";
import TechNewsNav from "./childCmps/TechNewsNav";
import LoadMore    from "@commonCmps/loadMore/LoadMore"
import service from '@common/network/homepage-service'
export default {
  name: "TechNews",
  data() {
    return {
      currentType: 'news',
      newsList: { news: { page: 0, list: [] },
                  tech: { page: 0, list: [] },
                  phone: { page: 0, list: [] } }
    };
  },
  created() {
    this.getNewsList('news')
    this.getNewsList('tech')
    this.getNewsList('phone')
  },
  components: {
    TechNewsNav,
    TechNewsList,
    LoadMore
  },
  methods: {
    changeIndex(index) {
      let type = ''
      switch (index) {
        case 0: type  = 'news'; break;
        case 1: type  = 'tech'; break;
        case 2: type  = 'phone'; break;
        default: type = 'news'; break;
      }
      this.currentType = type;
    },
    getNewsList(type) {
      let page = ++this.newsList[type].page
      service.getNewsList(type, page, res => {
        this.newsList[type].list.push(...res)
      }, err => {
        this.$message.error('网络错误~')
      })
    },
    loadMore() {
      this.getNewsList(this.currentType)
    }
  },
  computed: {
    infoList() {
      return this.newsList[this.currentType].list
    }
  }
};
</script>

<style scoped lang="scss">
.tech-news {

}
</style>