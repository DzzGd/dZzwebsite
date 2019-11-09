<template>
  <div class="side-broad-tags">
    <h2 class="title">本站标签</h2>
    <div class="tags-container">
      <span class="tags"
            v-for="item in tagNumber"
            :key="item.name">
        <span>{{item.name}}</span>
        <span>({{item.number}})</span>
            
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideBroadTags",
  props: {
    tagNumber: {
      type: Array,
      default: []
    }
  }
};
</script>

<style scoped lang="scss">
.side-broad-tags {
  margin: 10px 10px 0;
  background-color: #fff;
  border-radius: 3px;
  padding: 20px;
  .title {
    font-size: 16px;
    line-height: 40px;
    color: rgb(72, 72, 72);
    font-weight: normal;
    position: relative;
    margin-bottom: 10px;
    border-bottom: 1px solid rgb(238, 238, 238);
    &:hover::after{
      width: 80px;
    }
    &::after{
      position: absolute;
      width: 60px;
      height: 2px;
      content: "";
      left: 0px;
      bottom: 0px;
      background: rgb(0, 0, 0);
      transition: all 0.5s ease 0s;
    }
  }

  .tags-container{
    display: flex;
    flex-wrap: wrap;
    .tags{
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
