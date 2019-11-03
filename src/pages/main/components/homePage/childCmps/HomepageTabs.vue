<template>
  <div class="homepage-tabs">
    <h1 class="title">
      <span>热门分类</span>
      <span class="more">
        <a href="javascript:void(0)">MORE...</a>
      </span>
    </h1>
    <el-tabs v-model="activeCategory" @tab-click="handleClick" class="el-tabs">
      <el-tab-pane v-for="item in hotCategory" 
                   :key="item.category"
                   :label="item.category" :name="item.category">
        <div class="content">
          <p v-for="(i,index) in item.rank" :key="i._id">{{index + 1}}. {{i.title}}<span v-for="j in (5-index)" :key="j">&#x1F525;</span></p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "HomepageTabs",
  props: {
    arr: {
      type: Array,
      default() {
        return [
          {
            label: "JS",
            _id: "1",
            content: [
              {
                _id: "9998",
                _con: "如何通过css让一个未知宽高的元素内的元素垂直和水平居中?"
              },
              {
                _id: "9999",
                _con: "doctype的作用是什么? 不声明会发生什么?"
              },

            ]
          },
          {
            label: "HTML",
            _id: "2",
            content: [
              {
                _id: "9998",
                _con: "如何通过css让一个未知宽高的元素内的元素垂直和水平居中?"
              },
              {
                _id: "9999",
                _con: "doctype的作用是什么? 不声明会发生什么?"
              },
              {
                _id: "19999",
                _con: "doctype的作用是什么? 不声明会发生什么?"
              },

            ]
          },
          {
            label: "CSS",
            _id: "3",
            content: [
              {
                _id: "29998",
                _con: "如何通过css让一个未知宽高的元素内的元素垂直和水平居中?"
              },
              {
                _id: "39999",
                _con: "doctype的作用是什么? 不声明会发生什么?"
              },
              {
                _id: "49999",
                _con: "doctype的作用是什么? 不声明会发生什么?"
              },
              {
                _id: "59999",
                _con: "doctype的作用是什么? 不声明会发生什么?"
              },
              {
                _id: "69999",
                _con: "doctype的作用是什么? 不声明会发生什么?"
              },

            ]
          }
        ];
      }
    },
    hotCategory:{
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeCategory: this.a
    };
  },
  methods: {
    handleClick() {
      console.log(1);
    }
  },
  watch: {
    hotCategory(val, oldVal) {
      this.activeCategory = val[0].category
    }
  }
};
</script>

<style scoped lang="scss">
.homepage-tabs {
  background-color: #fff;
  border: 1px solid #eee;
  .title {
    padding: 20px 5px 10px 10px;
    font-size: 22px;
    color: #e60023;
    font-weight: bold;
    font-weight: "黑体";
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
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
    .content{
      p{
        line-height: 24px;

        &:nth-child(1) {
          color: #e60023;
        }
        &:nth-child(2) {
          color: rgb(82, 167, 252);
        }
        &:nth-child(3) {
          color: rgb(103, 194, 58);
        }
        &:hover{
          text-decoration: underline;
          cursor: pointer;
        }
      }
    }
  }
}
</style>