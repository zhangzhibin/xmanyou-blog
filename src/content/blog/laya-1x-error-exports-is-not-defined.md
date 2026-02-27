---
title: "Laya 1.x 报错：exports is not defined"
description: "从Laya 2.x 项目中搬运到Laya 1.x的一个类，怎么就出错了？"
pubDate: 2020-06-30T02:13:44.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "laya"]
tagSlugs: ["dev", "h5", "laya"]
draft: false
type: post
slug: "laya-1x-error-exports-is-not-defined"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>最近需要使用Laya 1.x版本开发一个项目。Laya虽然很早就支持使用TypeScript语言开发，但是，刚从Cocos转过来还真是很不习惯。</p>
<p><strong>而且，重要的是</strong> Laya 1.x和Laya 2.x的机制也很不一样。</p>
<p>这不，把在Laya 2.x里写好的与引擎渲染无关的类复制到Laya 1.x项目中，就出现了一个意外的错误：</p>
<pre><code>exports is not defined
</code></pre>
<h2 id="">解决方法</h2>
<p>这个其实不是简单的ts转js的问题，而跟Laya的项目发布机制相关。</p>
<p><strong>注意</strong> Laya 1.x的发布机制与Laya 2.x是不一样的，而这个错误就是这么产生的。</p>
<p>简单的说，<strong>解决方法</strong> 就是，不要在代码中使用import或者export。</p>
<p>在Laya1.x中，定义在别的文件中的类，不需要用export导出，直接使用即可。Laya 1.x项目发布后，在运行时，会自动把所有的js文件加载到内存里，不会出现引用失败的情况。</p>
<!--kg-card-end: markdown-->