<template>
  <div class="search-detail-result">
    <div class="search-result-list">
      <div class="search-result-item" v-for="item in articleList" :key="item._id">
        <div class="img-box">
          <img src="~@assets/images/homepage/crossfire.jpg" alt class="img" />
        </div>
        <div class="detail-box">
          <header>{{item.title}}</header>
          <main>{{item.brief}}</main>
          <footer>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-ren" />
            </svg>
            <span>{{item.author}}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-rili" />
            </svg>
            <span>{{new Date(item.createTime).getTime() | dateFormat("yyyy-MM-dd")}}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-uqur" />
            </svg>
            <span>99+</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-biaoqing" />
            </svg>
            <span>{{item.clickhot}}</span>
            <span class="continue">继续阅读 >></span>
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
        return []
      }
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style scoped lang='scss'>
.search-detail-result {
  border-top: 1px dashed #eee;
  background-color: #fff;
  .search-result-list {
    .search-result-item {
      border-bottom: 1px dashed #eee;
      padding: 20px;
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        header {
          color: #0e90d2;
          font-weight: bold;
          margin-bottom: 15px;
        }
        main {
          line-height: 1.5;
          font-size: 14px;
          color: #999;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          word-break: break-all;
          display: -webkit-box;
        }

        footer {
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #999;
          span {
            margin-right: 10px;
          }
          svg {
            font-size: 16px;
            &:nth-of-type(4) {
              font-size: 22px;
            }
          }
          .continue {
            float: right;
            color: rgb(0, 150, 94);
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
        footer{
          padding-bottom: 10px;
        }
      }
    }
  }
  .search-result-item {
    .img-box {
    }
  }
}
</style>