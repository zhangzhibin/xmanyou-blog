---
title: "测试正常的Cocos Creator工程，打包后，某些模块居然找不到了？"
description: "今天遇到一个奇葩问题：在CocosCreator里测试运行正常的代码，打包以后，启动时居然报错了。\n检查了一下错误，居然是有些Module没找到。"
pubDate: 2018-08-23T13:45:28.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
draft: false
type: post
slug: "cocos-creatorda-bao-hou-mou-xie-mo-kuai-bao-cuo"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>今天遇到一个奇葩问题：在CocosCreator里测试运行正常的代码，打包以后，启动时居然报错了。<br>
检查了一下错误，居然是有些Module没找到。</p>
<p>虽然不知道为什么，但是通过修改require的参数，解决了这个问题。</p>
<p>对比一下:<br>
<strong>原来的require</strong></p>
<pre><code>let Utils = require(&quot;Utils/Utils&quot;);
let Bird = require(&quot;Bird&quot;);
</code></pre>
<p><strong>修改后的require</strong></p>
<pre><code>let Utils = require(&quot;./Utils/Utils&quot;);
let Bird = require(&quot;./Bird&quot;);
</code></pre>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->