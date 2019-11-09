<template>
  <div class="tech-news-list">

  <transition-group name="list" tag="div">
    <a v-for="item in infoList"
       style="display:block"
       :key="item.docid" 
       :href="item.url"
       target="_blank">
      <my-card >
        <p slot="header">
          {{item.title}}
        </p>
        <div slot="body">
          <img v-lazy="item.imgsrc" :alt="item.title">
        </div>
        <p slot="footer">
          <time>{{item.ptime}}</time>
          <span>来源: {{item.source}}</span>
          <span>跟帖: {{item.commentCount}}</span>
        </p>
      </my-card>
    </a>
  </transition-group>

  </div>
</template>

<script>
import MyCard from "@commonCmps/myCard/MyCard";
export default {
  name: 'TechNewsList',
  props:{
    infoList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {

    }
  },
  components: {
    MyCard
  }
}
</script>

<style scoped lang="scss">
.list-enter-active{
  transition: all .3s;
}

.list-enter{
  transform: scale(0)
}
.ech-news-list{
  .header{
    font-size: 16px;
  }
}
</style>