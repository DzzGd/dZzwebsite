<template>
  <el-card class="box-card" :body-style="{padding:'10px '}">
    <div class="title-text">
      <label :for="activeId">
        快速-留言
        <i class="el-icon-edit"></i>
        <slot name="check-look"></slot>
      </label>
    </div>
    <hr />

    <el-input
      :id="activeId"
      class="leave-message"
      type="textarea"
      placeholder="请输入留言内容"
      clearable
      maxlength="100"
      minlength="10"
      rows="6"
      prefix-icon="el-icon-edit"
      v-model="leaveMessage"
      ref="content"
    ></el-input>
    <div class="btn-container">
      <el-button
        plain
        size="small"
        icon="el-icon-upload2"
        :loading="sendLoading"
        @click="sendLeaveMessage"
      >biu~biu~</el-button>

      <div class="emoji-btn">
        <span class="emoji" @click="showEmojiBox">&#x1F603;</span>
        <transition name="emoji">
        <div class="emoji-box" v-show="isEmojiShow">
          <div class="temp-box" >
            <i v-for="(item, index) in emojiArr" :key="index" class="single-emoji">{{item}}</i>
          </div>
          <div class="shadow"></div>
        </div>
        </transition>
      </div>
    </div>
  </el-card>
</template>

<script>
import homepageService from "@common/network/homepage-service";
export default {
  name: "LeaveMessage",
  props: {
    activeId: {
      type :String,
      default: 'leave-message'
    }
  },
  data() {
    return {
      leaveMessage: "",
      sendLoading: false,
      emojiArr: [],
      isEmojiShow: false,
      selectIndex: null
    };
  },
  created() {
    this.setEmoji();
  },
  methods: {
    setEmoji() {
      setTimeout(() => {
        let tempArr = [];
        for (let i = 128513; i <= 128591; i++) {
          tempArr.push(String.fromCodePoint("0x" + i.toString(16)));
        }
        this.emojiArr = tempArr;
      }, 0);
    },
    showEmojiBox(e) {
      if (this.isEmojiShow) {
        window.removeEventListener('click', this.selectEmoji)
      } else {
        setTimeout(() => {
          window.addEventListener('click', this.selectEmoji)
        }, 0)
      }
      this.isEmojiShow = !this.isEmojiShow
    },
    selectEmoji(e) {
      const target = e.target || window.event
      window.removeEventListener('click', this.selectEmoji)
      if (target.className.toLowerCase() !== 'single-emoji') return this.isEmojiShow = false
      const emoji = target.innerText
      let textarea = this.$refs.content.$el.children[0]
      const start = textarea.selectionStart
      const   end = textarea.selectionEnd
      this.leaveMessage = this.leaveMessage.substring(0, start) + emoji + this.leaveMessage.substring(end)
      textarea.focus()
      setTimeout(() => { //貌似比focus后执行, 设置一个异步比它更后执行... 表情的长度为2 不是1 
      textarea.selectionStart = start + 2
      textarea.selectionEnd   = end + 2
      textarea = null
      }, 0);
      this.isEmojiShow = false
    },
    sendLeaveMessage() {
      if (this.leaveMessage.length <= '6') {
        return this.$message.warning('字数太少啦, 最少6个字符哟...')
      }
      this.sendLoading = true;
      let userInfo = this.$store.getters.get_userinfo;
      let sendInfo = {
        content: this.leaveMessage,
        poster: userInfo._id,
        username: userInfo.username
      };
      homepageService.sendLeaveMessage(
        sendInfo,
        res => {
          if (!res) {
            this.sendLoading = false;
            this.$message.error("发送失败, 服务器可能扯拐了~, 等会回来...");
          } else {
            this.$message.success("发送成功~, 3阔斯,瑞瑞马骑!");
            this.leaveMessage = "";
          }
          this.sendLoading = false;
        },
        err => {
          this.sendLoading = false;
          this.$message.error("发送错误, 估计服务器又扯拐了");
        }
      );
    }
  },
  watch: {
    leaveMessage(newVal) {
      const boxs = document.getElementsByClassName('leave-message')
      for(let i = 0; i < boxs.length; i++) {
        if (boxs[i].children[0].id === this.activeId) continue
        boxs[i].children[0].value = newVal
      }
    }
  }
};
</script>

<style scoped lang="scss">
.box-card {
  position: relative;
  z-index: 101;
  overflow: visible;
}
.title-text {
  padding-bottom: 10px;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  label {
    cursor: pointer;
  }
  &:hover {
    border-color: #28a746b9;
    color: #52a7fc;
    & + hr {
      width: 100%;
      border: none;
      border-top: 2px solid #28a746b9;
    }
  }
}
hr {
  margin: 0;
  border: none;
  border-top: 2px solid transparent;
  width: 0px;
  height: 1px;
  transition: all 0.1s ease-in-out;
}

.leave-message {
  margin-top: 10px;
  margin-bottom: 10px;
}
.btn-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .emoji-btn {
    line-height: 33px;
    position: relative;
    margin-left: 10px;
    text-align: center;
    .emoji-box {
      position: absolute;
      left: -60px;
      bottom: 42px;
      text-align: left;
      border: 1px solid #bbb;
      border-radius: 3px;
      .temp-box {
        line-height: 1.3;
        font-size: 18px;
        width: 196px;
        height: 200px;
        background-color: #fff;
        display: block;
        overflow-y: scroll;
        overflow-x: hidden;
        user-select: none;
        cursor: text;
        &::-webkit-scrollbar {
          width: 0;
        }
        .single-emoji {
          font-size: 20px;
          cursor: pointer;
          width: 28px;
          display: inline-block;
          border: 1px solid transparent;
          &:hover {
            border-color: #ddd;
            transform: scale(1.1);
          }
        }
      }
      &::after {
        content: "";
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #bbb;
        position: absolute;
        z-index: 0;
        left: 72px;
        bottom: -11px;
      }
      &::before {
        content: "";
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #fff;
        position: absolute;
        z-index: 1;
        bottom: -10px;
        left: 72px;
      }
    }
    .emoji {
      height: 33px;
      width: 50px;
      border: 1px solid #ddd;
      display: inline-block;
      font-size: 20px;
      cursor: pointer;
      user-select: none;
      border-radius: 3px;
      &:hover {
        border-color: #52a7fc;
      }
    }
    .shadow {
      width: 180px;
      height: 1px;
      background-color: rgb(255, 255, 255);
      position: absolute;
      bottom: 0;
      left: 6px;
      box-shadow: 0px -3px 10px 10px rgba(255, 255, 255, 0.918);
    }
  }
}

.emoji-enter, .emoji-leave-to {
  opacity: 0;
}

.emoji-enter-active, .emoji-leave-active {
  transition: .1s;
}
</style>
