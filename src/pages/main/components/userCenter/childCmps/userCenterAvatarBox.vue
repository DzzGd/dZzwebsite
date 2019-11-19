<template>
  <transition name="avatar">
    <div class="user-center-avatar-box" v-if="isShow">
      <figure class="choose-avatar-box">
        <img class="avatars" v-for="(item, index) in activeArr" :key="item" :src="item" @click="avatarChoose(index)"/>
      </figure>
      <div class="avatar-page clearfix">
        <el-button plain size="small" 
                   :disabled="currentPage<=1"
                   @click="pre">
                   <i class="el-icon-caret-left"></i>
        </el-button>
        <el-button plain size="small" 
                   :disabled="!isAvailable"
                   @click="next">
          <i class="el-icon-caret-right"></i>
        </el-button>
      </div>
    </div>
  </transition>
</template>
<script>
import service from "@common/network/homepage-service"
export default {
  name: "userCenterAvatarBox",
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      totalPage: 1,
      currentPage: 0,
      list: [],
      quantity: 16
    };
  },
  methods: {
    getAvatarsList() {
      if (this.list[this.currentPage - 1]) return
      service.getAvatarList(this.currentPage, this.quantity, res => {
        this.totalPage = res.data.totalPages
        this.list.push(res.data.arrlist)
      },_ => {console.log(_)})
    },
    pre() {
      this.currentPage -= 1
    },
    next() {
      this.currentPage += 1
      this.getAvatarsList()
    },
    avatarChoose(index) {
      this.$emit('getAvatar', this.list[this.currentPage - 1][index])
    }
  },
  created() {
    this.currentPage += 1
    this.getAvatarsList()
  },
  computed: {
    isAvailable() {
      return this.currentPage < this.totalPage
    },
    activeArr() {
      return this.list[0] ? this.list[this.currentPage - 1] : []
    }
  }
};
</script>
<style scoped lang='scss'>
@import "@css/mixin";
.user-center-avatar-box {
  background-color: #fff;
  @include positionLT(absolute,0,195px,999);
  height: 300px;
  border: 1px solid #eee;
  border-top: 3px solid $red;
  padding: 10px 15px 15px 15px;
  overflow: hidden; //在展开收缩过程中逐渐显示隐藏内部元素
  .choose-avatar-box {
    @include fj(space-evenly, row, center);
    width: 250px;
    padding: 5px;
    border: 1px dashed $warning;
    flex-wrap: wrap;
    .avatars {
      @include wh(50px, 50px);
      display: inline-block;
      margin-bottom: 5px;
      cursor: pointer;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .avatar-page {
    margin-top: 5px;
    width: 250px;
    button {
      &:first-child {
        float: left;
      }
      &:last-child {
        float: right;
      }
    }
  }
}

.avatar-enter,
.avatar-leave-to {
  height: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  // opacity: 0;
}
.avatar-enter-active,
.avatar-leave-active {
  transition: all .5s;
}
</style>