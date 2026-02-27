---
title: "使用GOPROXY解决Go Mod无法下载第三方库的问题"
description: "go env -w GOPROXY=https://goproxy.cn,direct\n"
pubDate: 2020-05-22T14:00:47.000Z
author: "阿斌"
tags: ["开发笔记", "go"]
tagSlugs: ["dev", "go"]
draft: false
type: post
slug: "using-goproxy-cn"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题</h2>
<p>如果你的网络不太给力，在下载第三方go语言库时，经常会失败。<br>
那么，有什么办法可以加速呢？</p>
<h2 id="">解决方法</h2>
<h3 id="1">方法1. 使用好一点的网络代理</h3>
<h3 id="2goproxy">方法2. 使用GOPROXY</h3>
<p>以下命令设置使用goproxy.cn（中国镜像）</p>
<pre><code>go env -w GOPROXY=https://goproxy.cn,direct
</code></pre>
<p>之后，使用go mod的各种命令就正常啦。</p>
<!--kg-card-end: markdown-->