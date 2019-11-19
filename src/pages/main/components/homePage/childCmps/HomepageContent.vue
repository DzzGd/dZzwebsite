<template>
  <div class="container">
    <el-row class="inner">
      <h1 class="title">
        <span>{{title}}</span>
        <span class="more">
          <a href="/#/TechShare" @click.prevent="toTechShare">MORE...</a>
        </span>
      </h1>
      <el-col :xs="24" v-for="(item, index) in showList" :key="item._id" :sm="index===0?24:12" class="inner-content">
        <div class="homepage-content">
          <div class="header ellipsis" :style="{'color':colors[index]}">{{index+1}}. {{item.title}}</div>

          <div class="body clearfix">
            <el-row>
              <el-col :xs="24" :sm="index===0?8:0">
                <div class="thumb">
                  <img
                    :src="item.imgUrl[0]?item.imgUrl[0]:'http://bpic.588ku.com/element_origin_min_pic/17/02/06/ed0c0ddc6271b0717ca64ffdf847eab6.jpg'"
                    class="body-img"/>
                </div>
              </el-col>
 
              <el-col :xs="24" :sm="index===0?16:24" class="el-col">
                <div class="body-container">
                  <a :href="'/#/ArticleDetail/'+item._id"
                     @click.prevent="toDetail(item._id)">
                    <p class="body-content">{{item.brief}}</p>
                    <span class="readmore">阅读更多</span>
                  </a>
                </div>
              </el-col>
            </el-row>
          </div>

          <div class="footer">
            <p class="etag">
              <el-tag v-for="tag in item.tags" :key="tag">{{tag}}</el-tag>
            </p>
            <p class="info">
              <span>{{item.author}}:</span>
              <span>{{new Date(item.createTime).getTime() | dateFormat('yyyy-MM-dd hh:mm')}}</span>
              <span>{{item.comments.commentsNum}}</span>
              <span>阅读:{{item.clickhot}}</span>
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
    },
    showList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return{
      colors: ["#e60023", "#52a7fc", "#67C23A"]
    }
  },
  methods: {
    toDetail(id) {
      this.$router.push({ path: 'TechShare/Articles/' + id})
    },
    toTechShare() {
      this.$router.push('TechShare')
    }
  }
};
</script>

<style scoped lang="scss">
@import '@css/mixin';
@media screen and (max-width: 768px) {
  .body-content {
    padding-left: 0 !important;
    margin-top: 8px;
  }
}

.container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  border-top: 1px solid #eee;
  .inner {
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

.inner-content {
  &:first-of-type{
    margin-bottom: 5px;
  }
}
.homepage-content {
  overflow: hidden;
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  .header {
    @include shc(16px, 1.5, $red, "Microsoft YaHei");
    border-bottom: 1px solid #ebeef5;
    padding: 10px;
    font-weight: bold;
  }
  .body {
    font-size: 18px;
    padding: 10px;
    overflow: hidden;
    .body-img {
      margin: 0 auto;
      background-color: rgb(248, 248, 248);
      width: 100%;
      object-fit: contain;
      max-width: 500px;
      max-height: 300px;
      border: 6px solid white;
      box-shadow: 1px 1px 5px #333333;
    }

    .body-container {
      height: 110px;
      .body-content {
        @include font(16px, 1.5, "黑体");
        @include linesEllipsis(3);
        color: #555;
        text-indent: 36px;
        padding-left: 10px;
        cursor: pointer;
        transition: .3s;
        &:hover{
          transform: translate(1px,-1px);
        }
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
    @include shc(16px, 1, rgb(172, 172, 172));
    @include fj(space-around, row, center);
    border-top: 1px solid #ebeef5;
    padding-top: 10px;
    flex-wrap: wrap;
    .etag {
      padding-bottom: 4px;
      span{
        margin-right: 5px;
      }
      
    }
    .info {
      height: 32px;
      line-height: 32px;
    }
  }
}
</style>





