<template>
  <div class="homepage-article">
    <!-- 热门文章前三 -->
    <div class="article-container1">
      <homepage-content :title="'热度文章'"></homepage-content>
    </div>

    <!-- 大家说前三 -->
    <div class="article-container2">
      <homepage-content :title="'大家说'"></homepage-content>
    </div>

    <div class="article-container3">
      <homepage-tabs></homepage-tabs>
    </div>
  </div>
</template>

<script>
import HomepageContent from "./HomepageContent";
import HomepageTabs    from "./HomepageTabs"
export default {
  name: "HomepageArticle",
  data() {
    return {};
  },
  components: {
    HomepageContent,
    HomepageTabs
  }
};
</script>

<style scoped lang="scss">
.homepage-article {
  padding: 5px;
}
</style>