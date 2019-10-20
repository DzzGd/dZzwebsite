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
