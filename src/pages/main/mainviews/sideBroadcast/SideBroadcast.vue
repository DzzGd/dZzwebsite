<template>
  <el-aside width="220px" class="side-broadcast">this is 信息发布 框</el-aside>
</template>

<script>
export default {
  name: "SideBroadcast"
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  .side-broadcast {
    display: none;
  }
}
.side-broadcast {
  border: 1px solid #eee;
}
</style>