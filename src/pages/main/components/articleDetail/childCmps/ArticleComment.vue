<template>
  <div class="article-comment">
    <p class="comment-header">评论</p>
    <el-divider class="divider"></el-divider>
    <p v-if="!articleComments || articleComments.length === 0">还没有评论, 来个沙发???</p>
    <div class="comment-body" v-for="item in articleComments" :key="item.nthfloor">
      <div class="comment-floor">
        <div class="main-floor floor" :data-boxid="''+item.nthfloor">
          <div class="avatar">
            <img :src="item.main.poster?item.main.poster.avatar:defaultAvatar" alt="">
          </div>
          <div class="content">
            <p class="content-message">
              <span class="user">{{item.main.from}}</span>
              <span>:{{item.main.content}}</span>
            </p>
            <p class="content-time">
              {{item.main.time | dateFormat('MM-dd hh:mm')}}
              <a
                href="javascript:void(0)"
                @click.prevent="showDialog(''+item.nthfloor, item.main.from, item.nthfloor)"
              >回复</a>
            </p>
          </div>
        </div>
        <div class="other-floor floor"
             :data-boxid="''+item.nthfloor+subItem.nthfloor"
             v-for="subItem in item.other"
             :key="subItem.nthfloor"
        >
          <div class="avatar other-avatar">
            <img :src="subItem.poster?subItem.poster.avatar:defaultAvatar" alt="">
          </div>
          <div class="content">
            <p v-if="subItem.to" class="content-message">
              <span class="user">{{subItem.from}}</span>回复
              <span class="user">{{subItem.to}}</span>
              <span>:{{subItem.content}}</span>
            </p>
            <p v-else class="content-message">
              <span class="user">{{subItem.from}}</span>
              <span>:{{subItem.content}}</span>
            </p>
            <p class="content-time">
              {{subItem.time | dateFormat('MM-dd hh:mm')}}
              <a href="#" @click.prevent="showDialog(''+item.nthfloor+subItem.nthfloor, subItem.from, item.nthfloor)">回复</a>
            </p>
          </div>
        </div>
      </div>
    </div>

    
    <div class="comment-input">
      <input
        type="text"
        placeholder="评论"
        v-show="!isBoxShow"
        @click="commentInputFocus($event)"
      />
    </div>

    <!-- 评论输入框,位置是活动的 -->
    <article-comment-dialog 
      ref="dialogbox" 
      :is-show="isBoxShow"
      @inputBlur="inputBlur"
      :info="commentInfo"
      @replyBtnEvent="replyBtnEvent">
    </article-comment-dialog>
  </div>
</template>
<script>
import ArticleCommentDialog from "./ArticleCommentDialog"
import { mapState } from 'vuex'
export default {
  name: 'ArticleComment',
  props: {
    parentArticleComments: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      articleComments: null,
      floors: null, //评论的所有楼层
      dialogboxEl: null,
      isBoxShow: false,
      commentInfo:{},//发送'回复'的信息
    };
  },
  components: {
    ArticleCommentDialog
  },
  methods: {
    showDialog(id, to, nthfloor) {
      var t = setTimeout(() => {
        //点击'回复', 并设置setTimeout让点击后于失去焦点触发
        for (let i = 0, length = this.floors.length; i < length; i++) {
          let box = this.floors[i];
          if (box.dataset.boxid === id) { //锁定点击'回复'的那一层
            box.appendChild(this.dialogboxEl); //将dialog append到那一层里显示
            this.sendInfo('other', to, nthfloor)
            return;
          }
        }
        t = null
      }, 0);
    },
    inputBlur() {
      this.isBoxShow = false;
    },
    commentInputFocus(e) {
      //点击评论框
      const target = e.target || window.event.srcElement
      target.parentNode.appendChild(this.dialogboxEl)
      this.sendInfo('main', null, null) //这里的main指的是点击最底下的回复框的标志, other指得是点击'回复'文字时的标志
    },
    sendInfo(type, to, nthfloor) { //将信息发送到CommentDialog组件
      this.isBoxShow = true;
      this.$refs.dialogbox.boxFocus(); //调用组件里面的聚焦
      const from = this.username
      if (from === to) to = '' //回复自己
      let info = {
        articleId: this.$route.params.id,
        type,
        to,
        from,
        nthfloor,
        userId: this._id
      }
      this.commentInfo = info //发送到服务端的信息from, to, userid...
    },
    replyBtnEvent(comment) {//发送评论后,服务端会返回最新的评论数据
      this.articleComments = comment 
    }
  },
  computed: {
    ...mapState(['_id', 'username', 'avatar', 'defaultAvatar'])
  },
  mounted() {
    this.dialogboxEl = this.$refs.dialogbox.$el;
    this.floors = document.getElementsByClassName("floor");
  },
  watch:{
    parentArticleComments(newValue) {
      this.articleComments = newValue  //异步将评论数组赋值给data中的数据
    }
  }
};
</script>
<style scoped lang="scss">
@media screen and (max-width: 576px) {
  .comment-body{
    .main-floor{
      .avatar{
        width: 40px !important;
        height: 40px !important;
      }
    }
    .other-floor{
      padding-left: 50px !important;
      .avatar{
        width: 35px !important;
        height: 35px !important;
      }
      .content{
        font-size: 14px !important;
        .content-message{
          .user{
            font-size: 16px !important;
          }
        }
      }
    }
    .content{
      .content-time{
        margin: 0 !important;
      }
    }
  }
}
.article-comment {
  border-radius: 4px;
  margin: 3px;
  margin-top: 10px;
  padding: 10px;
  background-color: rgba(0, 153, 102, 0.164);
  .comment-header {
    font-size: 18px;
    font-weight: bold;
  }
  .divider {
    background-color: rgb(197, 197, 197);
  }
  .comment-body {
    .floor {
      margin-top: 10px;
    }
    .comment-floor {
      .main-floor,
      .other-floor {
        display: flex;
        flex-wrap: wrap;
        .avatar {
          flex-shrink: 0;
          width: 50px;
          height: 50px;
          margin-right: 10px;
          img {
            border-radius: 50%;
            width: 100%;
          }
        }
        .content {
          flex: 1;
          line-height: 1.2;
          .content-message {
            .user {
              display: inline-block;
              font-weight: bold;
              font-size: 18px;
              color: #cc8f14;
              margin-right: 5px;
            }
          }
          .content-time {
            margin-top: 8px;
            a {
              color: #666;
              &:hover {
                color: #52a7fc;
              }
            }
          }
        }
      }

      .other-floor {
        padding-left: 60px;
      }
    }
  }
  .comment-input {
    margin-top: 10px;
    input {
      width: 100%;
      outline: none;
      border: 1px solid #eee;
      background-color: transparent;
      height: 32px;
      border-radius: 5px;
      box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
    }
  }
}
</style>