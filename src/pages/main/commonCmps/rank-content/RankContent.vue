<template>
  <div class="rank-content">
    <!-- 热门文章前三 -->
    <div class="article-container1">
      <el-row>
        <el-col :span="24">
          <article class="article-no1">
            <my-card>
              <div slot="header">1. 如何在Vue中使用vue-loader, VueX</div>
              <div slot="body" class="clearFloat">
                <img
                  src="https://element.eleme.cn/2.0/static/hamburger.50e4091.png"
                  alt
                  class="Img"
                />
                <p></p>
              </div>
              <div slot="footer" class="llls">
                <span>评论:1000</span>
              </div>
            </my-card>
          </article>
        </el-col>

        <el-col :xs="24" :sm="12">
          <article class="no2">
            <my-card>
              <p slot="header">哈哈啊</p>
            </my-card>
          </article>
        </el-col>
        <el-col :xs="24" :sm="12">
          <article class="no3">
            <my-card>
              <p slot="header">哈哈啊</p>
            </my-card>
          </article>
        </el-col>
      </el-row>
    </div>

    <!-- 小伙伴前三 -->
    <div class="article-container2">1. 朋友</div>
  </div>
</template>

<script>
import MyCard from "@commonCmps/myCard/MyCard";
export default {
  name: "RankContent",
  components: {
    MyCard
  }
};
</script>

<style scoped lang="scss">
</style>