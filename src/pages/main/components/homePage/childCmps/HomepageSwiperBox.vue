<template>
  <div class="homepage-swiper-box">
    <homepage-carousel>
      <homepage-slide>
        <img src="~@assets/images/homepage/slide1.jpg" alt="carouselImg" class="slide-item-img" />
      </homepage-slide>
      <homepage-slide>
        <img src="~@assets/images/homepage/slide2.jpg" alt="carouselImg" class="slide-item-img" />
      </homepage-slide>
    </homepage-carousel>
  </div>
</template>

<script>
import HomepageCarousel from "./HomepageCarousel";
import HomepageSlide    from "./HomepageSlide";
export default {
  name: "HomepageSwiperBox",
  components: {
    HomepageCarousel,
    HomepageSlide
  }
};
</script>

<style scoped lang="scss">
</style>