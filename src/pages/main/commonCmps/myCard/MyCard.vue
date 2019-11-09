<template>
  <div class="my-card">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="body">
      <slot name="body"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCard",
};
</script>

<style scoped lang="scss">
.my-card {
  margin-bottom: 10px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  .header {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 8px 10px;
    font-size: 18px;
  }
  .body {
    border-top: 1px solid #ebeef5;
    font-size: 18px;
    padding: 10px;
    img{
      width: 100%;
    }
  }

  .footer {
    border-top: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 5px 10px;
    font-size: 16px;
  }
}
</style>