<template>
  <div class="head-nav-avatar">
    <el-dropdown trigger="click" class="el-dropdown" @command="handleCommand">
      <a class="el-dropdown-link">
        <el-avatar :size="50" :src="avatar" class="avatar"></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </a>
      <el-dropdown-menu slot="dropdown">
        <div v-if="foldStatus">
          <el-dropdown-item
            v-for="item in menuList"
            :icon="menuURL[item.name_EN][1]"
            :key="item.name_EN"
            :command="menuURL[item.name_EN][0]"
          >{{item.name_CN}}</el-dropdown-item>
        </div>

        <el-dropdown-item :icon="menuURL['UserCenter'][1]" :command="menuURL['UserCenter'][0]">个人中心</el-dropdown-item>
        <el-dropdown-item
          :icon="menuURL['MessageBoard'][1]"
          :command="menuURL['MessageBoard'][0]"
        >留言板</el-dropdown-item>
        <el-dropdown-item v-if="!logStatus" icon="el-icon-upload2" command="login">登录</el-dropdown-item>
        <el-dropdown-item v-if="!logStatus" icon="el-icon-date" command="register">注册</el-dropdown-item>
        <el-dropdown-item v-if="logStatus" icon="el-icon-delete" command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import homePgaeService from "@common/network/homepage-service";
import { mapState, mapActions } from "vuex";
export default {
  name: "HeadNavAvatar",
  data() {
    return {
      menuList: [
        { name_CN: "首页", name_EN: "HomePgae" },
        { name_CN: "技术分享", name_EN: "TechShare" },
        // { name_CN: "大家分享", name_EN: "FriendShare"   },
        { name_CN: "实时", name_EN: "TechNews" },
        { name_CN: "写文章", name_EN: "WriteArticle" },
        // { name_CN: "娱乐"   , name_EN: "Entertainment" },
        { name_CN: "友情链接", name_EN: "FriendLink" }
      ],
      menuURL: {
        HomePgae: ["/HomePage", "el-icon-menu"],
        TechShare: ["/TechShare", "el-icon-setting"],
        FriendShare: ["/FriendShare", "el-icon-edit"],
        FriendLink: ["/FriendLink", "el-icon-share"],
        TechNews: ["/TechNews", "el-icon-share"],
        UserCenter: ["/UserCenter", "el-icon-plus"],
        Entertainment: ["/Entertainment", "el-icon-star-on"],
        WriteArticle: ["/WriteArticle", "el-icon-edit"],
        MessageBoard: ["/MessageBoard", "el-icon-edit-outline"]
      },
      foldStatus: false
    };
  },
  created() {
    this.nowList = this.logList; // 初始菜单状态
    this.adjustList(document.body.clientWidth);
  },
  mounted() {
    this.$bus.$on("resizeWindow", this.adjustList);
  },
  computed: {
    ...mapState({
      logStatus: state => state.logStatus,
      avatar: state => state.avatar
    })
  },
  methods: {
    ...mapActions({
      changeStatus: "store_changeLogStatus"
    }),
    adjustList(width) {
      if (width <= 570) {
        this.foldStatus = true;
      } else {
        this.foldStatus = false;
      }
    },
    handleCommand(link) {
      if (link === "login") return this.login();
      if (link === "logout") return this.logout();
      if (link === "register") return this.register();
      this.$router.push({ path: link });
    },
    login() {
      // 返回跳转问题还没有解决, 先定为 homepage
      window.location.href = "/login?redirect=";
    },
    logout() {
      homePgaeService.logOut(
        res => {
          if (res) {
            return this.changeStatus({ access: false });
          }
          this.$message.error("服务器出差了, 退出失败..");
        },
        err => {
          this.$message.error("服务器走了一下神...");
        }
      );
    },
    register() {
      window.location.href = "/register";
    },
    usercenter() {
      this.$router.push({ path: "/UserCenter" });
    }
  }
};
</script>

<style scoped lang="scss">
.head-nav-avatar {
  margin-left: 20px;
  width: 70px;
  height: 50px;
  &:active {
    background-color: #eeeeeeb2;
  }
  .el-dropdown {
    .el-dropdown-link {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      .avatar {
        background-color: transparent;
      }
      &:focus {
        border: 0;
        box-shadow: 0;
        outline: 0;
      }
    }
  }
}
</style>