<template>
  <div class="message-board">
    <el-card class="box-card" :body-style="{padding:'10px'}">
      <div slot="header" class="clearfix">
        <i class="el-icon-s-order"></i>
        <span>留言板</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="flush">
          <i v-if="!isFlush">刷新</i>
          <i v-else class="el-icon-loading" ></i>
        </el-button>
      </div>
      <leave-message></leave-message>
      <el-card class="box-card dz-box-card" v-for="(item, index) in leaveMessage" :key="item._id">
        <div class="message-avatar">
          <!-- 头像 -->
          <el-avatar
            shape="square"
            size="medium"
            :src="item.poster ? item.poster.avatar : defaultAvatar"
            class="message-info-contain"
          ></el-avatar>

          <!-- 发表日期 -->
          <div class="message-info">
            <div class="message-username">{{item.username}}</div>
            <div class="message-time">{{item.createTime | dateFormat('yyyy-MM-dd hh:mm:ss')}}</div>
          </div>
          <div></div>
        </div>

        <!-- 内容 -->
        <div class="message-content">{{item.content}}</div>

        <!-- 点赞和不喜欢 -->
        <div class="message-like-dislike">
          <p class="like">
            <i class="curtain" @click="plus_one($event, item._id, 0, index)" ontouchstart=""></i>
            <span class="hand">&#x1F44D;</span>
            <span class="number">({{item.likes}})</span>
          </p>
          <p class="dislike">
            <i class="curtain" @click="plus_one($event, item._id, 1, index)" ontouchstart=""></i>
            <span class="hand">&#x1F44E;</span>
            <span class="number">({{item.dislikes}})</span>
          </p>
        </div>
      </el-card>
    </el-card>
    <load-more :has-more="hasMore" @loadMore="loadMore"></load-more>
  </div>
</template>

<script>
import { debounce } from '@common/utils/apptools.js'
import homepageService from '@common/network/homepage-service'
import LoadMore from '@commonCmps/loadMore/LoadMore'
import LeaveMessage from '@commonCmps/leaveMessage/LeaveMessage'
import { mapState } from 'vuex'
export default {
  name: "MessageBoard",
  data() {
    return {
      leaveMessage: [],
      totalPages  : null,
      pageInfo    : { 
        requestPage: 0,
        onceNum    : 6
      },
      preIndex: null,
      clickLikesNum: {},
      clickDislikesNum: {},
      updateDebounce: null,
      isFlush: false,
      timer: null
    };
  },
  methods: {
    getRandomColor() { //生成随机颜色
      return ("#" + Math.random().toString(16).substr(-6));
    },

    plus_one(event, _id, type, index) { // 点赞和不喜欢的点击事件
      this.plus_one_span(event)
      this.update_likes_or_dislikes(_id, type, index)
    },
    plus_one_span(event) { //生成 +1 span 并添加动画
      const parent        = event.target.parentNode
      const plus_one_span = document.createElement("span");
      plus_one_span.innerText      = "+1";
      plus_one_span.className      = "plus_one_span";
      plus_one_span.style["color"] = this.getRandomColor();
      parent.appendChild(plus_one_span);
      setTimeout(() => {
        parent.removeChild(plus_one_span);
      }, 300);
    },
    update_likes_or_dislikes(_id, type, index) { //更新喜欢和不喜欢的数量
    if (index !== this.preIndex) {  //如果前后两次点击的留言内容不同 分开提交服务器
      this.updateDebounce = debounce(this.update_to_service, 2000)
      this.preIndex = index
    }
      if (type === 0) {
        this.clickLikesNum[_id]    = (this.clickLikesNum[_id] || 0) + 1
        this.leaveMessage[index].likes ++
      } else {
        this.clickDislikesNum[_id] = (this.clickDislikesNum[_id] || 0) + 1
        this.leaveMessage[index].dislikes ++
      }
      this.updateDebounce(_id)
    },
    update_to_service(_id) { //将喜欢和不喜欢的数量提交到服务器
      // updateInfo: _id, likes, dislikes
      let updateInfo = {
        _id,
        likes: parseInt(this.clickLikesNum[_id]),
        dislikes: parseInt(this.clickDislikesNum[_id]) || 0,
      }
      this.clickLikesNum[_id] = 0
      this.clickDislikesNum[_id] = 0
      // 发送清零, 新的计算
      homepageService.updateLikesOrDislikes(updateInfo, res => {
        if (!res)this.$message.success('麻烦检查哈网络...也可能遇到bug了, 赶快通知我..')
      }, err => {
        this.$message.error('麻烦检查哈网络...也可能遇到bug了, 赶快通知我..' + err)
      })
    },
    get_leave_message() { // 获取留言数据
      this.pageInfo.requestPage++
      // 请求留言数据 
      homepageService.getLeaveMessage(this.pageInfo, data => {
        this.leaveMessage.push(...data.leaveMessage.data)
        this.totalPages = data.leaveMessage.totalPages
        this.pageInfo.requestPage = data.leaveMessage.currentPage
        this.isFlush = false
      }, err => {
        this.$message.error('哦豁...')
        this.isFlush = false
      })
    },
    flush() {
      if (!this.timer) {
        this.clicks = 2
        this.timer = setTimeout(() => {
          this.timer = null
        }, 6000);

      } else {
        this.clicks --
        if (this.clicks <= 0) return this.$message.warning('慢点,遭不住了...')
      }
      this.isFlush = true
      this.pageInfo.requestPage = 0
      this.leaveMessage = []
      this.get_leave_message()
    },
    loadMore() {
      this.get_leave_message()
    }
  },
  created() {
    this.get_leave_message()
  },
  computed:{
    ...mapState(['defaultAvatar']),
    hasMore() {
      return this.totalPages > this.pageInfo.requestPage
    }
  },
  components: {
    LoadMore,
    LeaveMessage
  }
};
</script>

<style scoped lang="scss">
.box-card {
  transition: 0.3s;
}
.dz-box-card {
  margin-top: 5px;
}
.message-avatar {
  display: flex;
  justify-content: flex-start;

  .message-info-contain {
    margin-right: 20px;
    background-color: rgb(236, 236, 236);
  }
  .message-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .message-username {
      font-size: 16px;
      color: rgb(94, 94, 94);
    }

    .message-time {
      font-size: 14px;
      color: #bbb;
    }
  }
}

.message-content {
  margin-top: 15px;
  padding-left: 56px;
  word-break: break-all;
}
.message-like-dislike {
  display: flex;
  position: relative;
  justify-content: flex-end;
  margin-top: 15px;
  font-size: 17px;
  border-top: 1px solid #eee;
  user-select: none;
  p {
    height: 20px;
    line-height: 20px;
    position: relative;
    top: 8px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    .curtain {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 99;
      background-color: #eee;
      opacity: 0;
    }
    span {
      display: block;
      font-family: "楷体";
      font-weight: bold;
    }
    &:hover.like {
      color: #409eff;
    }
    &:hover.dislike {
      color: red;
    }
    &:active .hand {
       -webkit-transform: rotate(-30deg);
       transform: rotate(-30deg);
    }
  }
  .like {
    .number {
      font-size: 14px;
    }
  }

  .dislike {
    .number {
      font-size: 14px;
    }
  }
}
</style>
<style >
.plus_one_span {
  position: absolute;
  top: -10px;
  right: 10px;
  animation: fly 0.3s ease-in-out;
  animation-fill-mode: forwards;
}
@keyframes fly {
  0% {
    top: -10px;
    opacity: 1;
  }
  100% {
    top: -40px;
    opacity: 0;
  }
}
</style>