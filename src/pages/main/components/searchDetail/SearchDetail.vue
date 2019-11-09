<template>
  <div class="search-detail">
    <h2 class="search-detail-title">
      搜索页
      <i class="el-icon-search"></i>
    </h2>
    <search-detail-input ref="input" :type="type" :value="value"></search-detail-input>
    <search-detail-result :article-list="articleList"></search-detail-result>
  </div>
</template>
<script>
import SearchDetailInput from "./childCmps/SearchDetailInput";
import SearchDetailResult from "./childCmps/SearchDetailResult";
import service from '@common/network/homepage-service'
export default {
  name: "SearchDetail",
  data() {
    return {
      type: null,
      value: "",
      valueArr: [],
      currentPage: 0,
      quantity: 10,
      articleList: []
    };
  },
  methods: {
    getSearchData() {
      service.getSearchData(this.type, ++this.currentPage, this.quantity, this.value, res => {
        this.articleList = res.list
      }, _ => {
        console.log(_)
      });
    }
  },
  created() {
    let type = this.$route.query.type;
    if (!type) return (this.type = null);
    this.type = this.$route.query.type;
    this.value = this.$route.query.value;
    this.getSearchData();
  },
  mounted() {
    this.$refs.input.setValue();
  },
  components: {
    SearchDetailInput,
    SearchDetailResult
  }
};
</script>
<style scoped lang='scss'>
.search-detail {
  .search-detail-title {
    background-color: #fbfbfb;
    font-weight: bold;
    padding: 5px 10px;
    text-align: center;
    font-size: 30px;
    color: #e64037;
    text-shadow: 4px 4px 0px #fff, 10px 10px 0px #cbcbcd;
  }
}
</style>