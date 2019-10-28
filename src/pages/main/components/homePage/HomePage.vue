<template>
  <div class="home-page">
    <homepage-carousel>
      <homepage-slide>
        <img src="~@assets/images/homepage/slide1.jpg" alt="carouselImg" class="slide-item-img">
      </homepage-slide>
      <homepage-slide>
        <img src="~@assets/images/homepage/slide2.jpg" alt="carouselImg" class="slide-item-img">
      </homepage-slide>
    </homepage-carousel>

    <homepage-article>
      
    </homepage-article>
  </div>
</template>

<script>
import HomepageCarousel from './childCmps/HomepageCarousel'
import HomepageSlide    from './childCmps/HomepageSlide'
import HomepageContent  from './childCmps/HomepageContent'
import HomepageArticle  from './childCmps/HomepageArticle'
export default {
  name: "HomePage.vue",
  components: {
    HomepageSlide,
    HomepageContent,
    HomepageArticle,
    HomepageCarousel
  }
};
</script>

<style scoped lang="scss">
.home-page {
  min-height: 600px;
  overflow: hidden;
  border-right: 1px solid #eee;
  border-left : 1px solid #eee;
}

</style>