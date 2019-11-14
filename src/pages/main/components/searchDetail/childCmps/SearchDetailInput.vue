<template>
  <div class="search-detail-input">
    <p class="title" v-if="type">

      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouye" />
      </svg>
      <router-link class="highlight" to="/TechShare" tag="span">首页</router-link>
      <span v-for="item in valueArr" :key="item">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shuangyoujiantou-" />
        </svg>
        <span class>{{item}}</span>
      </span>

    </p>
    <dz-input @clickEvent="handleclcik" 
              @keyupEvent="handleclcik"
              v-model="keyword"></dz-input>
    <p class="result">
      搜索结果
      <span class="highlight">{{ totalNum }}</span> 条
    </p>
  </div>
</template>
<script>
import  DzInput from "@commonCmps/dzInput/DzInput"
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
    },
    totalNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      keyword: '',
      valueArr: [],
    };
  },
  methods: {
    handleclcik() {
      this.$router.push({
        path: '/SearchDetail' ,
        query: {
          type: 'keyword',
          value: this.keyword
        } 
      })
    },
    setValue() {
      let arr = []
      if (this.type === "time") {
        let timeStr = new Date(parseInt(this.value)).toLocaleDateString().split("/");
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
    this.setValue()
  },
  watch: {
    value() {
      this.setValue()
    }
  },
  components: {
    DzInput
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