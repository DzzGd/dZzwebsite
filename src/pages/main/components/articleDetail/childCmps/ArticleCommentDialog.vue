<template>
  <div class="article-comment-dialog" v-show="isShow">
    <div class="comment-dialog">
      <textarea
        type="text"
        v-model="content"
        class="dialog-text"
        :placeholder="info.to ? '回复  >>>  '+info.to : '发表评论'"
        ref="dialogText"
      />
      <div class="dialog-func">
        <div class="dialog-func-btns">
          <span class="dialog-emoji" @click="showEmojiBox($event)">&#x1F61D;</span>
          <!-- <span class="dialog-pic">&#x1F304;</span> -->
          <div class="dialog-emoji-box" v-show="isEmojiShow">
            <div class="dialog-temp-box">
              <i
                v-for="(item, index) in emojiArr"
                :key="index"
                class="dialog-single-emoji"
                @click="selectEmoji(index)"
              >{{item}}</i>
            </div>
            <div class="dialog-shadow"></div>
          </div>
        </div>
        <p class="dialog-func-send" @click="sendComment">发表</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@common/network/homepage-service";
import emoji from "@main/mixins/emojiMixin.js";
export default {
  name: "ArticleCommentDialog",
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      content: ""
    };
  },
  mixins: [emoji],
  methods: {
    selectEmoji(index) {
      let textarea = this.$refs.dialogText
      const emoji = this.emojiArr[index],
            start = textarea.selectionStart,
            end = textarea.selectionEnd;
      this.content =
        this.content.substring(0, start) +
        emoji +
        this.content.substring(end); //拼接内容
      this.boxFocus()
      setTimeout(() => {
        //貌似比focus后执行, 设置一个异步比它更后执行... 表情的长度为2 不是1
        textarea.selectionStart = start + 2;
        textarea.selectionEnd = end + 2;
        textarea = null;
      }, 0);
      this.isEmojiShow = false;
    },
    boxBlur(e) {
      const reg = /dialog/i;
      const className = e.target.className || window.event.srcElement.className;
      if (reg.test(className)) return;
      document.removeEventListener("click", this.boxBlur);
      this.$emit("inputBlur");
    },
    boxFocus() {
      setTimeout(() => {
        this.$refs.dialogText.focus();
        document.addEventListener("click", this.boxBlur);
      }, 0);
    },
    sendComment() {
      //发送评论, 并在回调中返回数据给父组件
      if (!this.content) return this.$message.warning('写点呗...')
      this.info.content = this.content;
      service.sendComment(
        this.info,
        res => {
          this.$emit("replyBtnEvent", res.data.data.commentsArr);
          this.$emit("inputBlur");
          document.removeEventListener("click", this.boxBlur);
          this.content = "";
        },
        err => {
          console.log(err);
          this.$message.error("服务器扯拐..了..");
        }
      );
    }
  }
};
</script>
<style scoped lang="scss">
.article-comment-dialog {
  flex-shrink: 0;
  width: 100%;
}
.comment-dialog {
  .dialog-text {
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    border: 1px solid #eee;
    display: block;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    font-family: "黑体";
  }
  .dialog-func {
    user-select: none;
    margin-top: 10px;
    display: flex;
    align-content: center;
    justify-content: space-between;
    .dialog-func-btns {
      position: relative;
      font-size: 20px;
      span {
        line-height: 28px;
        cursor: pointer;
      }
      .dialog-emoji-box {
        position: absolute;
        left: 0px;
        bottom: 30px;
        text-align: left;
        border: 1px solid #bbb;
        border-radius: 3px;
        .dialog-temp-box {
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
          .dialog-single-emoji {
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
      }
    }
    .dialog-func-send {
      background-color: #e6b85c;
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      border-radius: 2px;
      vertical-align: middle;
      width: 70px;
      padding: 0;
      display: inline-block;
      text-align: center;
      border: none;
      color: #fff;
      cursor: pointer;
      &:hover {
        background-color: #f2c261;
      }
      &:active {
        background-color: #eeaf31;
      }
    }
  }
}
</style>