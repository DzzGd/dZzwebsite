<template>
  <div class="dz-input">
    <div class="dz-input-comtainer">
      <input
        type="text"
        :placeholder="placeholder"
        class="dz-input-control"
        @keyup.enter="keyEvent"
        @input="inputchange"
        :value="value"
      />
      <i class="el-icon-view icon" @click="clickEvent"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "DzInput",
  props: {
    value: {
      default: ""
    },
    placeholder: {
      default: "请输入"
    }
  },
  data() {
    return {
    };
  },
  methods: {
    clickEvent() {
      this.$emit('clickEvent')
    },
    keyEvent() {
      this.$emit('keyupEvent')
    },
    inputchange(e) {
      console.log(123);

      const target = e.target || window.event.srcElement;
      this.$emit("input", target.value);
    }
  }
};
</script>
<style scoped lang='scss'>
.dz-input {
  margin-top: 4px;
  margin-bottom: 4px;
  .dz-input-comtainer {
    position: relative;
    .dz-input-control {
      width: 100%;
      outline: none;
      border: 1px solid #ddd;
      box-sizing: border-box;
      padding-left: 30px;
      padding-right: 30px;
      height: 40px;
      border-radius: 3px;
      transition: all 0.3s;
      font-size: 14px;
      color: #777;
      &:hover {
        border-color: #aaa;
      }
      &:focus {
        border-color: rgb(0, 150, 94);
      }
      &::placeholder {
        color: #777;
      }
    }
    .icon {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      margin: auto;
      width: 40px;
      text-align: center;
      cursor: pointer;
      &:active {
        color: #e60023;
        transform: scale(1.1);
      }
    }
  }
}
</style>