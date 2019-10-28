<template>
  <div class="load-more">
    <el-button type="primary" plain :loading="false" class="load-more-button" @click="loadMore">加载更多</el-button>
  </div>
</template>

<script>
export default {
  name: 'LoadMore',
  data() {
    return {

    }
  },
  methods: {
    loadMore() {
      this.$emit('loadMore')
    },
  }
};
</script>

<style scoped lang="scss">
.load-more-button {
  width  : 100%;
}
</style>