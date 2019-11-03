<template>
  <div class="write-article">
    <header class="write-article-header">
      <span class="go-back">
        <a href="javascript:void(0)">&lt;&lt;返回</a>
      </span>
      <div>写文章</div>
      <el-button type="primary" size="small" @click="submit">发表</el-button>
    </header>
    <div class="base-info">
      <write-article-info ref="articleInfo"></write-article-info>
    </div>
    <mark-down @triggerContent="getContent" ref="articleContent"></mark-down>
    <!-- <write-article-footer class="write-article-footer"></write-article-footer> -->
  </div>
</template>
<script>
import WriteArticleInfo from "./childCmps/WriteArticleInfo";
import MarkDown from "@commonCmps/markDown/MarkDown";

import homepageService from "@common/network/homepage-service";
import { setStorage, getStorage } from "@common/utils/apptools";
export default {
  name: "WriteArticle",
  data() {
    return {
      articleContent: "",
      articleData: {},
      TEMP_ARTICLE_DATA: "TEMP_ARTICLE_DATA",
      timer: null
    };
  },
  mounted() {
    this.pollingSaveInfo();
    this.getSaveInfo();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    getContent(content) {
      this.articleContent = content;
    },
    submit() {
      this.getAllData();
      console.log(this.articleContent)
      // 登录验证
      if (!this.identify()) return this.$message.error("尚未登录不能发文章哟, 亲~");
      this.validate()
        .then(res => {
          if (!res) return; //验证不通过 不发送请求
          // 发起网络请求
          this.sendArticle();
        })
        .catch(err => console.log(err));
    },
    getAllData() {
      // 文章信息
      for (let [key, value] of Object.entries(this.$refs.articleInfo.form)) {
        this.articleData[key] = value;
      }
      // 内容信息
      this.articleData.content = this.articleContent;
      // 用户信息
      const userInfo = this.$store.getters.get_userinfo;
      this.articleData.author = userInfo.username;
      this.articleData.authorId = userInfo._id;
    },
    validate() {  //...我去
      //验证文章信息
      return this.$refs.articleInfo
        .onSubmit()
        .then(res => {
          if (!res) return Promise.reject();
          if (res) return Promise.resolve();
        })
        .then(
          res => {
            if (this.articleContent.length <= 200) {
              this.$message.warning("文章内容太少啦, 加点字罗..."); // 效验文章主体内容
              return Promise.resolve(false);
            }
            return Promise.resolve(true);
          },
          err => {
            return Promise.resolve(false)
          }
        );
      
    },
    // async validate() {  uglyfyJS 不支持...
    //   if (!this.identify()) {
    //     this.$message.error("尚未登录不能发文章哟, 亲~");
    //     return false;
    //   }
    //   const ret = await this.$refs.articleInfo.onSubmit(); //验证文章信息
    //   if (!ret) return false;
    //   if (this.articleContent.length <= 200) {
    //     this.$message.warning("文章内容太少啦, 加点字罗..."); // 效验文章主体内容
    //     return false;
    //   }
    //   return true;
    // },
    // validate() {  uglyfyJS 不支持...
    //   const _this = this;
    //   return async function fn() {
    //     if (!_this.identify()) {
    //       _this.$message.error("尚未登录不能发文章哟, 亲~");
    //       return false;
    //     }
    //     const ret = _this.$refs.articleInfo.onSubmit(); //验证文章信息
    //     if (!ret) return false;
    //     if (_this.articleContent.length <= 200) {
    //       _this.$message.warning("文章内容太少啦, 加点字罗..."); // 效验文章主体内容
    //       return false;
    //     }
    //     return true;
    //   };
    // },
    sendArticle() {
      homepageService.sendArticle(
        this.articleData,
        res => {
          if (res) this.$message.success("success");
        },
        err => {
          this.$message.error("error");
        }
      );
    },
    identify() {
      //验证登录信息
      if (!this.$store.getters.get_log_status) return false;
      return true;
    },
    pollingSaveInfo() {
      //轮询保存已输入信息
      this.timer = setInterval(() => {
        this.getAllData();
        setStorage(this.TEMP_ARTICLE_DATA, this.articleData);
      }, 1000 * 10);
    },
    getSaveInfo() {
      const tempdata = getStorage(this.TEMP_ARTICLE_DATA);
      // 设置缓存数据数据
      for (let [key, value] of Object.entries(tempdata)) {
        if (key === "content") {
          this.$refs.articleContent.MARK_DOWN_VALUE = tempdata.content;
        } else if (key !== "author" && key !== "authorId") {
          this.$refs.articleInfo.form[key] = value;
        }
      }
    }
  },
  components: {
    WriteArticleInfo,
    MarkDown
  }
};
</script>
<style scoped lang="scss">
.write-article {
  .write-article-header {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    line-height: 1.2;
    position: relative;
    z-index: 1;
    background-color: #fff;
    margin-bottom: 20px;
    span {
      width: 60px;
      a {
        color: #00965e;
      }
      &:hover {
        font-weight: bold;
      }
    }
    div {
      font-size: 1.25rem;
    }
  }
}
</style>