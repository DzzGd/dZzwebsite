<template>
  <div class="side-broad-swiper">
    <div class="broadcast">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-guangbo" />
      </svg>
      <div class="container">
        <ul class="broadcast-list" ref="swiperEl">
          <li class="broadcast-item">2019-11-01,本网站正式上线啦,快来围观</li>
          <li class="broadcast-item">新文章发布了,vue路由守卫的使用</li>
          <li class="broadcast-item">新文章发布了,vue路由守卫的使用</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "SideBroadSwiper",
  props: {
    duration: {
      type: Number,
      default: 600
    },
    interval: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      swiperInfo: ['新文章发布', '功能更新', '当前最热'],
      swiperEl: null,
      swiperElStyle: {},
      currentIndex: 1,
      count: 3,
      timer: null
    };
  },
  methods: {
    init() {
      this.setDomStructure()
      this.setDomMove()
    },
    setDomStructure() { //获取初始信息, 添加首尾元素
      this.swiperEl = this.$refs.swiperEl
      this.swiperElStyle = this.swiperEl.style
      let cloneFirst = this.swiperEl.lastChild.cloneNode(true)
      let cloneLast  = this.swiperEl.firstChild.cloneNode(true)
      this.swiperEl.appendChild(cloneLast)
      this.swiperEl.insertBefore(cloneFirst, this.swiperEl.firstChild)
      console.log(this.swiperElStyle)
      this.setPosition()
    },
    setPosition() {
      this.swiperElStyle.transform = `translate3d(0,-${this.currentIndex}00%,0)`
    },
    setDomMove() {
      this.timer = setInterval(() => {
        this.currentIndex++
        this.setDomMoveAnima()
      }, this.interval);
    },
    setDomMoveAnima() {
      this.swiperElStyle.transition = `${this.duration}ms`
      this.setPosition()
      this.checkPosition()
    },
    checkPosition() {
      window.setTimeout(() => {
        this.swiperElStyle.transition = '0ms'
        if (this.currentIndex >= this.count + 1) {
          this.currentIndex = 1
        } else if (this.currentIndex <= 0) {
          this.currentIndex
        }
        this.setPosition()
      }, this.duration)
    },
  },
  created() {
    // this.init()
  },
  mounted() {
    this.init()
  },
};
</script>

<style scoped lang="scss">
.side-broad-swiper {
  background-color: rgba(255, 192, 203, 0.685);
  .broadcast {
    display: flex;
    padding: 5px;
    color: #555;
    border: 1px dashed #aaa;
    svg {
      flex-shrink: 0;
      font-size: 24px;
    }
    .container {
      margin-left: 10px;
      flex: 1;
      overflow: hidden;
    }
    .broadcast-list {
      font-size: 14px;
      height: 24px;
      .broadcast-item {
        width: 250px;
        line-height: 24px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>