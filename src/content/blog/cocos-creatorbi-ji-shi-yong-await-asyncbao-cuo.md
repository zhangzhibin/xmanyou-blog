---
title: "#Cocos Creator笔记# 使用await/async报错 \"regeneratorRuntime is not defined\""
description: "能否在Cocos Creator 的JS代码中使用await/async呢？"
pubDate: 2018-11-16T01:49:15.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "cocos creator"]
tagSlugs: ["dev", "h5", "cocos-creator"]
draft: false
type: post
slug: "cocos-creatorbi-ji-shi-yong-await-asyncbao-cuo"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><h2 id="">错误</h2>
<p>load script [./SimpleCommand] failed : ReferenceError: regeneratorRuntime is not defined</p>
<h2 id="">版本</h2>
<p>2.0.0</p>
<h2 id="">原因</h2>
<p>在js类cc.Class中使用了await/async语法</p>
<pre><code>    async execute(notification){
        return new Promise((resolve, reject)=&gt;{
            resolve(true);
        });
    }
</code></pre>
<h2 id="">解决方法</h2>
<p>换ts？</p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->