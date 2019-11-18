<style scoped lang='scss'>
.dz-dialog {
  .dz-dialog-header {
    .title {

    }
    .closeBth {

    }
  }
  .dz-dialog-container {

  }
  .dz-dialog-footer {

  }
}
</style>
<template>
  <div class="dz-dialog">
    <header class="dz-dialog-header">
      <h2 class="title">{{title}}</h2>
      <i class="closeBth">X</i>
    </header>
    <main class="dz-dialog-container"></main>
    <footer class="dz-dialog-footer"></footer>
  </div>
</template>
<script>
export default {
  name: "DZDialog",
  props: {
    title: {
      type: String,
      default: "对话框"
    },
    visible: {
      type: Boolean,
      default: false
    },
    bgOpacity: {
      type: Number,
      default: 0.5
    },
    width: {
      type: String,
      default: "50%"
    },
    height: {
      type: String,
      default: "auto"
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
