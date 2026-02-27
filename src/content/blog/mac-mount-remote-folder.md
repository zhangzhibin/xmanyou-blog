---
title: "MacFUSE+sshfs让Mac像管理本地文件一样管理远程服务器文件"
description: "利用MacFUSE和sshfs可以实现"
pubDate: 2021-02-23T06:21:55.000Z
author: "阿斌"
tags: ["mac", "开发笔记"]
tagSlugs: ["mac", "dev"]
draft: false
type: post
slug: "mac-mount-remote-folder"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>想要从Mac开发机上管理远程服务器的配置文件，如果只是偶尔修改一下，可以利用scp来进行文件更新。</p>
<p>但是，如果要频繁修改，或者要修改一整个文件夹，就有点不那么方便了。</p>
<p>有一个方案是：将远程服务器的目录，映射到本地，然后就可以像编辑本地文件一样进行操作了。</p>
<h1 id="">解决方法</h1>
<p>要映射远程文件夹，需要两个工具：</p>
<ul>
<li>
<ol>
<li>MacFUSE</li>
</ol>
</li>
<li>
<ol start="2">
<li>sshfs</li>
</ol>
</li>
</ul>
<p>这两个文件都可以从osxfuse网站上下载： <a href="https://osxfuse.github.io/">https://osxfuse.github.io/</a></p>
<p><img src="/content/images/2021/02/MacFuse-sshfs-mount-remote-folder-01.png" alt="MacFuse-sshfs-mount-remote-folder-01"></p>
<h2 id="macfuse">安装 MacFUSE</h2>
<p><img src="/content/images/2021/02/MacFuse-sshfs-mount-remote-folder-02.png" alt="MacFuse-sshfs-mount-remote-folder-02"></p>
<p><img src="/content/images/2021/02/MacFuse-sshfs-mount-remote-folder-03.png" alt="MacFuse-sshfs-mount-remote-folder-03"></p>
<p>安装完后，可以在系统设置里找到MacFUSE<br>
<img src="/content/images/2021/02/MacFuse-sshfs-mount-remote-folder-04.png" alt="MacFuse-sshfs-mount-remote-folder-04"></p>
<p>检查一下是否是最新版本<br>
<img src="/content/images/2021/02/MacFuse-sshfs-mount-remote-folder-05.png" alt="MacFuse-sshfs-mount-remote-folder-05"></p>
<p>重启系统</p>
<h2 id="sshfs">安装sshfs</h2>
<p><img src="/content/images/2021/02/MacFuse-sshfs-mount-remote-folder-08.png" alt="MacFuse-sshfs-mount-remote-folder-08"></p>
<h2 id="sshfs">使用sshfs映射远程文件夹</h2>
<p>命令：</p>
<ul>
<li>1). 映射文件夹</li>
</ul>
<pre><code>sshfs &lt;用户名&gt;@&lt;服务器&gt;:&lt;服务器上的绝对路径&gt; &lt;本地目标文件夹&gt; -ovolname=&lt;映射后的文件夹名称&gt;
</code></pre>
<p>如果没有提供-ovolname参数，则会使用系统参数<br>
<img src="/content/images/2021/02/MacFuse-sshfs-mount-remote-folder-06.png" alt="MacFuse-sshfs-mount-remote-folder-06"></p>
<p>建议提供-ovolname参数，这样在finder中，名字会更友好一些：<br>
<img src="/content/images/2021/02/MacFuse-sshfs-mount-remote-folder-07.png" alt="MacFuse-sshfs-mount-remote-folder-07"></p>
<ul>
<li>2). 取消映射</li>
</ul>
<pre><code>umount &lt;本地文件夹&gt;
</code></pre>
<h2 id="">其他</h2>
<p>由于新版本Mac系统对于权限控制比较严格，所以MacFUSE和sshfs都需要一些高级权限才可以使用。</p>
<!--kg-card-end: markdown-->