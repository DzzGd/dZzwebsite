<template>
  <div class="search-detail-input">
    <p class="title" v-if="type">

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouye" />
      </svg>
      <span class="highlight">首页</span>
 
      <span v-for="item in valueArr" :key="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shuangyoujiantou-" />
        </svg>
        <span class>{{item}}</span>
      </span>

    </p>
    <el-input placeholder="请输入内容" clearable v-model="searchValue">
      <i
        slot="prefix"
        class="el-input__icon el-icon-search search-icon"
        ontouchstart
        @click="handleclcik"
      ></i>
    </el-input>
    <p class="result">
      搜索结果
      <span class="highlight">0</span> 条
    </p>
  </div>
</template>
<script>
export default {
  name: "SearchDetailInput",
  props: {
    type: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      valueArr: [],
      searchValue: "",
    };
  },
  methods: {
    handleclcik() {},
    setValue() {
      let arr = []
      if (this.type === "time") {
        let timeStr = new Date(this.value).toLocaleDateString().split("-");
        arr[0] = "时间";
        arr[1] = timeStr[0] + "-" + timeStr[1].padStart(2, 0);
        arr[2] = timeStr[2].padStart(2, 0);
      } else if (this.type === 'keyword') {
        arr[0] = '关键词'
        arr[1] = this.value
      } else if (this.type === 'tag') {
        arr[0] = '标签'
        arr[1] = this.value
      }
      this.valueArr = arr
    },

  },
  created() {

  }
};
</script>
<style scoped lang='scss'>
.search-detail-input {
  padding: 20px 10px;
  background-color: #fff;
  .title {
    margin-bottom: 10px;
  }
  .highlight {
    color: green;
    cursor: pointer;
  }
  .result {
    margin-top: 10px;
  }
}
</style>

<style lang="scss">
.search-detail-input {
  .el-input__inner {
    text-align: center !important;
  }
}
</style>