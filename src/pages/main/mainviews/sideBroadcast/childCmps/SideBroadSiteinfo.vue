<template>
  <div class="side-broad-siteinfo">
    <h2 class="title">站点信息</h2>
    <div class="container">
      <p>
        <span class="ptitle">建站时间:</span>
        <time>{{createTime.replace(/\//g, '-')}}</time>
      </p>
      <p>
        <span class="ptitle">已经运行:</span>
        <span class="highlight">{{showTime.day}}</span>天
        <span class="highlight">{{showTime.hour}}</span>小时
        <span class="highlight">{{showTime.minute}}</span>分
        <span class="highlight">{{showTime.second}}</span>秒
      </p>
      <p>
        <span class="ptitle">沃德前端:</span>
        <span>Vue+ElementUI+Axios</span>
      </p>

      <p>
        <span class="ptitle">沃德后端:</span>
        <span>node+express+mongodb</span>
      </p>
      <p>
        <span class="ptitle">文章总数:</span>
        <span>待定...</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "SideBroadSiteinfo",
  data() {
    return {
      createTime: '2019/11/01',
      showTime: {}
    };
  },
  methods: {
    updateTime() {
      let startTime = new Date(this.createTime)
      setInterval(_ => {
        let endTime = new Date()
        let space = endTime - startTime
        let allSeconds = space / 1000 
        let tempDate = {}
        tempDate.day = Math.floor(allSeconds / (60 * 60 * 24))
        tempDate.hour = Math.floor(allSeconds % (60 * 60 * 24) / (60 * 60))
        tempDate.minute = Math.floor(allSeconds % (60 * 60 * 24) % (60 * 60) / 60)
        tempDate.second = Math.floor(allSeconds % (60 * 60 * 24) % (60 * 60) % 60)
        this.showTime = tempDate
      }, 1000);
    }
  },
  created() {
    this.updateTime()
  },
};
</script>
<style scoped lang='scss'>
.side-broad-siteinfo {
  background-color: #fff;
  margin: 10px 5px;
  padding: 20px;
  .title {
    margin-bottom: 0 !important;
    font-size: 16px;
    line-height: 40px;
    color: rgb(72, 72, 72);
    font-weight: normal;
    position: relative;
    margin-bottom: 10px;
    border-bottom: 1px solid rgb(238, 238, 238);
    &:hover::after {
      width: 80px;
    }
    &::after {
      position: absolute;
      width: 60px;
      height: 2px;
      content: "";
      left: 0;
      bottom: 0;
      background: rgb(0, 0, 0);
      transition: all 0.5s ease 0s;
    }
  }
  .container {
    line-height: 2;
    .ptitle {
      font-weight: bold;
    }
    .highlight{
      font-weight: bold;
      color: lightblue;
    }
  }
}
</style>