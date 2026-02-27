---
title: "Egret发布小游戏报错：p2 is not defined"
description: "参考\nhttp://bbs.egret.com/thread-45982-1-1.html\n\n解决方法\n修改小游戏工程中 js/physics.js文件，在第24行左右位置\n\n       module.exports = a();\n\n\n后添加\n\n       window.p2 = a();\n\n\n如下：\n\n !fun"
pubDate: 2018-04-10T15:21:41.000Z
author: "阿斌"
tags: ["开发笔记", "egret", "微信小游戏"]
tagSlugs: ["dev", "egret", "wxgame"]
draft: false
type: post
slug: "egretfa-bu-xiao-you-xi-bao-cuo-p2-is-not-defined"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><h3 id="">参考</h3>
<p><a href="http://bbs.egret.com/thread-45982-1-1.html">http://bbs.egret.com/thread-45982-1-1.html</a></p>
<h3 id="">解决方法</h3>
<p>修改小游戏工程中 js/physics.js文件，在第24行左右位置</p>
<pre><code>       module.exports = a();
</code></pre>
<p>后添加</p>
<pre><code>       window.p2 = a();
</code></pre>
<p>如下：</p>
<pre><code> !function (a) { if (&quot;object&quot; == typeof exports)
     {
       module.exports = a();
       window.p2 = a();
     }
</code></pre>
<p><img src="/content/images/2018/04/Snip20180410_7.png" alt="Snip20180410_7"></p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->