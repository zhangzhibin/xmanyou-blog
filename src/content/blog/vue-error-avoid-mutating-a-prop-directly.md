---
title: "Vue 错误：Avoid mutating a prop directly"
description: "Vue新手容易犯的一个错误"
pubDate: 2020-05-08T05:26:49.000Z
author: "阿斌"
tags: ["开发笔记", "Vue"]
tagSlugs: ["dev", "vue"]
draft: false
type: post
slug: "vue-error-avoid-mutating-a-prop-directly"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">错误</h1>
<p><img src="/content/images/2020/05/Vue-Avoid-mutating-a-prop-directly-01.png" alt="Vue-Avoid-mutating-a-prop-directly-01"></p>
<pre><code>  Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop’s value. Prop being mutated: xxx
</code></pre>
<h1 id="">原因</h1>
<p>在Component的定义中为Prop属性变量赋值了。</p>
<pre><code>@Prop({ required: true })
actionUrl:string = ''
</code></pre>
<h1 id="">解决方法</h1>
<p>去掉为Prop属性变量赋值的代码。</p>
<pre><code>@Prop({ required: true })
actionUrl:string
</code></pre>
<!--kg-card-end: markdown-->