<template>
  <div class="user-center">
    <div class="user-center-container">
      <h2 class="user-info-header">
        <span>信息页儿~</span>
      </h2>
      <div class="user-info-body">
        <div class="user-avatar-box">
          <img
            class="user-avatar-img"
            :src="avatarAddr"
          />
          <div class="user-avatar-btn-box clearfix">
            <button class="avatar-change-btn" @click="changeAvatar">更换</button>
            <button class="avatar-submit-btn" @click="confirmAvatar" :disabled="isLoading">
              <i class="el-icon-loading" v-if="isLoading"></i>
              确定</button>
          </div>
          <user-center-avatar-box :is-show="isShow" @getAvatar="getAvatar"></user-center-avatar-box>
        </div>
        <div class="user-info-content">
          <p>
            <span>用户名:</span>
            <span>{{username}}</span>
          </p>
          <p>
            <span>注册时间:</span>
            <span>{{new Date(createTime).getTime() | dateFormat('yyyy-MM-dd')}}</span>
          </p>
          <p>
            <span>所在地:</span>
            <span>{{this.position}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserCenterAvatarBox from "./childCmps/userCenterAvatarBox";
import service from "@common/network/homepage-service"
import { mapState, mapActions } from 'vuex'
export default {
  name: "UserCenter",
  data() {
    return {
      isShow: false,
      avatarAddr: '',
      isLoading: false
    };
  },

  methods: {
    ...mapActions({
      action_Avatar: 'store_changeAvatar',
      action_pos   : 'store_getPosition'
    }),
    changeAvatar() {
      this.isShow = !this.isShow;
    },
    confirmAvatar() {
      this.isLoading = true
      if (this.avatar === this.avatarAddr) {
        this.isLoading = false
        this.$message.warning('没有更改')
        return 
      }
      service.setAvater(this._id, this.avatarAddr, res => {
        this.isLoading = false
        if (res.status === 2) {
          return this.$message.error('出错罗')
        }
        this.action_Avatar(this.avatarAddr)
        this.$message.success("切换成功");
      }, err => {
        this.$message.error('err')
      })
    },
    getAvatar(addr) {
      this.avatarAddr = addr
    }
  },
  created() {
    this.avatarAddr = this.avatar
    this.action_pos().then(res => {
      console.log(res)
    }).catch(err => {
      this.$message.warning('获取位置失败')
    })
  },
  components: {
    UserCenterAvatarBox
  },
  computed: {
    ...mapState(['_id', 'avatar', 'createTime', 'username', 'position'])
  },
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 576px) {
  .user-center-container {
    .user-info-body {
      flex-wrap: wrap;
      justify-content: left;
      .user-info-content {
        margin-top: 10px;
      }
    }
  }
}
@import "@css/mixin";
.user-center {
  background-color: #fff;
  padding-left: 5px;
  padding-right: 5px;
  .user-center-container {
    .user-info-header {
      border-bottom: 1px dashed $warning;
      text-align: center;
      padding-top: 15px;
      padding-bottom: 15px;
      span {
        @include shc(30px, 1, $warning, "Microsoft YaHei");
        font-weight: bold;
        padding: 5px 10px;
        text-align: center;
        text-shadow: 4px 4px 0px #fff, 10px 10px 0px #cbcbcd;
      }
    }
    .user-info-body {
      display: flex;
      padding: 10px 30px 10px 30px;
      .user-avatar-box {
        @include wh(150px, auto);
        @include positionLT(relative, 0, 0);
        margin-right: 30px;
        .user-avatar-img {
          width: 100%;
          border: 1px dashed $blue;
        }
        .user-avatar-btn-box {
          margin-top: 10px;
          button {
            @include shc(16px, 1.1, #fff);
            @include borderRadius(3px);
            font-weight: 400;
            text-align: center;
            background-color: transparent;
            border: 1px solid transparent;
            padding: 0.375rem 0.75rem;
            transition: color 0.15s;
            cursor: pointer;
            outline: none;
          }
          .avatar-change-btn {
            float: left;
            background-color: #0080ff;
            border-color: #0072e4;
            &:hover {
              background-color: #006ad4;
              border-color: #006ad4;
            }
            &:active {
              background-color: #0058af;
              border-color: #0059b3;
            }
          }
          .avatar-submit-btn {
            float: right;
            background-color: #00965e;
            border-color: #00965e;
            &:hover {
              background-color: #007046;
              border-color: #00633e;
            }
            &:active {
              background-color: #00633e;
              border-color: #005636;
            }
          }
        }
      }
      .user-info-content {
        p {
          line-height: 1.2;
          font-size: 18px;
          margin-bottom: 15px;
          span {
            display: inline-block;
            &:first-child {
              // text-align: left;
              width: 100px;
            }
          }
        }
      }
    }
  }
}
</style>