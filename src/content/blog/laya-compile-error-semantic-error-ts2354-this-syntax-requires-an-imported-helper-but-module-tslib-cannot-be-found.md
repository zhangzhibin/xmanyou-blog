---
title: "#Laya 编译报错：semantic error TS2354: This syntax requires an imported helper but module 'tslib' cannot be found."
description: "laya居然不支持typescript的await/async语法？"
pubDate: 2020-06-18T02:11:18.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "laya", "typescript"]
tagSlugs: ["dev", "h5", "laya", "typescript"]
draft: false
type: post
slug: "laya-compile-error-semantic-error-ts2354-this-syntax-requires-an-imported-helper-but-module-tslib-cannot-be-found"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题描述</h2>
<p>Laya版本：2.6<br>
语言：TypeScript</p>
<p>例子编译正常，但是自己的代码编译的时候报错，相同代码在Cocos Creator中正常。</p>
<p>错误信息：</p>
<pre><code>semantic error TS2354: This syntax requires an imported helper but module 'tslib' cannot be found.
</code></pre>
<h2 id="">解决方法</h2>
<p>找到报错的行，发现该代码使用了async/await语法。</p>
<pre><code>async preloadResource(url?:string){
    if(this._resourceReady){
        return;
    }
    ...
}
</code></pre>
<p>去掉async，await用then/catch重写，然后重新编译，发现正常了。</p>
<h2 id="">原因</h2>
<p>所以出错的原因是：<br>
<strong>laya不支持 await/async 语法</strong></p>
<!--kg-card-end: markdown-->