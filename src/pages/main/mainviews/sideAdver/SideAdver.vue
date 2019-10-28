<template>
  <el-aside width="190px" class="side-adver">
    <div class="adver-float">
      <el-card class="box-card" :body-style="{padding:'10px '}">
        <div class="title-text">CONTACT ME</div>
        <hr />
      </el-card>

      <img src="@images/contact/wechatImg.png" alt="wechat_QR-Code" class="wechat-img" />

      <leave-message>
        <el-button type="success" size="small" slot="check-look" @click="toMessageBoard">查看</el-button>
      </leave-message>
    </div>
  </el-aside>
</template>

<script>
import LeaveMessage from "@commonCmps/leaveMessage/LeaveMessage";
export default {
  name: "SideAdver",
  data() {
    return {};
  },
  mounted() {
    this.$bus.$on()
  },
  methods: {
    toMessageBoard() {
      this.$router.push({path: '/MessageBoard'})
    }
  },
  components: {
    LeaveMessage
  }
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 992px) {
  .side-adver {
    display: none;
  }
}
.side-adver {
  .adver-float {
    width : 190px;
    bottom: 0;
    position: fixed;
    top : 80px;
    padding: 1px 3px 0 3px;
    box-sizing: border-box;
    .title-text {
      cursor: pointer;
      display: inline-block;
      transition: all 0.2s ease-in-out;
      padding-bottom: 10px;
      &:hover {
        border-color: #28a746b9;
        color: #52a7fc;
        & + hr {
          width: 100%;
          border: none;
          border-top: 2px solid #28a746b9;
        }
      }
    }
    // 下滑短线
    hr {
      margin: 0;
      border: none;
      width: 0px;
      height: 1px;
      border-top: 2px solid transparent;
      transition: all 0.1s ease-in-out;
    }
    .wechat-img {
      width: 100%;
      border: 1px solid #eee;
      box-sizing: border-box;
      transition: all 0.2s ease-in-out;
      border-radius: 4px;
      &:hover {
        transform: scale(1.1);
        box-shadow: 1px 1px 4px 1px #eee;
      }
    }
  }
}
</style>