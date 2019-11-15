<template>
  <div class="side-broad-recommend">
    <h2 class="title">猜你喜欢</h2>
    <div class="container">
      <ul class="recommend-list clearfix">
        <li
          v-for="(item, index) in likeData"
          :key="item._id"
          @mouseenter="hover(index)"
          @mouseleave="leave"
          :class="{'hover':index===currentHover}"
        >
          <span class="num l">{{index + 1}}</span>
          <p class="text">
            <router-link :to="'/TechShare/Articles/'+item._id" class="link">
            {{item.title}}
            </router-link>
            </p>
          <p class="brief l">{{item.brief}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "SideBroadRecommend",
  props: {
    likeData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentHover: 1
    };
  },
  methods: {
    hover(index) {
      this.currentHover = index;
    },
    leave() {
      this.currentHover = 0;
    }
  }
};
</script>
<style scoped lang='scss'>
.hover {
  height: 100% !important;
  background-color: #eee;
  padding-bottom: 10px !important;
  .num {
    background-color: #e60023 !important;
  }
  .text {
    color: #222 !important;
    font-weight: bold;
  }
}

.side-broad-recommend {
  margin: 10px 5px 0 5px;
  background-color: #fff;
  padding: 20px 20px 10px;
  .title {
    margin-bottom: 0 !important;
    font-size: 16px;
    line-height: 40px;
    color: rgb(72, 72, 72);
    font-weight: normal;
    position: relative;
    margin-bottom: 10px;
    border-bottom: 1px solid rgb(238, 238, 238);
    &:hover::after {
      width: 80px;
    }
    &::after {
      position: absolute;
      width: 60px;
      height: 2px;
      content: "";
      left: 0;
      bottom: 0;
      background: rgb(0, 0, 0);
      transition: all 0.5s ease 0s;
    }
  }
  .recommend-list {
    margin-top: 8px;
    min-height: 180px;
    li {
      height  : 20px;
      padding : 6px 0 20px 3px;
      overflow: hidden;
      box-sizing: border-box;
      .num {
        height: 20px;
        width : 20px;
        color : #fff;
        line-height: 20px;
        background-color: #e6002383;
        display: inline-block;
        text-align: center;
      }
      .text {
        height  : 20px;
        line-height: 20px;
        display: block;
        margin-left: 24px;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .link {
          color  : #555;
        }
      }
      .brief {
        min-height: 54px;
        padding: 6px 0 0 24px;
        color  : #999;
        word-break: break-all;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        display: -webkit-box;
        line-height: 1.5;
      }
    }
  }
}
</style>