---
title: "如何把Nuxt.js部署到网站子目录下"
description: "如何把一个Nuxt.js项目部署到子目录呢：domain.com/nuxt-proj"
pubDate: 2021-11-23T07:58:44.000Z
author: "阿斌"
tags: ["Nuxt.js", "开发笔记"]
draft: false
type: post
slug: "how-to-deploy-nuxt-proj-in-domain-sub-dir"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>通常Nuxt.js项目会被部署到根目录下，但是，有时候，也会需要部署到子目录，然后通过<code>&lt;域名&gt;/子目录/</code>来访问。</p>
<p>这需要怎么设置呢？</p>
<h1 id="">解决方法</h1>
<p>这时候，需要使用Nuxt.js提供的<code>router.base</code>参数:</p>
<blockquote>
<p><a href="https://nuxtjs.org/docs/configuration-glossary/configuration-router/#base">https://nuxtjs.org/docs/configuration-glossary/configuration-router/#base</a></p>
</blockquote>
<p><strong>例如</strong><br>
如果要部署到<code>domain.com/nuxt-proj</code></p>
<p>那么nuxt.config.js的配置就是：</p>
<pre><code>  router: {
    base: process.env.BASE_DIR || &quot;nuxt-proj&quot;
  },
</code></pre>
<!--kg-card-end: markdown-->