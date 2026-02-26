---
title: "#JavaScript xxx === void 0 是什么意思？"
description: "答案是：用来判断是否undefined"
pubDate: 2021-09-24T01:41:21.000Z
author: "阿斌"
tags: ["JavaScript", "h5 小游戏开发", "开发笔记"]
draft: false
type: post
slug: "javascript-what-does-void-0-mean"
---

<!--kg-card-begin: markdown--><p>判断一个变量是否undefined的一种做法是：</p>
<pre><code>if( typeof(xxx) === &quot;undefined&quot; ){
    // xxx undefined
}
</code></pre>
<p>还有一种写法是:</p>
<pre><code>if( xxx === void 0 ){
    // xxx undefined
}
</code></pre>
<!--kg-card-end: markdown-->