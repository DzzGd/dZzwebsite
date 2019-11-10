<template>
  <div class="side-broad-calendar">
    <h2 class="title">时间事件</h2>
    <el-calendar v-model="value">
      <template v-slot:dateCell="{date, data}">
        <div @click="toSearch(date, data)" class="day-conent">
          <p>{{data.day.slice(-2)}}</p>
          <svg class="icon flag" aria-hidden="true" v-if="arrShow.indexOf(data.day)!==-1">
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
    toSearch(time, info) {
      this.$router.push({ 
        path: '/SearchDetail',
        query: {
          type: 'time',
          value: time.getTime()
        }
      })
      this.$emit('getTimeData', time)
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
  watch: { //监听日期变化
    value(newVal, OldVal) {
      let year = newVal.getFullYear();
      let month = newVal.getMonth();
      this.getCalendarData(year, month);
    }
  }
};
</script>
<style scoped lang='scss'>
@import "@css/mixin";
.side-broad-calendar {
  margin: 10px 10px;
  .is-selected {
    color: $blue;
  }
  .title {
    @include shc(16px, 40px, rgb(72, 72, 72));
    padding: 20px 20px 0 20px;
    background-color: #fff;
    font-weight: normal;
    position: relative;
    border-bottom: 1px solid rgb(238, 238, 238);
    &:hover::after {
      width: 80px;
    }
    &::after {
      @include positionLB(absolute, 20px, 0);
      width: 60px;
      height: 2px;
      content: "";
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
        font-family: "幼圆";
        font-weight: bold;
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
          text-align: center;
          position: relative;
          .flag {
            display: inline-block;
            padding-top: 5px;
            font-size: 14px;
          }
          .day-conent {
            padding-top: 5px;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
          }
        }
      }
    }
  }
}
</style>