---
title: "#Cocos 移动端游戏取消自动全屏功能"
description: "有什么办法能关闭自动全屏这个烦人的设定呢？"
pubDate: 2021-08-19T04:35:49.000Z
author: "阿斌"
tags: ["cocos creator", "h5 小游戏开发", "开发笔记"]
draft: false
type: post
slug: "cocos-creator-disable-auto-fullscreen"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>Cocos Creator游戏，选择移动端Web-Mobile打包后，在某些浏览器（比如Chrome）里运行时，会自动全屏化。</p>
<p><img src="/images/2022/03/CocosCreator-disable-auto-full-screen-on-mobile-browser-01-1.png" alt="CocosCreator-disable-auto-full-screen-on-mobile-browser-01-1"></p>
<p>这样虽然隐藏了标题栏，全屏显示游戏，看起来似乎沉浸感很强，但是对于普通用户来说，由于这个功能比较陌生，且不方便退出，其实是有点惊悚的。</p>
<p>那么有没有什么办法关闭呢？</p>
<h2 id="">解决方法</h2>
<p>官方文档中，甚至都没有介绍自动全屏这个功能，所以，更没有关闭这个选项的说明了。</p>
<p>其实也不麻烦，找到main.js文件：<br>
<img src="/images/2022/03/CocosCreator-disable-auto-full-screen-on-mobile-browser-02.png" alt="CocosCreator-disable-auto-full-screen-on-mobile-browser-02"></p>
<p>注释掉以下这段即可：</p>
<p><img src="/images/2021/08/cocos-creator-disable-auto-fullscreen.png" alt="cocos-creator-disable-auto-fullscreen"></p>
<pre><code>    // 注释掉以下这段代码，来关闭自动全屏
    cc.view.enableAutoFullScreen([
        cc.sys.BROWSER_TYPE_BAIDU,
        cc.sys.BROWSER_TYPE_BAIDU_APP,
        cc.sys.BROWSER_TYPE_WECHAT,
        cc.sys.BROWSER_TYPE_MOBILE_QQ,
        cc.sys.BROWSER_TYPE_MIUI,
        cc.sys.BROWSER_TYPE_HUAWEI,
        cc.sys.BROWSER_TYPE_UC,
    ].indexOf(cc.sys.browserType) &lt; 0);
</code></pre>
<p>或者, 传入false参数:</p>
<pre><code>    cc.view.enableAutoFullScreen(
         false
    );                
</code></pre>
<p><strong>注意</strong><br>
不同的Cocos版本中这段代码会略有不同，但是大同小异。</p>
<!--kg-card-end: markdown-->