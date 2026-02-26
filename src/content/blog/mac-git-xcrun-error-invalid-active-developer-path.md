---
title: "#Mac git命令报错 xcrun: error: invalid active developer path"
description: "git突然不能用了，不要急，你可能需要升级一下xcode的命令行。"
pubDate: 2021-03-05T09:27:55.000Z
author: "阿斌"
tags: ["mac", "开发笔记"]
draft: false
type: post
slug: "mac-git-xcrun-error-invalid-active-developer-path"
---

<!--kg-card-begin: markdown--><h1 id="">问题</h1>
<p>某天，升级完MacOS到Big Sur 11.2.2，然后突然发现git不好用了！</p>
<pre><code>git

xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
</code></pre>
<h1 id="">解决方法</h1>
<p>大概是xcode的一些工具也需要升级。</p>
<p>所以，方法是重新安装xcode的命令行工具：</p>
<pre><code>xcode-select --install
</code></pre>
<p>在弹窗中选择“<strong>安装</strong>”<br>
<img src="/images/2021/03/missing-xrun-xcode-select.png" alt="missing-xrun-xcode-select"></p>
<p>然后ok了。</p>
<p>如果还不行，可以参考这篇文章提到的另一个方法</p>
<blockquote>
<p><a href="https://www.jianshu.com/p/50b6771eb853">https://www.jianshu.com/p/50b6771eb853</a></p>
</blockquote>
<pre><code>sudo xcode-select -switch /
</code></pre>
<!--kg-card-end: markdown-->