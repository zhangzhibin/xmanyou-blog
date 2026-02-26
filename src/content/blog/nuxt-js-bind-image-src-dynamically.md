---
title: "#Nuxt.js 动态绑定img"
description: "参照官方示例尝试动态绑定image，居然失败了？"
pubDate: 2021-12-03T10:28:42.000Z
author: "阿斌"
tags: ["Nuxt.js", "开发笔记"]
draft: false
type: post
slug: "nuxt-js-bind-image-src-dynamically"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>在Nuxt.js项目中，有时候需要为image绑定指定src。</p>
<p>举个例子</p>
<pre><code>image_src = &quot;~/assets/img/image.png&quot;
</code></pre>
<p>以下两种做法都会报错:</p>
<ul>
<li>错误做法1</li>
</ul>
<pre><code>   &lt;img
     :src=&quot;image_src&quot;
     width=&quot;70px&quot;
     height=&quot;80px&quot;
   /&gt;
</code></pre>
<p>错误：<br>
图片无法展示，路径错误。</p>
<ul>
<li>错误做法2</li>
</ul>
<pre><code>   &lt;img
     :src=&quot;require(`${image_src}`)&quot;
     width=&quot;70px&quot;
     height=&quot;80px&quot;
   /&gt;
</code></pre>
<p>错误：</p>
<pre><code> ERROR  [Vue warn]: Error in render: &quot;Error: Cannot find module '~/assets/img/image.png'&quot;
</code></pre>
<h1 id="">解决方法</h1>
<p>对比官方文档中的示例:</p>
<blockquote>
<p><a href="https://nuxtjs.org/docs/directory-structure/assets/">https://nuxtjs.org/docs/directory-structure/assets/</a></p>
</blockquote>
<p>参考官方示例</p>
<pre><code>&lt;img :src=&quot;require(`~/assets/img/${image}.jpg`)&quot; /&gt;
</code></pre>
<p>修改成</p>
<pre><code>image_src=&quot;image.png&quot;
</code></pre>
<pre><code>   &lt;img
     :src=&quot;require(`~/assets/${image_src}`)&quot;
     width=&quot;70px&quot;
     height=&quot;80px&quot;
   /&gt;
</code></pre>
<p>问题就解决了。</p>
<h2 id="">原理解释</h2>
<p>看起来这是因为nuxt.js中，路径<code>~</code>是个特殊路径，需要在编译阶段进行解析，无法在客户端进行。</p>
<!--kg-card-end: markdown-->