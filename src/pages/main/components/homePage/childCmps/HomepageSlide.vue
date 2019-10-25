<template>
  <div class="homepage-slide">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'HomepageSlide'
}
</script>

<style scoped lang="scss">
  .homepage-slide{
    flex-shrink: 0;
    width: 100%;
    img {
      width: 100%;
      max-height: 500px;
    }
  }
</style>