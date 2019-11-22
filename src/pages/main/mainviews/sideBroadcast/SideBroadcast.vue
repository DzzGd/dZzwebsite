<template>
  <el-aside width="300px" class="side-broadcast">
    <div class="my-website">
      <i class="title-img"></i>
    </div>
    <side-broad-swiper :interval="3000"></side-broad-swiper>
    <side-broad-recommend :like-data="likeData"></side-broad-recommend>
    <side-broad-calendar></side-broad-calendar>
    <side-broad-tags :tag-number="tagNumber"></side-broad-tags>
    <side-broad-myinfo></side-broad-myinfo>
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
  position: relative;
  z-index: 100;
  border: 1px solid #eee;
  
  .my-website{
     padding: 6px 0 0 0;
     border: 1px dashed #999;
     background-color: aliceblue;
    .title-img {
      background: url('~@assets/images/logos/57.png') no-repeat -180px center;
      margin:0 auto;
      display: block;
      height: 50px;
      width: 270px;
    }
    margin-bottom: 5px;
  }
}
</style>