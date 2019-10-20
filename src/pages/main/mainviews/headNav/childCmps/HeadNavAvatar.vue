<template>
  <div class="head-nav-avatar">
    <el-dropdown trigger="click" class="el-dropdown">
      <a class="el-dropdown-link">
        <el-avatar
          :size="50"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          class="avatar"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </a>
      <el-dropdown-menu slot="dropdown">
        <div v-if="foldStatus">
          <el-dropdown-item
            :icon="menuURL[item.name_EN][1]"
            v-for="item in menuList"
            :key="item.name_EN"
            @click.native="contentLink(menuURL[item.name_EN][0])"
          >{{item.name_CN}}</el-dropdown-item>
        </div>

        <el-dropdown-item icon="el-icon-star-on" @click.native="usercenter">个人中心</el-dropdown-item>
        <el-dropdown-item v-if="!logStatus" icon="el-icon-upload2" @click.native="login">登录</el-dropdown-item>
        <el-dropdown-item v-if="!logStatus" icon="el-icon-date" @click.native="register">注册</el-dropdown-item>
        <el-dropdown-item v-if="logStatus" icon="el-icon-delete" @click.native="logOut">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import homePgaeService from "@common/network/homepage-service";
export default {
  name: "HeadNavAvatar",
  data() {
    return {
      menuList: [
        { name_CN: "首页"   , name_EN: "HomePgae"   },
        { name_CN: "技术分享", name_EN: "TechShare"  },
        { name_CN: "大家分享", name_EN: "FriendShare" },
        { name_CN: "娱乐"   , name_EN: "Entertainment" },
        { name_CN: "友情链接", name_EN: "FriendLink" }
      ],
      menuURL: {
        HomePgae  : ["/HomePage"  , "el-icon-menu"   ],
        TechShare : ["/TechShare" , "el-icon-setting"],
        FriendShare: ["/FriendShare", "el-icon-edit"   ],
        FriendLink: ["/FiendLink", "el-icon-share"  ],
        Entertainment: ["/Entertainment", "el-icon-plus"]
      },
      foldStatus: false,
      logStatus: false
    };
  },
  created() {
    this.nowList = this.logList; // 初始菜单状态
    this.adjustList(document.body.clientWidth);
    //请求是否登录
    this.isLoged();
  },
  mounted() {
    this.$bus.$on("resizeWindow", this.adjustList);
  },
  computed: {

  },
  methods: {
    isLoged() {
      homePgaeService.isLoged(
        res => {
          if (res) return (this.logStatus = true);
          this.logStatus = false;
        },
        err => {
          this.$message("获取登录状态失败");
          this.logStatus = false;
        }
      );
    },
    adjustList(width) {
      if (width <= 570) {
        this.foldStatus = true;
      } else {
        this.foldStatus = false;
      }
    },
    contentLink(link) {
      this.$router.push({ path: link })
    },
    login() {
      window.location.href = "/login?redirect=";
    },
    logOut() {
      homePgaeService.logOut(
        res => {
          if (res) {
            this.logStatus = false;
            console.log(123);
            window.location.reload();
            return;
          }
          this.$message("服务器出差了, 退出失败..");
        },
        err => {
          this.$message("服务器出走了一下神...");
        }
      );
    },
    register() {
    window.location.href = "/register";
    },
    usercenter() {
      console.log(123)
      this.$router.push({ path: '/UserCenter'})
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

      &:focus {
        border: 0;
        box-shadow: 0;
        outline: 0;
      }
    }
  }
}
</style>