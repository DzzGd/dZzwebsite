<template>
  <div class="article-related">
    <p class="related-header">相关文章</p>
    <el-divider></el-divider>

    <div class="related-body">
      <div class="related-list">
        <div class="related-item" v-for="item in relatedList" :key="item._id">
          <router-link :to="'/TechShare/Articles/'+item._id" tag="div">
            <img
              :src="item.imgUrl[0]?item.imgUrl[0]:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3673458369,3844552149&fm=26&gp=0.jpg'"
              alt="图片"
            />
            <p class="desc ellipsis">{{item.title}}</p>
            <p class="desc-detail">{{item.brief}}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    relatedList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      name: "ArticleRelated"
    };
  },
  methods: {}
};
</script>
<style scoped lang="scss">
@import "@css/mixin";
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
  margin: 24px 3px 3px;
  border-radius: 4px;
  padding: 10px;
  background-color: rgb(248, 248, 248);
  .related-header {
    font-size: 18px;
    font-weight: bold;
  }
  .related-body {
    .related-list {
      @include fj(space-around);
      flex-wrap: wrap;
      .related-item {
        cursor: pointer;
        width: 24%;
        margin-bottom: 10px;
        box-shadow: 1px 1px 5px rgb(197, 197, 197);
        text-align: left;
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border: 4px solid #fff;
        }
        .desc {
          @include shc(16px, 1.2, $dark);
          margin-bottom: 10px;
          padding: 15px 10px 0;
          font-weight: bold;
          padding: 0 8px;
          color: rgb(51, 51, 51);
        }
        .desc-detail {
          box-sizing: border-box;
          margin: 0px 10px 10px 10px;
          height: 62px;
          @include shc(14px, 1.5, #666);
          @include linesEllipsis(3);
        }
      }
    }
  }
}
</style>