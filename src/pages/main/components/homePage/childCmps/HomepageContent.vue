<template>
  <div class="container">
    <el-row class="inner">
      <h1 class="title">
        <span>{{title}}</span>
        <span class="more">
          <a href="javascript:void(0)">MORE...</a>
        </span>
      </h1>
      <el-col :xs="24">
        <div class="homepage-content">
          <div class="header" style="color:#e60023">1. 如何在Vue中使用vue-loader, VueX, Vue-loader</div>

          <div class="body clearfix">
            <el-row>
              <el-col :xs="24" :sm="8">
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572026206195&di=f805325cd0e79923e8b25359df3bc418&imgtype=0&src=http%3A%2F%2Fwww.codingdict.com%2Fstatic%2Fassets%2Fimages%2Fdocument%2Fvuejs-cn-guide_51hNN97.jpg"
                  alt
                  class="body-img"
                />
              </el-col>

              <el-col :xs="24" :sm="16" class="el-col">
                <div class="body-container">
                  <p
                    class="body-content"
                  >Vue是全世界最好用的框架,没有之一yeah~!如果你不信 你就out了哦Vue是全世界最好用的框架,没有之一yeah~!如果你不信 你就out了哦</p>
                  <a href class="readmore">阅读更多</a>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="footer">
            <p class="etag">
              <el-tag>Vue</el-tag>
              <el-tag>JS</el-tag>
              <el-tag>CSS</el-tag>
              <el-tag>HTML</el-tag>
            </p>
            <p class="info">
              <span>dzzgd于:</span>
              <span>2019-9-8</span>
              <span>评论:1000+</span>
              <span>阅读:1000+</span>
            </p>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12">
        <div class="homepage-content">
          <div class="header" style="color:#52a7fc">2. 如果绝对定位相对定位?</div>

          <div class="body clearfix">
            <el-row>
              <el-col :xs="24" :sm="0">
                <img
                  src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3798291620,1726361558&fm=26&gp=0.jpg"
                  alt
                  class="body-img"
                />
              </el-col>

              <el-col :xs="24" :sm="24" class="el-col">
                <div class="body-container">
                  <p
                    class="body-content"
                  >Vue是全世界最好用的框架,没有之一yeah~!如果你不信 你就out了哦Vue是全世界最好用的框架,没有之一yeah~!如果你不信 你就out了哦</p>
                  <a href class="readmore">阅读更多</a>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="footer">
            <p class="etag">
              <el-tag>Vue</el-tag>
              <el-tag>JS</el-tag>
              <el-tag>CSS</el-tag>
              <el-tag>HTML</el-tag>
            </p>
            <p class="info">
              <span>dzzgd于:</span>
              <span>2019-9-8</span>
              <span>评论:1000+</span>
              <span>阅读:1000+</span>
            </p>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12">
        <div class="homepage-content">
          <div class="header" style="color:#67C23A">3. 什么是作用域链?</div>

          <div class="body clearfix">
            <el-row>
              <el-col :xs="24" :sm="0">
                <img
                  src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3798291620,1726361558&fm=26&gp=0.jpg"
                  alt
                  class="body-img"
                />
              </el-col>

              <el-col :xs="24" :sm="24" class="el-col">
                <div class="body-container">
                  <p
                    class="body-content"
                  >Vue是全世界最好用的框架,没有之一yeah~!如果你不信 你就out了哦Vue是全世界最好用的框架,没有之一yeah~!如果你不信 你就out了哦</p>
                  <a href class="readmore">阅读更多</a>
                </div>
              </el-col>
            </el-row>
          </div>
          <div class="footer">
            <p class="etag">
              <el-tag>Vue</el-tag>
              <el-tag>JS</el-tag>
              <el-tag>CSS</el-tag>
              <el-tag>HTML</el-tag>
            </p>
            <p class="info">
              <span>dzzgd于:</span>
              <span>2019-9-8</span>
              <span>评论:1000+</span>
              <span>阅读:1000+</span>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "HomepageContent",
  props: {
    title: {
      type: String,
      default: "热门文章"
    }
  }
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  .body-content {
    padding-left: 0 !important;
    margin-top: 10px;
  }
}
.container {
  margin-top: 10px;
  border-top: 1px solid #eee;
  .inner {
    // box-shadow: 1px 1px 3px #e600232d;
    border-radius: 4px;
  }
  .title {
    padding: 20px 5px 10px 10px;
    font-size: 22px;
    color: #e60023;
    font-weight: bold;
    font-weight: "黑体";
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    border-bottom: 4px solid rgb(82, 167, 252);

    display: flex;
    justify-content: space-between;
    justify-items: center;
    .more {
      color: rgb(103, 194, 58);
      font-size: 16px;
      line-height: 22px;

      a:hover {
        color: rgb(82, 167, 252);
      }
    }
  }
}

.homepage-content {
  // -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  // border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  .header {
    border-bottom: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    font-size: 20px;
    font-family: '新宋体';
    font-weight: bold;
  }
  .body {
    font-size: 18px;
    padding: 10px;
    overflow: hidden;
    .body-img {
      width: 100%;
    }

    .body-container {
      .body-content {
        font-family: "黑体";
        font-size: 18px;
        line-height: 36px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-indent: 36px;
        padding-left: 10px;
      }
      .readmore {
        display: block;
        padding: 10px 36px;
        &:hover {
          text-decoration: underline;
        }
        color: #52a7fc;
      }
    }
  }

  .footer {
    border-top: 1px solid #ebeef5;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 10px;
    font-size: 16px;
    color: rgb(172, 172, 172);
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    justify-items: center;
    flex-wrap: wrap;

    .etag {
      padding-bottom: 4px;
    }
    .info {
      height: 32px;
      line-height: 32px;
    }
  }
}

.el-col {
}
</style>