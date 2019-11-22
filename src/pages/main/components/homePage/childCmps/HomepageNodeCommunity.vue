<template>
  <div class="homepage-node-community">
    <h1 class="title">
      <span>cNode社区</span>
      <span class="more">
        <a href="https://cnodejs.org" target="_blank">
        <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt="">
        </a>
      </span>
    </h1>
    <div class="container">
      <div class="header">
        <a  class="topic-nav"
            :class="currentType===item[1]?'active':''"
            v-for="item in tabList"
            :key="item[1]"
            @click.prevent="changeType(item[1])"
            :href="'#/'+item">{{item[0]}}</a>
      </div>

      <div class="topic-list" v-loading="isLoading">
        <div class="topic-item clearfix" v-for="item in currentList" :key="item.id">
          <a href class="user-avater l">
            <img :src="item.author.avatar_url" alt />
          </a>

          <span class="reply-count l" id="reply-count">
            <span class="count-of-replies" title="回复数">{{item.reply_count}}</span>
            <span class="count-seperator">/</span>
            <span class="count-of-visits" title="点击数">{{item.visit_count}}</span>
          </span>

          <a target="_blank" :href="'https://cnodejs.org/topic/'+item.id" class="last-time r" id="last-time">
            <span class="active-time">{{new Date(item.create_at).getTime()|datePassDis}}</span>
          </a>

          <div class="title-warpper" id="title-warpper">
            <a target="_blank" :href="'https://cnodejs.org/topic/'+item.id" class="topic-title ellipsis" id="topic-title">{{item.title}}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination">
      <el-pagination layout="prev, pager, next"
                     background 
                     :pager-count="5"
                     :page-count="20"
                     @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import service from "@common/network/homepage-service"
export default {
  name: "HomepageNodeCommunity",
  data() {
    return {
      tabList: [['精选', 'good'], ['分享', 'share'], ['问答', 'ask']],
      typeList: {
        share: { currentPage: 0, list: new Array(20).fill('') },
        good: { currentPage: 0, list: new Array(20).fill('') },
        ask: { currentPage: 0, list: new Array(20).fill('') }
      },
      currentType: "good",
      defaultLimit: 15,
      isLoading: false
    };
  },
  methods: {
    pageChangeDataList(page) { //通过点击 页数 按钮的情况
      this.typeList[this.currentType].currentPage = page
      const currList = this.typeList[this.currentType].list
      if (currList[page - 1]) return //已有的不再请求
      const info = {
        page: page,
        tab: this.currentType,
        limit: this.defaultLimit
      }
      this.getDataList(info, currList)
    },
    changeTabDataList() { //通过tab切换的情况(主要是针对首次点击)
      const currList = this.typeList[this.currentType].list
      const currPage = this.typeList[this.currentType].currentPage
      if (currPage !== 0) return
      const newpage = ++this.typeList[this.currentType].currentPage
      const info = {
        page: newpage,
        tab: this.currentType,
        limit: this.defaultLimit
      }
      this.getDataList(info, currList)
    },
    getDataList(info, currList) {
      this.isLoading = true
      service.getCnodeCommunity(info, res => {
        currList.splice(info.page - 1, 1, res.data)
        this.isLoading = false
      }, err => { 
        this.isLoading = false
        })
    },
    changeType(type) {
      this.currentType = type
      this.changeTabDataList()
    },
    pageChange(page) {
      this.pageChangeDataList(page)
    }
  },
  created() {
    this.pageChangeDataList(1)
  },
  computed: {
    currentList() { //内容列表
    const page = this.typeList[this.currentType].currentPage
    const list = this.typeList[this.currentType].list
      return list[page - 1]
    }
  }
};
</script>
<style scoped lang='scss'>
@media screen and (max-width: 991px) {
  .homepage-node-community {
    #title-warpper {
      padding-left: 40px;
      #topic_title {
        font-size: 14px;
      }
    }
      
  }
  #last-time {
    position: absolute;
    bottom: 0;
    right: 10px;
  }
  #reply-count {
    position: absolute;
    bottom: -6px;
    left: 50px;
    text-align: left;
  }
}
.homepage-node-community {
  .active {
    background-color: #80bd01;
    color: #fff;
    padding: 3px 4px;
    border-radius: 3px;
  }
  border: 1px solid #eee;
  .title {
    background-color: #aaa;
    padding: 20px 5px 10px 10px;
    font-size: 22px;
    color: #e60023;
    font-weight: bold;
    border-bottom: 2px solid rgb(82, 167, 252);
    display: flex;
    justify-content: space-between;
    .more {
      color: rgb(103, 194, 58);
      width: 120px;
      // height: 30px;
      font-size: 16px;
      a:hover {
        color: rgb(82, 167, 252);
      }
      img {
        width: 100%;
        position: relative;
        top: -4px;
      }
    }
  }
  .container {
    .header {
      background-color: #f6f6f6;
      padding: 10px;
      .topic-nav {
        font-size: 14px;
        margin: 0 10px;
        color: #80bd01;
      }
      .active {
        background-color: #80bd01;
        color: #fff;
        padding: 3px 4px;
        border-radius: 3px;
      }
    }
    .topic-list {
      min-height: 100px;
      .topic-item {
        position: relative;
        font-size: 14px;
        padding: 10px;
        text-align: center;
        border-top: 1px solid #f0f0f0;
        &:hover {
          background-color: #f6f6f6;
          .topic-title {
            text-decoration: underline;
          }
        }
        &:nth-child(1) {
          border-top: none;
        }
        &:last-child {
          border-bottom: 1px solid #f0f0f0;
        }
        .user-avater {
          img {
            max-width: 100%;
            width: 30px;
            height: 30px;
            border-radius: 3px;
          }
        }
        .reply-count {
          line-height: 2;
          width: 70px;
          display: inline-block;
          white-space: nowrap;
          .count-of-replies {
            color: #9e79c0;
          }
          .count-of-visits {
            color: #9e79c0;
            font-size: 10px;
            color: #b4b4b4;
          }
        }
        .last-time {
          color: #778087;
          font-size: 11px;
          line-height: 2rem;
          .active-time {
            text-align: right;
            min-width: 50px;
            display: inline-block;
            white-space: nowrap;
          }
        }
        .title-warpper {
          padding-left: 110px;
          text-align: left;
          .topic-title {
            max-width: 70%;
            display: inline-block;
            vertical-align: middle;
            font-size: 16px;
            line-height: 30px;
            color: #333;
            cursor: pointer;
            &:visited {
              color: #888;
            }
          }
        }
      }
    }
  }
  .pagination {
    margin-top: 10px;
    .el-pagination {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
