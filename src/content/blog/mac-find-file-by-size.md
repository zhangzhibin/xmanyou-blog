---
title: "Mac/Linux 根据大小查找文件"
description: "利用find查找指定大小的文件"
pubDate: 2021-02-25T10:18:39.000Z
author: "阿斌"
tags: ["mac", "linux", "开发笔记"]
draft: false
type: post
slug: "mac-find-file-by-size"
---

<!--kg-card-begin: markdown--><h1 id="">命令</h1>
<p>利用find命令，可以查找相应大小的文件</p>
<pre><code>find &lt;path&gt; -type f -size &lt;size filter&gt;
</code></pre>
<p>查找并列出所有文件的详细路径，则可以加上 -exec ls -l {} +</p>
<pre><code>find &lt;path&gt; -type f -size &lt;size filter&gt; -exec ls -l {} +
</code></pre>
<h2 id="">具体参数</h2>
<p>其中，size filter的格式：</p>
<ul>
<li>大于: +size</li>
<li>小于: -size</li>
<li>等于: size</li>
</ul>
<p>size呢，则是由数字加上单位构成，单位包括：</p>
<ul>
<li>b : 512字节的块(block)</li>
<li>c : 1个字节</li>
<li>w : 2个字节(word)</li>
<li>k : KB</li>
<li>M : MB</li>
<li>G : GB</li>
</ul>
<h1 id="">举几个例子</h1>
<ol>
<li>查找0字节文件</li>
</ol>
<pre><code>find . -type f -size 0 -exec ls -l {} +
</code></pre>
<ol start="2">
<li>查找在10M和20M之间的文件</li>
</ol>
<pre><code>find . -type f -size +10M -size -20M
</code></pre>
<h1 id="">参考文献</h1>
<ol>
<li><a href="https://www.ducea.com/2008/02/12/linux-tips-find-all-files-of-a-particular-size/">https://www.ducea.com/2008/02/12/linux-tips-find-all-files-of-a-particular-size/</a></li>
<li><a href="https://linuxconfig.org/how-to-use-find-command-to-search-for-files-based-on-file-size">https://linuxconfig.org/how-to-use-find-command-to-search-for-files-based-on-file-size</a></li>
<li><a href="https://ostechnix.com/find-files-bigger-smaller-x-size-linux/">https://ostechnix.com/find-files-bigger-smaller-x-size-linux/</a></li>
</ol>
<!--kg-card-end: markdown-->