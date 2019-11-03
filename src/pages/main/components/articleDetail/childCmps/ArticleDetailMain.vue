<template>
  <div class="article-detail-main">
    <div
      class="detail-info"
    >{{articleData.author}} {{new Date(articleData.createTime).getTime() | dateFormat}} 阅读:{{articleData.clickhot}} 评论99+</div>
    <div class="detail-container markdown-body">
      <div class="detail-header">
        <p>{{articleData.title}}</p>
      </div>
      <div class="detail-content">
        <div class="detail-innerHtml" 
             v-html="articleData.content"
             ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleDetailMain',
  props: {
    articleData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  created() {
  },
  data() {
    return {
    };
  }
}
</script>

<style lang="scss" scoped>
.article-detail-main {
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
        padding-top: 30px;
        padding-bottom: 30px;
        font-size: 28px;
        font-weight: bold;
        border: 1px dashed #aaa;
        border-left: none;
      }
    }

    .detail-content {
      margin-top: 10px;
      padding: 10px 40px;
    }
  }

}
</style>