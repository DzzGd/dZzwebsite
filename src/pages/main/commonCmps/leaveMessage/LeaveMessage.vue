<template>
  <el-card class="box-card" :body-style="{padding:'10px '}">
    <div class="title-text">
      <label for="leave-message">
        快速-留言😊
        <i class="el-icon-edit"></i>
      </label>
    </div>
    <hr />

    <el-input
      id="leave-message"
      class="leave-message"
      type="textarea"
      placeholder="请输入留言内容"
      clearable
      maxlength="100"
      minlength="10"
      rows="6"
      prefix-icon="el-icon-edit"
      v-model="leaveMessage"
    ></el-input>
    <div class="btn-container">
      <el-button
        plain
        size="small"
        icon="el-icon-upload2"
        :loading="sendLoading"
        @click="sendLeaveMessage"
      >biu~biu~</el-button>
      <slot name="check-look"></slot>
    </div>
  </el-card>
</template>

<script>
import homepageService from "@common/network/homepage-service";
export default {
  name: "LeaveMessage",
  data() {
    return {
      leaveMessage: "",
      sendLoading: false
    };
  },
  methods: {
    sendLeaveMessage() {
      this.sendLoading = true;
      let userInfo = this.$store.getters.get_userinfo;
      let sendInfo = {
        content: this.leaveMessage,
        poster: userInfo._id,
        username: userInfo.username
      };
      console.log(sendInfo);
      homepageService.sendLeaveMessage(
        sendInfo,
        res => {
          if (!res) {
            this.sendLoading = false;
            this.$message.error("发送失败, 服务器可能扯拐了~, 等会回来...");
          } else {
            this.$message.success("发送成功~, 3阔斯,瑞瑞马骑!");
            this.leaveMessage = "";
          }
          this.sendLoading = false;
        },
        err => {
          this.sendLoading = false;
          this.$message.error("发送错误, 估计服务器又扯拐了");
        }
      );
    }
  }
};
</script>

<style scoped lang="scss">
.title-text {
  padding-bottom: 10px;
  transition: all 0.2s ease-in-out;
  display: inline-block;
  label {
    cursor: pointer;
  }
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
hr {
  margin: 0;
  border: none;
  border-top: 2px solid transparent;
  width: 0px;
  height: 1px;
  transition: all 0.1s ease-in-out;
}

.leave-message {
  margin-top: 10px;
  margin-bottom: 10px;
}
.btn-container {
  display: flex;
  justify-content: space-between;
}
</style>