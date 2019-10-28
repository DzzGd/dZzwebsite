<template>
  <div class="mark-down">
    <mavon-editor v-model="MARK_DOWN_VALUE" @change="contentChanging" placeholder="---尽情发挥吧---">
    </mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'MarkDown',
  data() {
    return {
      MARK_DOWN_VALUE: ''
    }
  },
  components:{
    mavonEditor
  },
  methods: {
    contentChanging() {
      setTimeout(() => { // 不加setTimeout @change触发事件比 v-model要早, $emit的内容还未更新
        this.$emit('triggerContent', this.MARK_DOWN_VALUE)
      }, 0);
    },
  }
}
</script>

<style scoped lang="scss">

</style>