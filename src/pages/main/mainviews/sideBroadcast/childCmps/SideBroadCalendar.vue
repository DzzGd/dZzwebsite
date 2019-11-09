<template>
  <div class="side-broad-calendar">
    <h2 class="title">时间事件</h2>
    <el-calendar v-model="value">
      <template v-slot:dateCell="{date, data}">
        <div @click="log(date, data)">
          <p>{{data.day.slice(-2)}}</p>
          <svg class="icon flag" 
               aria-hidden="true"
               v-if="arrShow.indexOf(data.day)!==-1">
            <use xlink:href="#icon-tubiaozhizuomoban-" />
          </svg>
        </div>
      </template>
    </el-calendar>
  </div>
</template>
<script>
import service from "@common/network/homepage-service";
export default {
  name: "sideBroadCalendar",
  data() {
    return {
      value: new Date(),
      dateArr: {},
      arrShow: []
    };
  },
  methods: {
    log(a, b) {
      console.log(a.getTime(), b);
    },
    getCalendarData(year, month) {
      if (!this.dateArr[year]) {
        this.dateArr[year] = [];
      }
      if (!this.dateArr[year][month]) {
        this.dateArr[year][month] = false;
      } else {
        return;
      }
      let start = new Date(year, month, 1).getTime();
      let end = new Date(year, month + 1, 1).getTime();
      service.getCalendarData(start, end, res => {
        this.dateArr[year][month] = true;
        this.arrShow.push(...res.data);
      });
    }
  },
  created() {
    this.getCalendarData(this.value.getFullYear(), this.value.getMonth());
  },
  watch: {
    value(newVal, OldVal) {
      let year = newVal.getFullYear();
      let month = newVal.getMonth();
      this.getCalendarData(year, month);
    }
  }
};
</script>
<style lang="scss">
  .side-broad-calendar{
    .flag{
      font-size: 14px;
    }
  }
</style>
<style scoped lang='scss'>
.side-broad-calendar {
  margin: 10px 10px;
  .is-selected {
    color: #1989fa;
  }
  .title {
    padding: 20px 20px 0 20px;
    background-color: #fff;
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
      left: 20px;
      bottom: 0px;
      background: rgb(0, 0, 0);
      transition: all 0.5s ease 0s;
    }

  }
}
</style>

<style lang="scss">
.side-broad-calendar {
  .el-calendar {
    .el-calendar__header {
      padding-bottom: 0 !important;
      border-bottom: none !important;
      .el-calendar__title {
      }
      .el-calendar__button-group {
        .el-button-group {
          .el-button {
            padding: 5px !important;
          }
        }
      }
    }
    .el-calendar__body {
      padding: 0px 20px 35px !important;
      .el-calendar-table {
        .el-calendar-day {
          height: 42px;
        }
      }
    }
  }
}
</style>