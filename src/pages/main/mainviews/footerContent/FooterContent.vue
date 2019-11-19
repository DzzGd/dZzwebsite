<template>
  <el-footer class="footer-content">
    <div class="box-container">
      <div class="logo_box l">
        <img src="~@images/logos/footer_logo.png" alt />
      </div>

      <div class="site-desc">
        <p class="declare">DECLARE</p>
        <p class="declare-content">
          <span>
            😃1. 本网站由dZzGd设计并构建, 材料来自于互联网, 如有内容涉及到它人版权请立即联系给予更改
          </span>
          <br />
          <span>😃2. 欢迎大家提出修改意见</span>
          <br />
          <span>
            Copyright &copy; www.dzzlcxx.top 个人网站 All Rights Reserved.
            <br />备案号：
            <a href="http://www.beian.gov.cn" class="link" target="_blank">渝ICP备19010107</a>
          </span>
        </p>
      </div>
    </div>
  </el-footer>
</template>

<script>
export default {
  name: "FooterContent"
};
</script>

<style scoped lang="scss">
@import "@css/mixin";

.footer-content {
  @include borderRadius(3px);
  padding: 5px;
  height: auto !important;
  padding: 0 305px 0 195px;
  width: 100%;
  max-width: 1400px;
  margin: 10px auto 0px auto;
  .box-container {
    background-color: #fff;
    padding: 5px;
    .logo_box {
      @include wh(120px, 120px);
      margin-right: 10px;
      img {
        width: 100%;
        background-color: #e3ffe3;
        object-fit: contain;
        max-width: 500px;
        max-height: 300px;
        border: 6px solid white;
        box-shadow: 1px 1px 2px #c9c9c9;
      }
    }
    .site-desc {
      span {
        word-break: break-all;
        word-wrap: break-word;
        line-height: 1.5;
      }
      .declare {
        text-align: center;
        @include shc(20px, 1.2, $green, "黑体");
        font-weight: bold;
      }

      .declare-content {
        @include shc(16px, 1.2, #999);
        .highlight {
          color: #777;
          &:hover {
            color: $red;
          }
        }
        .link {
          color: #777;
          &:hover {
            color: $red;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1120px) {
  .footer-content {
    margin-top: 6px;
    padding-left: 0;
    .box-container {
      margin-left: 5px;
    }
    
  }
}
@media screen and (max-width: 991px) {
  .footer-content {
    padding-right: 0;
    .box-container {
      margin-right: 5px;
    }

  }
}
@media screen and (min-width: 1121px) {
  .footer-content {
    // width: 1400px;
  }
}
</style>