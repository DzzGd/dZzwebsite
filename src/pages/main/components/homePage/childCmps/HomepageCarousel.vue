<template>
  <div class="homepage-carousel">
    <div class="homepage-swiper"
       @mousedown ="mousedown" 
       @mousemove ="mousemove"
       @mouseup   ="mouseup">
      <slot></slot>
    </div>
    <button class="pre"  @click="pre">&lt;</button>
    <button class="next" @click="next">&gt;</button>
    <div class="indicator">

    </div>
  </div>
</template>

<script>
export default {
  name: 'HomepageCarousel',
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    animation: {
      type: Number,
      default: 300
    },
    moveRatio: {
      type: Number,
      default: 0.25
    },
    showIndicator: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scrolling  : false,
      slideCount : 0,
      swiperEl   : null,
      swiperElWidth: 0,
      swiperElStyle: {},
      currentIndex: 1,
      timer: null,
      mousedownFlag: false
    }
  },
  created() {
    this.$bus.$on('resizeWindow', this.flexiblePosition)
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.$bus.$off('resizeWindow',this.flexiblePosition)
  },
  methods: {
    init() {
      this.setDomStructure()
      // this.setDomMove()
    },
    setDomMove() {
      this.timer = setInterval(() => {
        this.currentIndex ++
        this.swiperSlide()
      }, this.interval);
    },
    swiperSlide() {
      this.scrolling = true
      this.swiperElStyle.transition = `transform ${this.animation}ms`
      this.setPosition()
      this.checkPostion()
      this.scrolling = false
    },
    checkPostion() {
      window.setTimeout(() => {
        this.swiperElStyle.transition = '0ms'
        if (this.currentIndex >= this.slideCount + 1) {
          this.currentIndex = 1
        }
        if (this.currentIndex <= 0) {
          this.currentIndex = this.slideCount
        }
        this.setPosition()
      }, this.animation)
    },
    setDomStructure() {
      // 获取并且创建初始元素
      this.swiperEl  = document.getElementsByClassName('homepage-swiper')[0]
      
      let swiperEls  = this.swiperEl.getElementsByClassName('homepage-slide')
      this.slideCount = swiperEls.length
      if (this.slideCount .length <= 1) return
      let cloneFirst = swiperEls[0].cloneNode(true)
      let cloneLast  = swiperEls[this.slideCount - 1].cloneNode(true)

      this.swiperElStyle = this.swiperEl.style
      this.swiperElWidth = this.swiperEl.offsetWidth
      // 添加首尾
      this.swiperEl.insertBefore(cloneLast, this.swiperEl.firstChild)
      this.swiperEl.appendChild (cloneFirst, this.swiperEl.firstChild)
      // 设置初始位置
      this.setPosition()
    },
    setPosition(extraDistance = 0) {
      
      this.swiperElStyle.transform  = `translate3d(${-this.swiperElWidth * this.currentIndex + extraDistance}px,0,0)`
    },
    mousedown(e) {
      
      if (this.scrolling) return
      this.mousedownFlag = true
      clearInterval(this.timer)
      this.startX = e.pageX
    },
    mousemove(e) {
      e.preventDefault()
      if (this.scrolling || !this.mousedownFlag) return
      this.currentX = e.pageX
      this.distance = this.currentX - this.startX
      this.setPosition(this.distance)
    },
    mouseup() {
      this.mousedownFlag = false
      let currentMove = Math.abs(this.distance)
      if (this.distance === 0) {
        return
      } else if(this.distance > 0 && currentMove > this.swiperElWidth * this.moveRatio) {
        this.currentIndex--
      } else if (this.distance < 0 && currentMove > this.swiperElWidth * this.moveRatio) {
        this.currentIndex++
      }
      this.swiperSlide()
      this.setDomMove()
    },
    flexiblePosition() { //宽度变化时自动调整轮播图内部swipweEl的宽度和位置
      this.swiperElWidth = this.swiperEl.offsetWidth
      this.setPosition()
    },
    pre() {
      this.changeItem(-1)
    },
    next() {
      this.changeItem(1)
    },
    changeItem(num) {
      clearInterval(this.timer)
      this.currentIndex += num
      this.swiperSlide()
      this.setDomMove()
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.homepage-carousel {
   overflow: hidden;
   position: relative;
  button{
    outline: none;
    background-color: rgba(177, 177, 177, 0.445);
    border: 1px solid rgba(238, 238, 238, 0.555);
    color: rgba(238, 238, 238, 0.555);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    &:active{
      color: #52a7fcaf;
      border: 1px solid #52a7fcaf;
    }
  }
  .pre{
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%)
  }
  .next{
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%)
  }
  .homepage-swiper {
    display: flex;
    flex-wrap: nowrap;

  }
}
</style>