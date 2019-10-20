<template>
  <el-aside width="180px" class="side-adver">广告位</el-aside>
</template>

<script>
export default {
  name: "SideAdver"
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 992px) {
  .side-adver {
    display: none;
  }
}
.side-adver {
  border: 1px solid #eee;
}
</style>