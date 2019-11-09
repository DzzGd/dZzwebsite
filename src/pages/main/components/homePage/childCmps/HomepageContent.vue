<template>
  <div class="container">
    <el-row class="inner">
      <h1 class="title">
        <span>{{title}}</span>
        <span class="more">
          <a href="/#/TechShare" @click.prevent="toTechShare">MORE...</a>
        </span>
      </h1>
      <el-col :xs="24" v-for="(item, index) in showList" :key="item._id" :sm="index===0?24:12">
        <div class="homepage-content">
          <div class="header" :style="{'color':colors[index]}">{{index+1}}. {{item.title}}</div>

          <div class="body clearfix">
            <el-row>
              <el-col :xs="24" :sm="index===0?8:0">
                <img
                  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572026206195&di=f805325cd0e79923e8b25359df3bc418&imgtype=0&src=http%3A%2F%2Fwww.codingdict.com%2Fstatic%2Fassets%2Fimages%2Fdocument%2Fvuejs-cn-guide_51hNN97.jpg"
                  alt
                  class="body-img"
                />
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
              <span>评论:{{100}}+</span>
              <span>阅读:{{item.clickhot}}</span>
            </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { METHODS } from 'http'
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
    font-size: 16px;
    font-family: "新宋体";
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
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
        font-size: 16px;
        color: #555;
        line-height: 36px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-indent: 36px;
        padding-left: 10px;
        word-break: break-all;
        cursor: pointer;
        &:hover{
          transition: .3s;
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





