<template>
  <div class="article-comment-dialog" v-show="isShow">
    <div class="comment-dialog">
      <textarea type="text"
                v-model="content"
                class="dialog-text" 
                :placeholder="info.to ? '回复  >>>  '+info.to : '发表评论'"
                ref="dialogText"
                />
      <div class="dialog-func">
        <p class="dialog-func-btns">
          <span class="dialog-emoji">&#x1F61D;</span>
          <span class="dialog-pic">&#x1F304;</span>
        </p>
        <p class="dialog-func-send" @click="sendComment">发表</p>
      </div>
    </div>
  </div>
</template>
<script>
import service from "@common/network/homepage-service"
export default {
  name: "ArticleCommentDialog",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      default() {
        return {} 
      }
    }
  },
  data() {
    return {
      content:''
    };
  },
  created() {
  },
  methods: {
    boxBlur(e) {
      const reg = /dialog/i
      const className = e.target.className || window.event.srcElement.className
      if (reg.test(className)) return
      document.removeEventListener('click', this.boxBlur)
      this.$emit("inputBlur");
    },
    boxFocus() {
      setTimeout(() => {
        this.$refs.dialogText.focus()
        document.addEventListener('click',this.boxBlur)
      }, 0);
    },
    sendComment() { //发送评论, 并在回调中返回数据给父组件
      this.info.content = this.content
      service.sendComment(this.info, res => {
        this.$emit('replyBtnEvent', res.data.data.commentsArr)
        this.$emit('inputBlur')
        this.content = ''
      }, err => {
        console.log(err)
        this.$message.error('服务器扯拐..了..')
      })
    },
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
      font-size: 20px;
      span {
        line-height: 28px;
        cursor: pointer;
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