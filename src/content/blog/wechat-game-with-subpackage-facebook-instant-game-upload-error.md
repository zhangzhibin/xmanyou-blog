---
title: "微信小游戏上传到Facebook小游戏后台报错了"
description: "微信和Facebook神仙打架？"
pubDate: 2021-02-25T10:56:55.000Z
author: "影子工作室"
tags: ["facebook instant game", "h5 小游戏开发", "开发笔记", "微信小游戏"]
draft: false
type: post
slug: "wechat-game-with-subpackage-facebook-instant-game-upload-error"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>最近遇到一个很奇葩的问题，游戏传到Facebook小游戏后台后，几秒钟后立即进入了<strong>错误</strong>状态，但是没有任何错误提示。</p>
<p>而如果用测试游戏包上传，则一切正常：</p>
<p><img src="/images/2021/02/Facebook-instant-game-upload-error.png" alt="Facebook-instant-game-upload-error"></p>
<h1 id="">解决方法</h1>
<p>经过层层排查，具体方法就是</p>
<ol>
<li>删除掉无关文件，找到一个最小可用包</li>
<li>然后把删掉的文件逐步添加进去</li>
</ol>
<p><img src="/images/2021/02/Facebook-instant-game-upload-error02.png" alt="Facebook-instant-game-upload-error02"></p>
<p>最后发现，问题出现在同一个文件：game.js<br>
而这个文件的特点是，字节为0</p>
<p>删掉所有0字节文件以后，重新上传就OK了。</p>
<p><strong>其他</strong><br>
查找0字节文件的方法：</p>
<pre><code>find . -type f -size 0 -exec ls -l {} +
</code></pre>
<p><img src="/images/2021/02/Facebook-instant-game-upload-error03.png" alt="Facebook-instant-game-upload-error03"></p>
<h1 id="">寻根究底</h1>
<p>刚好的是，2个不同游戏都出现了这个问题，而且出问题的文件都是game.js，我就好奇的问了一下这个文件的产生原因。</p>
<p>原来是<strong>微信小游戏分包</strong>用的。</p>
<!--kg-card-end: markdown-->