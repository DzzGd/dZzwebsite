<template>
  <div class="article-detail-main">
    <div class="detail-info">
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-icon-test" />
        </svg>
        {{articleData.author}}
      </span>

      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shijian" />
        </svg>
        {{new Date(articleData.createTime).getTime() | dateFormat('yyyy-MM-dd hh:mm')}}
      </span>

      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun1" />
        </svg>
      {{commentsNum}}
      </span>

      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yuedu" />
        </svg>
        {{articleData.clickhot}}
      </span>
    </div>
    <div class="detail-container markdown-body">
      <div class="detail-header">
        <p>{{articleData.title}}</p>
      </div>
      <div class="detail-content">
        <div class="detail-innerHtml" v-html="articleData.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleDetailMain",
  props: {
    articleData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  created() {},
  data() {
    return {};
  },
  computed: {
    commentsNum() {
      return this.articleData.comments ? this.articleData.comments.commentsNum : 0
    }
  }
};
</script>

<style lang="scss" scoped>
.article-detail-main {
  .detail-info {
    color: #444;
    text-align: right;
    padding: 0 10px;
    padding-bottom: 10px;
    border-bottom: 1px dashed rgba(145, 144, 255, 0.726);
    span {
      margin-right: 5px;
    }
  }
  .detail-container {
    min-height: 300px;
    .detail-header {
      text-align: center;
      margin-top: 10px;
      border-left: 5px solid #096;
      p {
        background-color: rgba(0, 153, 102, 0.164);
        padding: 30px 10px;
        font-size: 26px;
        font-weight: bold;
        border: 1px dashed #aaa;
        border-left: none;
        line-height: 1.2;
      }
    }

    .detail-content {
      margin-top: 10px;
      padding: 10px 40px;
    }
  }
}
</style>