<template>
  <div class="friend-link">
    <p>暂未使用</p>
  </div>
</template>

<script>
export default {
  name: "FriendLink"
};
</script>

<style scoped lang="scss">
@import '@css/mixin';
.friend-link {
  position: relative;
  background-color: bisque;
  width: 100%;
  height: 300px;
  @include fj(center, row, center);
  p {
    font-weight: bold;
    font-size: 30px;
  }
}
</style>