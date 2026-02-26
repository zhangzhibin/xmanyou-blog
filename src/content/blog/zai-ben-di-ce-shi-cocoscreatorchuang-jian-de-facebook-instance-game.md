---
title: "#Facebook Instant Game# 在本地测试CocosCreator创建的Facebook Instant Game"
description: "如何在本地测试facebook instant game"
pubDate: 2018-12-17T12:59:57.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "cocos creator", "facebook instant game"]
draft: false
type: post
slug: "zai-ben-di-ce-shi-cocoscreatorchuang-jian-de-facebook-instance-game"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>测试过程中，最不愿意看到的页面就是这个了：<br>
<img src="/images/2018/12/Snip20181217_8.png" alt="Snip20181217_8"></p>
<h4 id="1">1.构建</h4>
<p>用CocosCreator构建Facebook Instant Game<br>
build的时候，<strong>发布平台</strong> 选择Facebook Instant Game</p>
<p><img src="/images/2018/12/Snip20181217_3.png" alt="Snip20181217_3"></p>
<h4 id="2">2.官方测试指南</h4>
<blockquote>
<p><a href="https://docs.cocos.com/creator/manual/zh/publish/publish-fb-instant-games.html">https://docs.cocos.com/creator/manual/zh/publish/publish-fb-instant-games.html</a></p>
</blockquote>
<p>2.1 安装 node.js</p>
<p>2.2 安装 http-server</p>
<pre><code>&gt; $ npm install -g http-server
</code></pre>
<p>2.3 用openssl生成 key和perm</p>
<pre><code>&gt; $ cd &lt;构建好的fb工程目录&gt;
&gt; $ openssl genrsa 2048 &gt; key.pem
&gt; $ openssl req -x509 -days 1000 -new -key key.pem -out cert.pem
</code></pre>
<p><img src="/images/2018/12/Snip20181217_5.png" alt="Snip20181217_5"></p>
<p>2.4 启动 http-server</p>
<pre><code>http-server &lt;facebook instant game 目录&gt; -c-1 -a 127.0.0.1 --ssl
</code></pre>
<p><img src="/images/2018/12/Snip20181217_6.png" alt="Snip20181217_6"></p>
<h4 id="3">3.在浏览器中打开客户端</h4>
<p>注意，facebook instant game 加入了facebook的sdk 和 fb的启动方法，所以，直接在浏览器里打开</p>
<pre><code>https://127.0.0.1:8080  &lt;=== 不可用
</code></pre>
<p>是不行的。</p>
<p>需要加一个facebook的壳，通过facebook来跳转：</p>
<pre><code>https://www.facebook.com/embed/instantgames/YOUR_GAME_ID/player?game_url=https://localhost:8080
</code></pre>
<p>需要特别注意的是，<strong>跳转的游戏地址(game_url)的host必须是localhost</strong>，用127.0.0.1都不行。</p>
<p>看到这个图，就表示成功了：<br>
<img src="/images/2018/12/Snip20181217_7.png" alt="Snip20181217_7"></p>
<h4 id="4">4. 忽略以下提示</h4>
<p>如果在浏览器调试工具里看见以下提示，可以忽略。</p>
<p><img src="/images/2018/12/Snipaste_2018-12-18_09-29-05.png" alt="Snipaste_2018-12-18_09-29-05"></p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->