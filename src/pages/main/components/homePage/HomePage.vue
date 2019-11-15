<template>
  <div class="home-page">
    <homepage-swiper-box></homepage-swiper-box>

    <div class="article-container">
      <homepage-content title="热度文章" :show-list="topThree"></homepage-content>
    </div>
    <div class="article-container">
      <list-item :list-data="other"></list-item>
    </div>
    <load-more class="load-more" :hasMore="hasMore"></load-more>
    <div class="article-container">
      <homepage-tabs :hot-category="tabControlArticles"></homepage-tabs>
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
    }
  },
  components: {
    HomepageSwiperBox,
    HomepageContent,
    HomepageTabs,
    ListItem,
    LoadMore
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
    padding: 5px 5px 0;
  }
  .load-more {
    margin-right: 5px;
    margin-left: 5px;
  }
}
</style>