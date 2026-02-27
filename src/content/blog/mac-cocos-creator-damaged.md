---
title: "#Mac# #Cocos Creator# CocosCreator已损坏，打不开。您应该把它移到废纸篓吗？"
description: "苹果提示CocosCreator已损坏，打不开，真的应该把它移到废纸篓吗？"
pubDate: 2019-03-18T02:44:06.000Z
author: "阿斌"
tags: ["开发笔记", "mac", "cocos creator"]
tagSlugs: ["dev", "mac", "cocos-creator"]
draft: false
type: post
slug: "mac-cocos-creator-damaged"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>今天在Mac上安装新版本CocosCreator，居然报了这么个错误：</p>
<pre><code>CocosCreator已损坏，打不开。您应该把它移到废纸篓。
</code></pre>
<p>如图：<br>
<img src="/content/images/2019/03/Snip20190318_2.png" alt="Snip20190318_2"></p>
<p>开始还以为是文件坏了，但是重新下载了几次都不行。<br>
甚至重装旧版本，也是一样的错误。</p>
<p>于是谷歌了一下，原来是Mac防火墙的锅:</p>
<blockquote>
<p><a href="https://apple.stackexchange.com/questions/262355/xxx-cant-be-opened-you-should-move-it-to-trash-for-flash-projector-applicat">https://apple.stackexchange.com/questions/262355/xxx-cant-be-opened-you-should-move-it-to-trash-for-flash-projector-applicat</a></p>
</blockquote>
<p><img src="/content/images/2019/03/Snip20190318_1.png" alt="Snip20190318_1"></p>
<h3 id="">解决方法</h3>
<ol>
<li>对特定App解禁（推荐）</li>
</ol>
<pre><code>sudo xattr -rd com.apple.quarantine /Applications/CocosCreator.app
</code></pre>
<blockquote>
<p>注意：本方法每次重装新版本时都需要再次解锁。</p>
</blockquote>
<ol start="2">
<li>对所有App解禁（不推荐）</li>
</ol>
<pre><code>sudo spctl --master-disable
</code></pre>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->