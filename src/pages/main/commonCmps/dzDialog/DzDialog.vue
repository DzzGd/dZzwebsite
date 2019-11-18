<style scoped lang='scss'>
.dz-dialog {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  .dz-dialog-container {
    z-index: 2001;
    position: relative;
    left: 50%;
    top: 30vh;
    width: 375px;
    transform: translateX(-50%);
    background-color: #fff;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 3px;
    .dz-dialog-header {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      .title {
        font-size: 18px;
      }
      .closeBth {
        color: #00965e;
        cursor: pointer;
      }
    }
    .dz-dialog-body {
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .dz-dialog-footer {
      button {
        float: right;
        display: block;
        font-weight: 400;
        color: #212529;
        text-align: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        background-color: transparent;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 0.25rem;
        transition: color 0.15s;
        cursor: pointer;
        color: #fff;
        outline: none;
      }
      .cancel {
        background-color: #6c757d;
        border-color: #6c757d;
        &:hover {
          background-color: #5a6268;
          border-color: #545b62;
        }
        &:active {
          background-color: #545b62;
          border-color: #4e555b;
        }
      }
      .submit {
        background-color: #00965e;
        border-color: #00965e;
        margin-right: 10px;
        &:hover {
          background-color: #007046;
          border-color: #00633e;
        }
        &:active {
          background-color: #00633e;
          border-color: #005636;
        }
      }
    }
  }
}
.dz-dialog-enter,
.dz-dialog-leave-to {
  opacity: 0;
}
.dz-dialog-enter-active,
.dz-dialog-leave-to-active {
  transition: 0.3s;
}
</style>
<template>
  <transition name="dz-dialog">
    <div class="dz-dialog" v-if="dialogShow">
      <div class="dz-dialog-container">
        <header class="dz-dialog-header">
          <h2 class="title">{{title}}</h2>
          <i class="closeBth" @click="closeDialog">X</i>
        </header>
        <main class="dz-dialog-body">
          <slot name="body">
          </slot>
        </main>
        <footer class="dz-dialog-footer clearfix">
          <button class="cancel" @click="closeDialog">取消</button>
          <button class="submit" @click="submitDialog">提交</button>
        </footer>
      </div>
    </div>
  </transition>
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
    width: {
      type: String,
      default: "50%"
    },
    dialogShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    };
  },
  created() {
    this.activeCss = {
      width: this.width,
      
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close')
    },
    submitDialog() {
      this.$emit('submit')
    }
  }
};
</script>
