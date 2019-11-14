<template>
  <div class="write-article-info">
    <el-form ref="form" 
             :model="form" 
             label-width="80px" 
             :rules="rules">
      <el-form-item label="标题" class="write-title" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="简介" class="write-title" prop="brief">
        <el-input type="textarea" v-model="form.brief"></el-input>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="分类" class="write-title category" prop="category">
        <el-radio-group v-model="form.category"
                        class="category-group">
          <el-radio v-for="categoryItem in categoryList"
                    :key="categoryItem"
                    :label="categoryItem">{{categoryItem}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider></el-divider>
      <el-form-item label="标签" class="write-title">
        <div class="container">

          <div class="tags">
            <transition-group name="tags" tag="p">
              <el-tag v-for="item in form.tags" :key="item" 
                      class="tag"
                      closable
                      @close="handleClose(item)">{{item}}
              </el-tag>
            </transition-group>
          </div>
          <el-dropdown trigger="click" placement="top">
            <el-button type="success" size="small" class="add-tag">
              添加
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown" 
                              class="el-dropdown-menu">
              <div class="write-article-info-select-container">
                <p>还可以添加<span style="color:#e60023;padding:0 4px">{{restAddTagsNum}}</span>个标签
                </p>
                <el-input v-model="selectInput" 
                          @input="serachInput" 
                          placeholder="搜索标签" 
                          clearable>
                </el-input>
                <div class="select-tags-container" @click="handleAdd($event)">
                  <transition-group name="select-tags" tag="p">
                    <span class="select-tags" 
                          v-for="item in select" 
                          :key="item">{{item}}
                    </span>
                  </transition-group>
                </div>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-form-item>
      <el-divider></el-divider>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "WriteArticleInfo",
  data() {
    return {
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 10, max:80, message: '长度在10-80个字符', trigger: 'blur'}
        ],
        brief: [
          { required: true, message: '请输入文章简要, 尽量多一点点..3q', trigger: 'blur' },
          { min: 40, max:300, message: '长度在40-300个字符', trigger: 'blur'}
        ],
        category: [
          { required: true, message: '至少选择一个分类', trigger: 'change' }
        ]
      },
      categoryList:['HTML', 'CSS', 'JavaScript', 'Vue', 'Node', 'webpack', '其他'],
      selectTagsNum: 5,
      select: [
        "Vue",
        "HTML",
        "CSS",
        "JavaScript",
        "webpack",
        "Node",
        "React",
        "Express",
        "Koa",
        "ssr",
        "Vue-Cli",
        "TypeScript"
      ],
      tempSelect: [
        "Vue",
        "HTML",
        "CSS",
        "JavaScript",
        "webpack",
        "Node",
        "React",
        "Express",
        "Koa",
        "ssr",
        "Vue-Cli",
        "TypeScript"
      ],
      form: {
        title: "",
        brief: "",
        category: "",
        tags: []
      },
      selectInput: ""
    };
  },
  methods: {
    onSubmit() {
      //elementui中的validate验证是一个异步, 没有回调callback的情况返回promise
     return this.$refs.form.validate()
    },
    serachInput() { // 搜索标签输入响应事件
      this.select = this.tempSelect.filter(value => {
        value = value.toLowerCase()
        return value.indexOf(this.selectInput.toLowerCase()) !== -1
      })
    },
    handleClose(tag) { //删除已选择标签
      this.form.tags.splice(this.form.tags.indexOf(tag), 1)
    },
    handleAdd(e) { //添加标签
      const target = e.target || window.event.srcElement
      const innerText = target.innerText
      if (target.nodeName.toUpperCase() !== 'SPAN') return
      if (this.restAddTagsNum <= 0) return
      if (this.form.tags.indexOf(innerText) !== -1) return
      this.form.tags.push(innerText)
    },
    resetForm() { //重置
      this.$refs.form.resetFields()
      this.form.tags.splice(0)
    }
  },
  computed: {
    restAddTagsNum() { // 还能添加几个标签
      return this.selectTagsNum - this.form.tags.length
      
    }
  }
}; 
</script>
<style scoped lang="scss">
.write-article-info {
  background-color: #ffffff;
  padding: 15px 16px 10px 0;
  .category-group label{
    color: #e60023 !important;
  }
  .container {
    display: flex;
    align-items: center;
    .tag {
      margin-right: 5px;
    }
    .add-tag{
      transition: all .3s;
    }
  }
}
 
.tags-enter-active,.tags-leave-active{
  transition: all .5s;
}
.tags-leave-active{
  position: absolute;
}
.tags-enter,.tags-leave-to{
  opacity: 0;
  transform: scale(0)
}
.tags-move{
  transition: all .5s;
}

.select-tags-enter, .select-tags-leave-to{
  opacity: 0;
}
.select-tags-enter-active, .select-tags-leave-active{
  transition: .3s;
}

.select-tags-move{
  transition: all .3s
}
.select-tags-leave-active{
  position: absolute;
}
</style>

<style lang="scss">
.write-title {
  label {
    font-size: 18px;
    color: #00965e;
  }
}
.write-article-info-select-container {
  padding: 10px;
  max-width: 300px;
  min-width: 200px;
  p {
    line-height: 1.2;
    margin-bottom: 10px;
    color: #6c757d;
  }
  .select-tags-container {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    user-select: none;
    .select-tags{
      display: inline-block;
      padding: 5px;
      border-radius: 4px;
      margin:3px;
      background-color: rgba(0,150,94,.1);
      color: #00965e;
      cursor: pointer;
      &:hover{
        background-color: rgba(0,150,94,.2);
        color:#004a2e;
      }
    }
  }
}
</style>