<template>
  <div class="article-detail">
    <el-page-header @back="goBack" content="| 详情页面" class="article-detail-nav" />
    <article-detail-main 
    :article-data="articleData" v-loading="articleLoading"></article-detail-main>

    <el-divider></el-divider>
    <div class="page">
      <a :href="'/#/TechShare/Articles/'+articlePre._id?articlePre._id:'nomore'" 
         class="prepage"
         :class="articlePre._id?'':'nomore'"
         @click.prevent="toAnother('pre')">
        上一篇:
        <span >{{articlePre.title?articlePre.title:'没有了'}}</span>
      </a>
      <a :href="'/#/TechShare/Articles/'+articleNext._id?articleNext._id:'nomore'" 
         class="prepage"
         :class="articleNext._id?'':'nomore'"
         @click.prevent="toAnother('next')">
        下一篇:
        <span >{{articleNext.title?articleNext.title:'没有了'}}</span>
      </a>
    </div>

    <article-related></article-related>
    <article-comment :parent-article-comments="articleComments"></article-comment>
  </div> 
</template>

<script>
import ArticleDetailMain from "./childCmps/ArticleDetailMain";
import ArticleRelated from "./childCmps/ArticleRelated";
import ArticleComment from "./childCmps/ArticleComment";
import service from "@common/network/homepage-service";
import "./github.css";
const fn = resolve => require(["./parseHtml.worker.js"], resolve);
let worker = null;

export default {
  name: "ArticleDetail",
  data() {
    return {
      articleId: null,
      articleData: {},
      articleLoading: true,
      articleComments: null,
      articlePre:{},
      articleNext:{}
    };
  },
  components: {
    ArticleDetailMain,
    ArticleComment,
    ArticleRelated
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.articleId = this.$route.params.id;
      Promise.all([this.getWorker(), this.getDetail(), this.getRelated()]).then(res => {
        worker = new res[0](); //设置worker线程
        this.getWorkerParse();
        this.articleData = res[1].data.data;
        this.sendWorkerParse(this.articleData.content);
        this.articleComments = this.articleData.comments.commentsArr
        this.articlePre = this.articleData.pre
        this.articleNext = this.articleData.next
      })
      this.increseWatch()
      // document.documentElement.scrollTop ? document.documentElement.scrollTop = 0 : document.body.scrollTop = 0
    },
    getWorkerParse() { //监听worker
      worker.addEventListener("message", e => {
        this.articleData.content = e.data;
        this.articleLoading = false;
      });
    },
    sendWorkerParse(msg) { //发送html字符串
      worker.postMessage(msg);
    },
    goBack() {
      window.history.go(-1)
    },
    getWorker() {
      return new Promise((resolve, reject) => {
        fn(ret => {
          resolve(ret);
        });
      });
    },
    getDetail() {
      return service.getArticleDetail(this.articleId);
    },
    getRelated() {
      let data = {
        articleId : this.articleId,
        currentPage: 1,
        quantity: 4
      }
      return service.getRelated(data)
    },
    toAnother(type) {
      if (type === 'pre') {
        if (!this.articlePre._id) return
        this.$router.replace({path:'/TechShare/Articles/' + this.articlePre._id})
      }  else if (type === 'next') {
        if (!this.articleNext._id) return
        this.$router.replace({path:'/TechShare/Articles/' + this.articleNext._id})
      }
      this.articleLoading = true
    },
    increseWatch() {
      service.increseWatch(this.articleId)
    },
  },
  watch:{
    '$route': function (newVal, oldVal) {
      this.init()
    }
  }
};
</script>

<style scoped lang="scss">
.nomore{
  color:#bbb !important;
  cursor:not-allowed;
}
.article-detail {
  .article-detail-nav {
    padding: 20px 10px 0 10px;
    margin-bottom: 10px;
    border-top: 2px solid pink;
  }
  .page {
    margin: 3px;
    display: flex;
    justify-content: space-between;
    vertical-align: bottom;

      a {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: inline-block;
        width: 170px;
        color: rgb(71, 71, 71);
        &:hover {
          color: #52a7fc;
        }
      }
  }
}
</style>
<style lang="scss">
.article-detail-nav {
  div {
    color: rgb(106, 103, 255) !important;
  }
  .el-page-header__left::after {
    display: none;
  }
}
</style>