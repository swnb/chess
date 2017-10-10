# react-project
this is  a personal project for react

第二天的代码完成了
* 自定义棋盘大小
* 自定义输赢的数目
* 棋盘历史
* 棋盘sort函数bug修复
* 棋盘引入redux来处理信息

主要对于react的棋盘教程的案例进行扩展，可以自定义棋盘大小，自定义胜利的棋子数目,还有判断输赢的算法做了优化。
现在的暂时的效果在[这里](https://swnb.github.io/react-project/views/second.html),欢迎大家帮我测试一下...后面放入服务器,加点颜色,加入websocket,做成可以定制的游戏,代码日后可以开个专题来说.

这个项目主要对于react的棋盘教程的案例进行扩展，可以自定义你的棋盘大小，还有判断输赢的算法做了优化。

```shell
    git clone -b second-day https://github.com/swnb/react-project.git

    cd react-project

    yarn 

    yarn run dev 
```

第三天代做的事情
* 将它改造成为`websocket`
* 添加颜色,优化代码,历史记录用红线连接起来..

如果浏览器没有打开的话,直接进入路由 [/index.html](http://localhost:8080/index.html)

后面添加`websocket`,加入服务端,`gh-page`的测试的[地址在这里](https://swnb.github.io/react-project/views/second.html)

附带一个自己写的webpack学习的插件，有兴趣，可以在[这里看](https://github.com/swnb/webpack-plugin)，主要实现html-webpack-plugin的一些简答功能，比如模板等。