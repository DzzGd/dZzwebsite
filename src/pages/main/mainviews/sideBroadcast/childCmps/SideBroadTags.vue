<template>
  <div class="side-broad-tags">
    <h2 class="title">本站标签</h2>
    <div class="tags-container">
      <span class="tags"
            v-for="item in tagNumber"
            :key="item.name"
            @click="toSearch(item.name)">
        <span>{{item.name}}</span>
        <span>({{item.number}})</span>
      </span>
    </div>
  </div>
</template>

<script>
import service from '@common/network/homepage-service'
export default {
  name: "SideBroadTags",
  props: {
    tagNumber: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    toSearch(name) {
      this.$router.push({
        path: '/SearchDetail',
        query: {
          type: 'tag',
          value: name
        }
      })
    }
  }
};
</script>

<style scoped lang="scss">
@import '@css/mixin';
.side-broad-tags {
  margin: 10px 5px 0;
  background-color: #fff;
  @include borderRadius(3px);
  padding: 20px;
  .title {
    @include shc(16px, 40px, rgb(72, 72, 72));
    font-weight: normal;
    position: relative;
    margin-bottom: 10px;
    border-bottom: 1px solid rgb(238, 238, 238);
    &:hover::after{
      width: 80px;
    }
    &::after{
      @include positionLB(absolute, 0, 0);
      @include wh(60px, 2px);
      content: "";
      background: rgb(0, 0, 0);
      transition: all 0.5s ease 0s;
    }
  }

  .tags-container{
    display: flex;
    flex-wrap: wrap;
    .tags{
      cursor: pointer;
      user-select: none;
      margin-right: 10px;
      margin-bottom: 5px;
      padding:3px 5px;
      line-height: 1.5;
      border-radius: 2px;
      background-color: lightblue;
      color: #fff;
    }
  }
}
</style>
