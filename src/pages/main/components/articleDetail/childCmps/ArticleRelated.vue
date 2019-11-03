<template>
  <div class="article-related">
    <p class="related-header">相关文章</p>
    <el-divider></el-divider>
    <div class="related-body">
      <div class="related-list">
        <div class="related-item" v-for="index in 4" :key="index">
          <img
            src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3673458369,3844552149&fm=26&gp=0.jpg"
            alt
          />
          <p class="desc">如何使用vue的当行守卫</p>
          <p class="desc-detail">如何使用vue的当行守使用vue的当行守使用vue的当行守使用vue的当行守卫如何使用vue的当行守卫如何使用vue的当行守卫</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "ArticleRelated"
    };
  },
  methods: {}
};
</script>
<style scoped lang="scss">
@media screen and (max-width: 678px) {
  .related-body .related-item {
    width: 49% !important;
  }
}
@media screen and (max-width: 576px) {
  .related-body .related-item {
    width: 100% !important;
  }
}
.article-related {
  margin: 3px;
  margin-top: 10px;
  border-radius: 4px;
  padding: 10px;
  background-color: #eee;
  .related-header {
    font-size: 18px;
    font-weight: bold;
  }
  .related-body {
    .related-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .related-item {
        width: 24%;
        margin-bottom: 10px;
        background-color: #fff;
        box-shadow: 1px 1px 5px #aaa;
        img {
          width: 100%;
          height: 180px;
          object-fit: cover;
        }
        text-align: left;
        .desc {
          padding: 15px 10px;
          font-size: 16px;
          font-weight: bold;
        }
        .desc-detail {
          box-sizing: border-box;
          margin:0px 10px 10px 10px;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          font-size: 14px;
          height: 62px;
          line-height: 1.5;
        }
      }
    }
  }
}
</style>