<template>
  <el-aside width="300px" class="side-broadcast">
    <div class="my-website">我的网站</div>
    <side-broad-swiper :interval="3000"></side-broad-swiper>
    <side-broad-myinfo></side-broad-myinfo>
    <side-broad-calendar></side-broad-calendar>
    <side-broad-tags :tag-number="tagNumber"></side-broad-tags>
    <side-broad-recommend :like-data="likeData"></side-broad-recommend>
    <side-broad-siteinfo></side-broad-siteinfo>
  </el-aside>
</template>

<script>
import SideBroadSwiper from "./childCmps/SideBroadSwiper";
import SideBroadMyinfo from "./childCmps/SideBroadMyInfo";
import SideBroadTags from "./childCmps/SideBroadTags";
import SideBroadCalendar from "./childCmps/SideBroadCalendar";
import SideBroadRecommend from "./childCmps/SideBroadRecommend";
import SideBroadSiteinfo from "./childCmps/SideBroadSiteinfo";

import service from "@common/network/homepage-service";
export default {
  name: "SideBroadcast",
  props: {},
  data() {
    return {
      tagNumber: [],
      likeData: []
    };
  },
  methods: {
    getTagsCategory() {
      service.getTagsCategory(
        "node",
        res => {
          console.log(res);
        },
        err => {
          alert(err);
        }
      );
    },
    getTagNumber() {
      service.getTagNumber(
        res => {
          this.tagNumber = res.data;
        },
        _ => {
          alert(_);
        }
      );
    },
    getGuessLike() {
      service.getGuessLike(
        res => {
          this.likeData = res.data;
        },
        _ => {
          console.log(_);
        }
      );
    }
  },
  components: {
    SideBroadSwiper,
    SideBroadTags,
    SideBroadCalendar,
    SideBroadRecommend,
    SideBroadSiteinfo,
    SideBroadMyinfo
  },
  created() {
    // this.getTagsCategory()
    this.getTagNumber();
    this.getGuessLike();
  }
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 991px) {
  .side-broadcast {
    width: 100% !important;
  }
}
.side-broadcast {
  border: 1px solid #eee;
  overflow: visible;
  .my-website{
    border-top: 2px dashed pink;
    border-bottom: 2px dashed pink;
    margin-bottom: 5px;
    background-color: lightblue;
    font-size: 26px;
    padding: 20px;
  }
}
</style>