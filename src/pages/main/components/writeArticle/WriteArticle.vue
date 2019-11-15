<template>
  <div class="write-article" v-loading="isLoading" :element-loading-text="loadingText">
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
    <mark-down @triggerContent="getContent" ref="articleContent" @imgUpload="imgUpload"></mark-down>
  </div>
</template>
<script>
import WriteArticleInfo from "./childCmps/WriteArticleInfo";
import MarkDown from "@commonCmps/markDown/MarkDown";

import service from "@common/network/homepage-service";
import { setStorage, getStorage, delStorage } from "@common/utils/apptools";
export default {
  name: "WriteArticle",
  data() {
    return {
      articleContent: "",
      articleData: {},
      TEMP_ARTICLE_DATA: "TEMP_ARTICLE_DATA",
      timer: null,
      isLoading: false,
      loadingText: "上传中..."
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
      // 登录验证
      if (!this.identify())
        return this.$message.error("尚未登录不能发文章哟, 亲~");
      this.validate() //文章信息验证
        .then(res => {
          if (!res) return false; //验证不通过 不发送请求
          // 先上传图片,获取远程地址,并设置到content中
          return this.imgUpload();
        })
        .then(res => {
          if (!res) return false;
          // 发起网络请求
          setTimeout(() => {
            // 获取图片地址内容, 因为图片地址(本地)改成了远程地址
            this.getImgUrlArr()
            this.sendArticle();
          }, 0);
        })
        .catch(_ => {
          this.$message.warning(_);
          this.isLoading = false;
        });
    },
    getImgUrlArr() {
      const reg = /!\[.[^!]*\]\(http(s)?:\/\/.[^!\[\]]+\.(jpg|png|jpeg|gif|webp|icon|bmp)\)/gi
      const reg1 = /!\[.[^!]*\]\((.*)\)/
      let arr = this.articleContent.match(reg)
      arr = arr ? arr : []
      arr.map(item => item.match(reg1)[1])
      this.articleData.imgUrl = arr
      this.articleData.content = this.articleContent;
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
    validate() {
      //...我去
      //验证文章信息
      return this.$refs.articleInfo.onSubmit().then(res => {
        if (!res) return false;
        if (this.articleContent.length <= 1) {
          this.$message.warning("文章内容太少啦, 加点字罗..."); // 效验文章主体内容
          return false;
        }
        return true;
      });
    },
    /**
     async validate() {  uglyfyJS 不支持...
      if (!this.identify()) {
        this.$message.error("尚未登录不能发文章哟, 亲~");
        return false;
      }
      const ret = await this.$refs.articleInfo.onSubmit(); //验证文章信息
      if (!ret) return false;
      if (this.articleContent.length <= 200) {
        this.$message.warning("文章内容太少啦, 加点字罗..."); // 效验文章主体内容
        return false;
      }
      return true;
    },
    validate() {  uglyfyJS 不支持...
      const _this = this;
      return async function fn() {
        if (!_this.identify()) {
          _this.$message.error("尚未登录不能发文章哟, 亲~");
          return false;
        }
        const ret = _this.$refs.articleInfo.onSubmit(); //验证文章信息
        if (!ret) return false;
        if (_this.articleContent.length <= 200) {
          _this.$message.warning("文章内容太少啦, 加点字罗..."); // 效验文章主体内容
          return false;
        }
        return true;
      };
    },
     */

    sendArticle() {
      this.loadingText = "正在上传文本...";
      service.sendArticle(
        this.articleData,
        res => {
          
          if (res) this.$message.success("success");
          //成功 重置内容
          this.resetDate();
          this.isLoading = false;
        },
        err => {
          this.isLoading = false;
          this.$message.error(err);
        }
      );
    },
    imgUpload() {
      this.isLoading = true;
      this.loadingText = "正在上传图片...";
      return new Promise((resolve, reject) => {
        const img_file = this.$refs.articleContent.img_file;
        const formData = new FormData();
        let index = 0;
        for (let value of Object.values(img_file)) {
          formData.append("pic_" + index++, value);
        }
        if (index === 0) return resolve(true);
        service.imgUpload(
          formData,
          res => {
            this.$refs.articleContent.$imglst2Url(res);
            resolve(true);
          },
          _ => {
            reject("上传文件出错了...");
          }
        );
      });
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
    },
    delSaveInfo() {
      delStorage();
    },
    resetDate() {
      this.$refs.articleInfo.resetForm();
      this.$refs.articleContent.resetContent();
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
  margin-bottom: 5px;
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