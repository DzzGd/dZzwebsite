# dZzwebsite
personal website  
利用JQuery加axios建立了登录,注册,和忘记密码页面  
主体内容都是用vue+axios+elementUI框架搭建  

## 登录

利用纯css将 输入用户名和密码状态与小熊关联(盗用juejin图片,嘻嘻...)

对用户密码进行验证, 对用户名失去焦点请求接口验证重复性

服务端返回session, 存储cookie

原始页面跳转(redirect)

## 注册

数据格式验证, 表单回填, 失焦检车

## 忘记密码

采用class类 存储当前盒子状态, 根据状态显示隐藏不同内容, 问题回填, 数据格式验证

## writearticle

emm, uglifyjs 不能解析 对象里面的 async 函数, 例如

```js
var obj = {
  async fn() {
    var a = await xxxx
  }
}
```

只有使用promise了

## articleDetail

在跳转不同文章详情时, 因为只是改变了路由的`/:id`文章编号, 因为复用问题整个组件没有重新加载, 解决办法是利用watch监听路由变化重新异步加载文章内容

```js
watch:{
  '$route': function (newVal, oldVal) {
    this.init()
  }
}
```


利用webworker APi创建了另一个线程来处理 `marked转字符串` 和 `highlight高亮`.

但是在webpack环境中要做一些文件和路径上的处理.

### 配置base.config.js文件

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

### 使用webworker

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

### ArticleComment

评论框失去焦点消失的回调存在问题, 无论是谁先定义, 就是点击事件总是先触发, 失去焦点的事件后触发.

解决办法是将点击事件的回调放入setTimeout异步调用中, 后执行...
