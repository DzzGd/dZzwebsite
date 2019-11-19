<template>
  <div class="home-page">
    <homepage-swiper-box/>
    <!-- 1. 我的文章-->
    <div class="article-container">
      <homepage-content title="我的文章" :show-list="topThree"/>
      <list-item :list-data="other"/>
      <load-more class="load-more" :hasMore="hasMore" @loadMore="loadMore"/>
    </div>
    <!-- 2. 基础分类-->
    <div class="article-container">
      <homepage-tabs :hot-category="tabControlArticles"/>
    </div>
    <!-- 3. cnode社区文章 -->
    <div class="article-container">
      <homepage-node-community/>
    </div>

  </div>
</template>

<script>
import HomepageSwiperBox from "./childCmps/HomepageSwiperBox";
import   HomepageContent from "./childCmps/HomepageContent";
import      HomepageTabs from "./childCmps/HomepageTabs";
import          ListItem from "@commonCmps/listItem/ListItem"
import          LoadMore from "@commonCmps/loadMore/LoadMore"
import           service from "@common/network/homepage-service";
import HomepageNodeCommunity from "./childCmps/HomepageNodeCommunity"
export default {
  name: "HomePage.vue",
  data() {
    return {
      topThree: [],
      other: [],
      homepageArticles:{ page: 0, list :[], totalpages: 1 },
      tags: {
        JavaScript: 1,
        HTML: 1,
        CSS: 1
      },
      tabControlArticles: null
    };
  },
  created() {
    // 请求数据
    this.getRankArticles();
    this.getHotArticles();
  },
  methods: {
    getRankArticles() {
      service.getRankArticles(
        { currentPage: ++this.homepageArticles.page, quantity: 10 },
        res => {
          this.homepageArticles.list.push(...res.data.data)
          this.topThree = this.homepageArticles.list.slice(0, 3);
          this.other    = this.homepageArticles.list.slice(3)
          this.homepageArticles.totalpages = res.total
        },
        err => {
          console.log(err);
        }
      );
    },
    getHotArticles() {
      service.getHotArticles(
        this.tags,
        res => {
          this.tabControlArticles = res.data;
        },
        err => {
          setTimeout(() => {
            this.getHotArticles();
          }, 10 * 1000);
        }
      );
    },
    loadMore() {

    },
  },
  components: {
    HomepageSwiperBox,
    HomepageContent,
    HomepageTabs,
    ListItem,
    LoadMore,
    HomepageNodeCommunity
  },
  computed: {
    hasMore() {
      return this.homepageArticles.page < this.homepageArticles.totalpages
    }
  }
};
</script>

<style scoped lang="scss">
.home-page {
  min-height: 600px;
  overflow: hidden;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
  .article-container {
    background-color: #ffffff;
    padding: 5px 5px 0;
  }
}
</style>