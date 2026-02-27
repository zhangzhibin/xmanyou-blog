---
title: "Husky钩子在SourceTree中报错：.husky/pre-commit: Line 4 npm: command not found"
description: "在命令行里跑着好好的husky怎么在SourceTree里就不行了？"
pubDate: 2021-11-01T10:29:24.000Z
author: "阿斌"
tags: ["husky", "sourcetree", "开发笔记"]
tagSlugs: ["husky", "sourcetree", "dev"]
draft: false
type: post
slug: "sourcetree-husky-npm-command-not-found"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>使用husky作为git钩子，在precommit回调中添加以下命令：</p>
<pre><code>#!/bin/sh
. &quot;$(dirname &quot;$0&quot;)/_/husky.sh&quot;

npm run prettier:src
npm run lint
</code></pre>
<p>在命令行中可以正常commit，并正确触发钩子，但是，在SourceTree中，却报错了：</p>
<pre><code>.husky/pre-commit: Line 4 npm: command not found
</code></pre>
<p><img src="/content/images/2021/11/sourcetree-husky-npm-command-not-found-01.png" alt="sourcetree-husky-npm-command-not-found-01"></p>
<h2 id="">解决方法</h2>
<p>错误描述告诉我们，这是因为SourceTree找不到husky钩子中需要使用的命令。</p>
<p><strong>解决方法</strong><br>
找到所需命令所在路径，然后添加到<code>~/.huskyrc</code>文件中。</p>
<p>找到npm所在路径的方法</p>
<pre><code>$ where npm
/usr/local/bin/npm
</code></pre>
<p>需要注意的是，该文件默认是没有的，可以手动创建文件并添加以下配置：</p>
<pre><code>export PATH=&quot;/usr/local/bin/:$PATH&quot;
</code></pre>
<p>也可以用以下命令自动创建文件并添加路径：</p>
<pre><code>echo 'export PATH=&quot;/usr/local/bin/:$PATH&quot;' &gt;&gt; ~/.huskyrc
</code></pre>
<h2 id="">参考文献</h2>
<ul>
<li><a href="https://github.com/typicode/husky/issues/904">https://github.com/typicode/husky/issues/904</a></li>
</ul>
<!--kg-card-end: markdown-->