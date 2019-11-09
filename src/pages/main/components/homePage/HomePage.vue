<template>
  <div class="home-page">
    <homepage-swiper-box></homepage-swiper-box>

    <div class="article-container">
      <homepage-content title="热度文章" :show-list="techshare"></homepage-content>
    </div>

    <!-- 大家说前三 -->
    <div class="article-container">
      <homepage-content :title="'大家说'" :show-list="techshare"></homepage-content>
    </div>

    <div class="article-container">
      <homepage-tabs :hot-category="hotRank"></homepage-tabs>
    </div>
  </div>
</template>

<script>
import HomepageSwiperBox from "./childCmps/HomepageSwiperBox";
import HomepageContent from "./childCmps/HomepageContent";
import HomepageTabs from "./childCmps/HomepageTabs";
import service from "@common/network/homepage-service";
export default {
  name: "HomePage.vue",
  data() {
    return {
      techshare: null,
      frindshare: {},
      tags: {
        JavaScript: 1,
        HTML: 1,
        CSS: 1
      },
      hotRank: null
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
          this.techshare = res.techshare;
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
          this.hotRank = res.data;
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
    HomepageTabs
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
    padding: 5px;
  }
}
</style>