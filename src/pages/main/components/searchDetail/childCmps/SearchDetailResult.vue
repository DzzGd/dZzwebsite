<template>
  <div class="search-detail-result"  v-loading="loading">
    <p v-show="articleList.length === 0" class="no-content">没有内容哦</p>
    <div class="search-result-list">
      <div class="search-result-item" v-for="item in articleList" :key="item._id">
        <div class="img-box">
          <img :src="item.imgUrl[0]?item.imgUrl[0]:'http://bpic.588ku.com/element_origin_min_pic/17/02/06/ed0c0ddc6271b0717ca64ffdf847eab6.jpg'" alt class="img" />
        </div>
        <div class="detail-box">
          <header>{{item.title}}</header>
          <main>{{item.brief}}</main>
          <footer>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-icon-test" />
            </svg>
            <span>{{item.author}}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shijian" />
            </svg>
            <span>{{new Date(item.createTime).getTime() | dateFormat("yyyy-MM-dd hh:mm")}}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-pinglun1" />
            </svg>
            <span>{{item.comments?item.comments.commentsNum:0}}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-yuedu" />
            </svg>
            <span>{{item.clickhot}}</span>
            <a :href="'/#/TechShare/Articles'+item._id" @click.prevent="toDetail(item._id)">
              <span class="continue">继续阅读 >></span>
            </a>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SearchDetailResult",
  props: {
    articleList: {
      type: Array,
      default() {
        return [];
      }
    },
    loading: false
  },
  data() {
    return {

    }
  },
  methods: {
    toDetail(id) {
      this.$router.push({ path: "/TechShare/Articles/" + id });
    }
  }
};
</script>
<style scoped lang='scss'>
@import "@css/mixin";
.search-detail-result {
  min-height: 40px;
  border-top: 1px dashed #eee;
  background-color: #fff;
  .no-content{
    @include shc(20px, 40px, $blue);
    height: 40px;
    text-align: center;
  }
  .search-result-list {
    .search-result-item {
      border-bottom: 1px dashed #eee;
      padding: 20px 10px;
      display: flex;
      .img-box {
        margin-right: 20px;
        flex-shrink: 0;
        width: 230px;
        .img {
          width: 100%;
        }
      }
      .detail-box {
        word-break: break-all;
        @include fj(space-between, column);
        header {
          color: $blue;
          font-weight: bold;
          margin-bottom: 15px;
        }
        main {
          @include shc(14px, 1.5, #999);
          @include linesEllipsis(3);
        }
        footer {
          height: 20px;
          @include shc(14px, 20px, #999);
          span {
            margin-right: 10px;
          }
          svg {
            font-size: 16px;
          }
          .continue {
            float: right;
            color: $green;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 576px) {
  .search-detail-result {
    .search-result-list {
      .search-result-item {
        flex-wrap: wrap;
        .img-box {
          width: 100%;
          margin-bottom: 10px;
          border: 1px solid #eee;
          padding: 10px;
          box-sizing: border-box;
          .img {
            border-radius: 2px;
          }
        }
        .detail-box {
        }
        footer {
          padding-bottom: 10px;
        }
      }
    }
  }
}
</style>