<template>
  <section class="tech-share-list">
    <transition-group name="list" tag="div">
      <article class="list-item" v-for="(item,index) in dataList" :key="item._id">
        <header class="item-header">
          <h2>
            <a href>{{index+1}}. {{item.title}}</a>
          </h2>
        </header>
        <div class="item-body">
          <p>
            <span>{{item.brief}}</span>
            <a href class="read-more" @click.prevent="toDetail(item._id)">阅读全文>></a>
          </p>
        </div>
        <footer class="item-footer">
          <time>{{new Date(item.createTime).getTime() | dateFormat}}</time>
          <span>
            <el-tag v-for="i in item.tags" :key="i">{{i}}</el-tag>
          </span>
          <span>阅读:{{item.clickhot}}+</span>
          <span>评论: 100+</span>
        </footer>
      </article>
    </transition-group>
  </section>
</template>

<script>
export default {
  name: "TechShareList",
  props: {
    dataList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    toDetail(articleId) {
      this.$router.push({path: '/TechShare/Articles/' + articleId})
    }
  }
};
</script>

<style scoped lang="scss">
.tech-share-list {
  padding: 5px 5px;
  .list-item {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    background-color: #fff;
    color: #303133;
    -webkit-transition: 0.3s;
    transition: 0.3s;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 10px;
    margin-bottom: 8px;
    &:hover {
      transform: translate(1px, -1px);
      -webkit-box-shadow: 0 3px 12px 1px rgba(0, 0, 0, 0.24);
      box-shadow: 0 3px 12px 1px rgba(0, 0, 0, 0.24);
    }
    .item-header {
      h2 {
        font-size: 20px;
        line-height: 32px;
        margin-bottom: 0.5rem;
        a{
          // color: #3298ff;
          color: #555;
        }
      }
    }
    .item-body {
      color: #888;
      line-height: 1.5;
      word-break: break-all;
      p {
        margin-bottom: 0.5rem;
        .read-more {
          color: #096;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
    .item-footer {
      color: #666;
    }
  }
}

// 动画
.list-enter-active,.list-leave-active{
  transition: all 1s;
}

.list-enter, .list-leave-to{
  opacity: 0;
}
</style>