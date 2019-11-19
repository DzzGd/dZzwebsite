<template>
  <div class="list-item">
    <transition-group name="list" tag="div" class="pos">
      <article class="list-item-one" v-for="item in listData" :key="item._id">
        <header class="item-header">
          <h2 class="ellipsis">
            <a
              :href="'/#/TechShare/Articles/'+item._id"
              @click.prevent="toDetail(item._id)"
            >{{item.title}}</a>
          </h2>
        </header>
        <div class="item-body">
          <div class="item-img">
            <img
              :src="item.imgUrl[0]?item.imgUrl[0]:'http://bpic.588ku.com/element_origin_min_pic/17/02/06/ed0c0ddc6271b0717ca64ffdf847eab6.jpg'"
              alt
            />
          </div>

          <div class="item-content">
            <div class="content-body">
              <span>{{item.brief}}</span>
              <a
                :href="'/#/TechShare/Articles/'+item._id"
                class="read-more"
                @click.prevent="toDetail(item._id)"
              >阅读全文>></a>
            </div>
            <div class="content-tags">
              <el-tag v-for="i in item.tags" :key="i">{{i}}</el-tag>
            </div>
            <div class="content-footer">
              <p class="footer-info">
                <span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-icon-test" />
                  </svg>
                  <span>{{item.author}}</span>
                </span>
                <span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-shijian" />
                  </svg>
                  <time>{{new Date(item.createTime).getTime() | dateFormat('yy-MM-dd')}}</time>
                </span>
                <span>
                  <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-yuedu" />
                  </svg>
                  <span>{{item.clickhot}}</span>
                </span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-pinglun1" />
                </svg>
                <span>
                  <span>{{item.comments.commentsNum}}</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </article>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: "ListItem",
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    toDetail(articleId) {
      this.$router.push({ path: "/TechShare/Articles/" + articleId });
    }
  }
};
</script>
<style scoped lang='scss'>
@media screen and (max-width: 614px) {
  .list-item {
    .item-body {
      flex-wrap: wrap !important;
      .item-img {
        width: 100%;
        max-width: 100% !important;
        margin-bottom: 10px;
      }
      .item-content {
        min-width: 0 !important;
      }
    }
  }
}
.list-item {
  .list-item-one {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    background-color: #fff;
    color: #303133;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-bottom: 5px;
    &:hover {
      transform: translate(1px, -1px);
      -webkit-box-shadow: 0 3px 12px 1px rgba(0, 0, 0, 0.24);
      box-shadow: 0 3px 12px 1px rgba(0, 0, 0, 0.24);
    }
    .pos {
      position: relative;
    }
    .item-header {
      h2 {
        font-size: 20px;
        line-height: 32px;
        margin-bottom: 0.5rem;
        a {
          color: #555;
        }
      }
    }
    .item-body {
      color: #888;
      line-height: 1.5;
      display: flex;
      .item-img {
        max-width: 300px;
        min-width: 200px;
        flex-basis: 100%;
        max-height: 220px;
        img {
          background-color: #f8f8f8;
          object-fit: cover;
          width: 100%;
          max-height: 200px;
          border: 6px solid white;
          box-shadow: 1px 1px 5px #838383;
        }
      }
      .item-content {
        padding: 0 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 400px;
        .content-body {
          -webkit-box-orient: vertical;
          overflow: hidden;
          -webkit-line-clamp: 3;
          word-break: break-all;
          display: -webkit-box;
          margin-bottom: 0.5rem;
          .read-more {
            color: #096;
            &:hover {
              text-decoration: underline;
            }
          }
        }
        .content-footer {
          .footer-info {
            margin-bottom: 5px;
            text-align: right;
          }
        }
        .content-tags {
          span {
            margin: 0 5px;
          }
        }
      }
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all .5s;
}
.list-leave-active {
  position: absolute;
}
.list-move {
  transition: all .5s;
}
.list-enter,
.list-leave-to {
  transform: translate(0px, 80px);
  opacity: 0;
}
</style>