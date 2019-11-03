<template>
  <div class="load-more">
    <el-button type="primary" 
               plain 
               :loading="false" 
               class="load-more-button" 
               @click="loadMore"
               :disabled="!hasMore">
               {{hasMore ? '加载更多' : '没有啦'}}</el-button>
  </div>
</template>

<script>
export default {
  name: 'LoadMore',
  props: {
    hasMore: {
      type: Boolean,
      default: true
    }
  },
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