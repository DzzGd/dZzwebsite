<template>
  <div class="article-detail">
    <el-page-header @back="goBack" content="| 详情页面" class="article-detail-nav" />
    <div class="detail-info">dzzgd 2019-10-08 阅读:100+ 评论99+</div>
    <div class="detail-container">
      <div class="detail-header">
        <p>Vue 是如何进行响应式开发的</p>
      </div>
      <div class="detail-content">
        <div class="detail-innerHtml" v-html="renderMarkDown"></div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "@common/network/homepage-service";
import Marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import Worker from './parseHtml.worker'
const worker = new Worker()
Marked.setOptions({
  renderer: new Marked.Renderer(),
  gfm: true,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true
});

export default {
  name: "ArticleDetail",
  data() {
    return {
      articleId: null,
      articleContent: ""
    };
  },
  created() {
    this.articleId = this.$route.params.id;
    this.getDetail();
    this.getWorkerParse()
  },
  methods: {
    getWorkerParse(){
      worker.addEventListener('message', (e) => {
        console.log(e)
      })
    },
    sendWorkerParse(msg) {
      worker.postMessage(msg)
    },
    goBack() {
      window.history.go(-1);
    },
    getDetail() {
      service
        .getArticleDetail(this.articleId)
        .then(res => {
          // this.articleContent = res.data.data.content;
          this.sendWorkerParse(res.data.data.content)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    renderMarkDown() {
      return Marked(this.articleContent);
    }
  }
};
</script>

<style scoped lang="scss">
.article-detail {
  .article-detail-nav {
    padding: 20px 10px 0 10px;
    margin-bottom: 10px;
    border-top: 2px solid pink;
  }
  .detail-info {
    color: rgb(106, 103, 255);
    text-align: right;
    padding: 0 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed rgba(145, 144, 255, 0.726);
  }
  .detail-container {
    min-height: 300px;
    .detail-header {
      text-align: center;
      margin-top: 10px;
      border-left: 5px solid #096;

      p {
        background-color: rgba(0, 153, 102, 0.164);
        height: 80px;
        font-size: 20px;
        font-weight: bold;
        line-height: 80px;
        border: 1px dashed #aaa;
        border-left: none;
      }
    }

    .detail-content {
      margin-top: 10px;
      padding: 5px;
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