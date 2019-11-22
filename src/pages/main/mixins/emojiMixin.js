const emoji = {
  data() {
    return {
      emojiArr: [],
      isEmojiShow: false,
    }
  },
  methods: {
    setEmoji() {
      setTimeout(() => {
        let tempArr = []
        for (let i = 128513; i <= 128591; i++) {
          tempArr.push(String.fromCodePoint("0x" + i.toString(16)))
        }
        this.emojiArr = tempArr
      }, 0)
    },
    showEmojiBox(e) {
      this.isEmojiShow = !this.isEmojiShow
    }
  },
  created() {
    this.setEmoji()
  }
}

export default emoji