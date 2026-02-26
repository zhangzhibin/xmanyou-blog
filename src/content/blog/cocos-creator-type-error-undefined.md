---
title: "#Cocos Creator# 错误：TypeError: Object prototype may only be an Object or null: undefined"
description: "代码循环引用可能产生奇怪的错误"
pubDate: 2018-12-18T07:43:48.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "cocos creator"]
tagSlugs: ["dev", "h5", "cocos-creator"]
draft: false
type: post
slug: "cocos-creator-type-error-undefined"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p><img src="/images/2018/12/Snipaste_2018-12-18_15-36-15.png" alt="Snipaste_2018-12-18_15-36-15"></p>
<p>代码循环引用可能导致这个错误。</p>
<pre><code>假设
a.ts
A extends B

b.ts
B 的代码里又引用了A，比如有个工厂方法 create，需要根据类型来创建不同的子对象
</code></pre>
<p>由于缺少类似c++的.h文件，于是就产生了循环引用。</p>
<p>参考Cocos Creator对于循环引用的解释：</p>
<blockquote>
<p><a href="https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html#deferred-definition">https://docs.cocos.com/creator/manual/zh/scripting/reference/class.html#deferred-definition</a></p>
</blockquote>
<p><img src="/images/2018/12/Snipaste_2018-12-18_15-42-00.png" alt="Snipaste_2018-12-18_15-42-00"></p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->