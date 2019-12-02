# dZzwebsite

```
personal website
利用 JQuery 加 axios 建立了登录,注册,和忘记密码页面
主体内容用 vue + axios + elementUI 框架搭建
```
在线演示地址: **[http://dzzlcxx.top:8888](http://dzzlcxx.top:8888)**
## 项目大致结构

+ build(webpack配置)
  - base.config.js
  - dev.config.js
  - pro.config.js
+ node_modules
+ src
  - assets
  - common
  - pages
    * main(Vue)
      + commonts(组件)
      + mainviews(主要视图组件)
      + store(状态管理)
      + router(路由, 懒加载)
    * user(jQuery)
  - views(静态页面)
+ .babelrc
+ package.json

## 登录

+ 利用纯css将 输入用户名和密码状态与小熊关联(盗用juejin图片,嘻嘻...)
+ 对用户密码进行验证, 对用户名失去焦点请求接口验证重复性
+ 获取验证码
+ 服务端返回session, 存储cookie
+ 原始页面跳转(redirect)

## 注册

数据格式验证, 表单回填, 失焦检测

## 忘记密码

采用`class`类, 存储当前盒子状态, 根据状态显示隐藏不同内容, 问题回填, 数据格式验证

## 主要组件记录

### App.vue

展示主要界面, 利用`flex`布局实现三栏布局, 有头部导航, 左侧留言栏, 中间内容, 右侧广播和底部站点信息

用户登录状态验证, `异步`修改全局状态

这里开启了两个事件总线:  
+ 第一个就是监听窗口`resize`改变
+ 第二个就是监听`documentElement`的`scroll`滚动

根据后续功能要求, 分别采用`防抖`和`节流`进行频率限制

### HeadNav.vue(头部导航)

根据登录状态(vuex), 改变菜单项(登录或者退出), 退出时改变全局状态`logined`

`响应式`变换布局格式, 适配小屏幕端

各个主要功能组件的路由跳转

### sideBroadcast.vue(右侧栏)

展示一些博客和网站基本信息

根据`elementUI`提供的`日期`组件, 利用的具名插槽和插槽作用域, 标记当天是否发表文章

标签展示, 点击可进行标签去查询文章


### homePage.vue(主页面)

封装了轮播图组件, 实现`无缝`轮播, 并根据`时间总线`的`resize`监听调整轮播图的大小和位置

异步请求文章列表信息, 并展示到页面, 提供`加载更多`选项

异步请求了`cNode`社区接口, 实现一些`分页`展示

### TechShare.vue(文章分类展示)

异步请求文章分类的列表数据并展示

提供了`关键词`模糊搜索

### TechNews(网易新闻)

异步请求网易新闻数据, 因为有跨域, 在服务端进行请求, 并返回, 实现简单的`代理`

### writearticle

加入写文章功能(因为实在不知道添加什么功能内容了....), 利用了`mavon-editor`

实现文章基本信息内容检测, 和文章详情异步上传

如有图片, 解析`文章字符串`内容, 替换图片链接, 并将图片单独上传到静态服务器

做了一些`markdown`相关`css`的调整

emm, 好像 `uglifyjs` 不能解析`.vue`文件里面的 `async` 函数, 例如

```js
mehtods: {
  async fn() {
    var a = await xxxx
  }
}
```

只有使用promise了

### articleDetail

文章详情, 根据异步请求的字符串, 传给相关组件进行解析, 最后呈现到页面

在跳转不同文章详情时, 因为只是改变了路由的`/:id`文章编号, 因为复用问题整个组件没有重新加载, 解决办法是利用watch监听路由变化重新异步加载文章内容

```js
watch:{
  '$route': function (newVal, oldVal) {
    this.init()
  }
}
```

利用`webworker` `APi`创建了另一个线程来处理 `marked转字符串` 和 `highlight高亮`.

但是在webpack环境中要做一些文件和路径上的处理.

#### 配置base.config.js文件

添加对`自己文件名.worker.js`文件的特殊处理.

```js
modules:{
  rules:[
    {
      test: /\.worker\.js/,
      use: {
        loader: 'worker-loader',
        options:{inline:true, name:'js/[name][hash:8].js}
      }
    }
  ]
}
```

实际运作中会报`window is not defined`错误, 还需要在 `ouput`出口中加一个配置.

```js
output: {
  ...
  ...
  ...
  globalObject: 'this'
},
```

#### 使用webworker

在主线程中采用了懒加载避免`.vue`组件需要等待整个`marked.js`或者`highlight.js`下载完成才能加载

```js
const fn = resolve => require(["./parseHtml.worker.js"], resolve);
let worker = null;
```

因为在created声明周期中同求请求了`文章数据`和`worker.js`, 所以使用了promise.all等待两个异步请求同时完成, 然后对`worker`进行赋值, 处理markdown格式

```js
Promise.all([this.getWorker(), this.getDetail()]).then(res => {
  worker = new res[0]();
  this.getWorkerParse();
  this.articleData = res[1].data.data
  this.sendWorkerParse(this.articleData.content)
})
```

在worker线程中就是引用`marked.js`和`highlight.js`, 然后监听`message`事件传过来的字符串进行解析, 然后`postmessage`出去

### searchDetail.vue(搜索)

实现了`事件`搜索和`关键词模糊`搜索

### ArticleComment

文章评论和回复

### userCenter

用户中心, 简单的`头像更改`和`位置地区`显示


