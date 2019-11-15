<template>
  <div class="mark-down">
    <mavon-editor
      v-model="MARK_DOWN_VALUE"
      @change="contentChanging"
      placeholder="---尽情发挥吧---"
      @imgAdd="$imgAdd"
      @imgDel="$imgDel"
      :toolbars="markdownOption"
      ref="$mavon"
    ></mavon-editor>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "MarkDown",
  data() {
    return {
      MARK_DOWN_VALUE: "",
      markdownOption: {
        bold: true,
        italic: true,
        header: true,
        imagelink: true
      },
      img_file: {}
    };
  },
  components: {
    mavonEditor
  },
  methods: {
    contentChanging() {
      setTimeout(() => {
        // 不加setTimeout @change触发事件比 v-model要早, $emit的内容还未更新
        this.$emit("triggerContent", this.MARK_DOWN_VALUE);
      }, 0);
    },
    $imgAdd(pos, $file) {
      let uniqueId =
        Date.now().toString(32) +
        Math.random()
          .toString()
          .slice(-6);
      this.img_file[pos] = new File(
        [$file],
        uniqueId + "." + $file.type.split("/")[1],
        { type: $file.type }
      );
    },
    $imgDel(pos) {
      delete this.img_file[pos[0]];
    },
    $imglst2Url(arr) {
        let tempArr = [];
        arr.forEach((value, index) => {
          tempArr.push([index + 1, value]);
        });
        this.$refs.$mavon.$imglst2Url(tempArr); //这是异步执行的, 坑啊
    },
    resetContent() {
      this.img_file = {}
      this.MARK_DOWN_VALUE = ''
    }
  }
};
</script>

<style scoped lang="scss">
</style>