<template>
  <div class="homepage-tabs">
    <h1 class="title">
      <span>热门分类</span>
      <span class="more">
        <a href="/#/TechShare" @click.prevent="toTechShare">MORE...</a>
      </span>
    </h1>
    <el-tabs v-model="activeCategory" class="el-tabs">
      <el-tab-pane
        v-for="item in hotCategory"
        :key="item.category"
        :label="item.category"
        :name="item.category"
      >
        <div class="content">
          <p v-for="(i,index) in item.rank" :key="i._id" @click="toDetail(i._id)">
            {{index + 1}}. {{i.title}}
            <span v-for="j in (5-index)" :key="j">&#x1F525;</span>
          </p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "HomepageTabs",
  props: {
    hotCategory: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      activeCategory: ""
    };
  },
  methods: {
    toTechShare() {
      this.$router.push("TechShare");
    },
    toDetail(id) {
      this.$router.push({ path: "/TechShare/Articles/" + id });
    }
  },
  watch: {
    hotCategory(val, oldVal) {
      this.activeCategory = val[0].category;
    }
  }
};
</script>

<style scoped lang="scss">
.homepage-tabs {
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all .3s;
  &:hover {
    transform: translate(1px, -1px);
    box-shadow: 0 3px 12px 1px rgba(0, 0, 0, 0.24);
  }
  .title {
    padding: 20px 5px 10px 10px;
    font-size: 22px;
    color: #e60023;
    font-weight: bold;
    font-weight: "黑体";
    border-bottom: 4px solid rgb(82, 167, 252);
    display: flex;
    justify-content: space-between;
    justify-items: center;
    .more {
      color: rgb(103, 194, 58);
      font-size: 16px;
      line-height: 22px;
      a:hover {
        color: rgb(82, 167, 252);
      }
    }
  }

  .el-tabs {
    padding: 5px 10px;
    .content {
      min-height: 160px;
      p {
        line-height: 2;

        &:nth-child(1) {
          color: #e60023;
        }
        &:nth-child(2) {
          color: rgb(82, 167, 252);
        }
        &:nth-child(3) {
          color: rgb(103, 194, 58);
        }
        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}
</style>