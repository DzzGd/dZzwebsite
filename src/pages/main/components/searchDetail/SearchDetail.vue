<template>
  <div class="search-detail">
    <h2 class="search-detail-title">
      搜索页
      <i class="el-icon-search"></i>
    </h2>
    <search-detail-input :type="type" :value="value" :total-num="totalNum"></search-detail-input>
    <search-detail-result :article-list="articleList" :loading="loading"></search-detail-result>
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
      totalNum: 0,
      currentPage: 0,
      totalPage: 1,
      quantity: 10,
      articleList: [],
      loading: false
    };
  },
  methods: {
    getSearchData() {
      service.getSearchData(this.type, ++this.currentPage, this.quantity, this.value, res => {
        console.log(1)
        this.articleList.push(...res.list)
        this.totalPage = res.totalPage
        this.totalNum  = res.totalNum
        this.loading = false
      }, _ => {
        console.log(_)
      });
    },
    setInfo() { //设置 搜索页 title 变化
      let type = this.$route.query.type;
      if (!type) return (this.type = null);
      this.type = this.$route.query.type;
      this.value = this.$route.query.value.toString();
      this.currentPage = 0 //新 type 重置数据
      this.articleList = []
      this.loading = true
      this.getSearchData();
    },
    loadMore() {
      this.getSearchData()
    }
  },
  created() {
    this.setInfo()
  },
  components: {
    SearchDetailInput,
    SearchDetailResult
  },
  watch: {
    $route(to, from) {
      this.setInfo()
    }
  }
};
</script>
<style scoped lang='scss'>
@import '@css/mixin';
.search-detail {
  .search-detail-title {
    background-color: #fbfbfb;
    @include shc(30px, 1, $red);
    font-weight: bold;
    padding: 5px 10px;
    text-align: center;
    text-shadow: 4px 4px 0px #fff, 10px 10px 0px #cbcbcd;
  }
}
</style>