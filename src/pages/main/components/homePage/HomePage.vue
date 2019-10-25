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

    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
    <div>haha</div>
  </div>
</template>

<script>
import HomepageCarousel from './childCmps/HomepageCarousel'
import HomepageSlide    from './childCmps/HomepageSlide'
import HomepageContent  from './childCmps/HomepageContent'
export default {
  name: "HomePage.vue",
  components: {
    HomepageCarousel,
    HomepageSlide,
    HomepageContent
  }
};
</script>

<style scoped lang="scss">
.home-page {
  min-height: 600px;
  padding : 10px;
  overflow: hidden;
  border-right: 1px solid #eee;
  border-left : 1px solid #eee;
}

</style>