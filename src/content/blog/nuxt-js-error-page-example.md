---
title: "#Nuxt.js 错误页示例"
description: "利用Nuxt.js的Layout组件快速实现一个错误页"
pubDate: 2021-10-26T03:38:45.000Z
author: "阿斌"
tags: ["Nuxt.js", "开发笔记"]
tagSlugs: ["nuxt-js", "dev"]
draft: false
type: post
slug: "nuxt-js-error-page-example"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>Nuxt.js提供了一个很有趣的方式来实现错误页：<strong>使用layout组件来替代page组件创建错误页</strong>。</p>
<p>详细步骤：</p>
<ul>
<li>1). 在layouts目录下创建一个error.vue文件</li>
<li>2). error.vue参考代码：</li>
</ul>
<pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;h1 v-if=&quot;error.statusCode === 404&quot;&gt;啊呀，页面找不到了呢&lt;/h1&gt;
    &lt;h1 v-else&gt;天啦撸，粗错啦！&lt;/h1&gt;
    &lt;h2&gt;错误码: {{error.statusCode}}&lt;/h2&gt;
    &lt;h2&gt;错误消息: {{error.message}}&lt;/h2&gt; 

    &lt;NuxtLink to=&quot;/&quot;&gt;返回首页&lt;/NuxtLink&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    layout: 'error', // you can set a custom layout for the error page
    props: {
      error:{
        type: Object,
        required: true
      }
    },
  }
&lt;/script&gt;
</code></pre>
<ul>
<li>3). 错误截图<br>
<img src="/images/2021/10/nuxt.js-error-page-example.png" alt="nuxt.js-error-page-example"></li>
</ul>
<p>参考：<a href="https://nuxtjs.org/docs/concepts/views/#error-page">https://nuxtjs.org/docs/concepts/views/#error-page</a></p>
<!--kg-card-end: markdown-->