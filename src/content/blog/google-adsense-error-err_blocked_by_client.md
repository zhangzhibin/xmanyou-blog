---
title: "网站上添加谷歌广告代码报错了ERR_BLOCKED_BY_CLIENT"
description: "这个可能不是谷歌的锅，而是你的广告屏蔽插件的锅。"
pubDate: 2021-08-19T04:42:22.000Z
author: "阿斌"
tags: ["开发笔记"]
tagSlugs: ["dev"]
draft: false
type: post
slug: "google-adsense-error-err_blocked_by_client"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>在自己的网站上按照文档添加谷歌广告adsense代码，结果发现报错了</p>
<pre><code>Failed to load resource: net::ERR_BLOCKED_BY_CLIENT 
</code></pre>
<p>但是别的代码，比如谷歌分析代码就是正常的，这是为什么呢？</p>
<h1 id="">解决方法</h1>
<p>原因是浏览器安装了<strong>广告屏蔽插件</strong>(Adblock)。</p>
<p>所以，解决方法就是：针对该网站，取消广告屏蔽功能。</p>
<!--kg-card-end: markdown-->