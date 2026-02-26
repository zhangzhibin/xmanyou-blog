---
title: "如何忽略不想修改的TypeScript编译错误？"
description: "//@ts-ignore解决你的烦恼"
pubDate: 2020-05-25T05:25:45.000Z
author: "阿斌"
tags: ["开发笔记", "typescript"]
draft: false
type: post
slug: "how-to-ignore-typescript-compile-error"
---

<!--kg-card-begin: markdown--><h1 id="">问题</h1>
<p>TypeScript是对JavaScript一个非常有益的补充，用TypeScript来写JavaScript代码，可以在编译期解决很多问题，提高代码质量。</p>
<p>但是，凡事有个但是，有时候我们还是想要忽略一些编译错误，利用JavaScript的灵活性，减少一些工作量。</p>
<p>那么，这时候，要怎样忽略TypeScript编译成JavaScript时报的错误呢？</p>
<p>比如，以下代码就报了这么一个错误：</p>
<pre><code>TS2322: Type 'null' is not assignable to type 'string[]'
</code></pre>
<p><img src="/images/2020/05/TypeScript_ignore_error01.png" alt="TypeScript_ignore_error01"></p>
<h1 id="">解决方法</h1>
<p>针对我们这种懒癌患者，TypeScript很贴心地提供一个工具：ts-ignore</p>
<p>只需要将下边这行代码放在报错的代码前边，一切就安静了：</p>
<pre><code>//@ts-ignore
这里是报错的正确代码
</code></pre>
<p>像这样子：<br>
<img src="/images/2020/05/TypeScript_ignore_error02.png" alt="TypeScript_ignore_error02"></p>
<h1 id="">友情提示</h1>
<p>这个方法虽然好用，但是仅限于在你<strong>确定一定以及肯定</strong>代码没问题的时候才能用。</p>
<!--kg-card-end: markdown-->