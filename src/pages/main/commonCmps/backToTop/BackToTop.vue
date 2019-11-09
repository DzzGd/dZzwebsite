<template>
  <div id="backtotop" class="back-to-top" :style="[diyStyle]" v-show="isShow">
    <a href="top" @click.prevent="toTop">
      <slot></slot>
    </a>
  </div>
</template>
<script>
export default {
  name: "BackToTop",
  props: {
    duration: {
      type: Number,
      default: 600 //毫秒
    },
    distance: {
      type: Number,
      default: 800
    },
    width: {
      type: Number,
      default: 50
    },
    height: {
      type: Number,
      default: 50
    },
    bottom: {
      type: Number,
      default: 50
    },
    right: {
      type: Number,
      default: 50
    },
  },
  data() {
    return {
      diyStyle: {},
      isShow: false,
      timer: null
    };
  },
  created() {
    this.init()
    this.$bus.$on('windowScroll', this.checkShow)
  },
  methods: {
    init() {
      let tempStyle = {}
      tempStyle.width  = this.width + 'px'
      tempStyle.right  = this.right + 'px'
      tempStyle.height = this.height + 'px'
      tempStyle.bottom = this.bottom + 'px'
      this.diyStyle = tempStyle
    },
    toTop() {
      let scrollTop = document.documentElement.scrollTop
      let speed    = scrollTop * 16.666667 / this.duration
      this.timer = setInterval(() => {
        scrollTop -= speed
        document.documentElement.scrollTop = scrollTop
        if (scrollTop <=0) clearInterval(this.timer)
      }, 16.66667);
    },
    checkShow(value) {
      const flag = value >= this.distance
      if(flag != this.isShow) {
        this.isShow = flag
      }
    }
  }
};
</script>
<style scoped lang="scss">
.back-to-top {
  border-radius: 50%;
  position: fixed;
  overflow: hidden;
  cursor: pointer;
  a{
    &:hover img{
      opacity: 1;
    }
  }
  img{
    width: 100%;
    opacity: .5;
    transition: .3s;
  }
}
</style>
