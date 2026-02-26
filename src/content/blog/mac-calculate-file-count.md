---
title: "Mac系统如何计算文件数量"
description: "利用几个命令行可以快速实现"
pubDate: 2021-02-23T05:38:04.000Z
author: "阿斌"
tags: ["mac", "linux", "杂七杂八", "开发笔记"]
draft: false
type: post
slug: "mac-calculate-file-count"
---

<!--kg-card-begin: markdown--><p>分两种情况</p>
<h2 id="">只计算当前目录下的文件数量</h2>
<pre><code>ls | wc -l
</code></pre>
<p><strong>示例</strong></p>
<pre><code>$ ls | wc -l

268
</code></pre>
<h2 id="">计算包含子目录的所有文件数量</h2>
<pre><code>find &lt;directory&gt; -type f | wc -l
</code></pre>
<p><strong>示例</strong></p>
<pre><code>find /etc -type f | wc -l

2074
</code></pre>
<!--kg-card-end: markdown-->