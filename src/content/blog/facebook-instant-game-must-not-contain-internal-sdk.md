---
title: "Facebook Instant Game 小游戏上传时报错：游戏不能包含内部SDK版本"
description: "原因是fb不允许从游戏包中直接加载fb sdk库。"
pubDate: 2021-01-29T03:57:35.000Z
author: "阿斌"
tags: ["facebook instant game", "h5 小游戏开发", "开发笔记"]
tagSlugs: ["facebook-instant-game", "h5", "dev"]
draft: false
type: post
slug: "facebook-instant-game-must-not-contain-internal-sdk"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>在Facebook Instant Game 小游戏后台上传游戏包时，出现这个错误：</p>
<pre><code>Must Not Contain Internal SDK
游戏不能包含内部SDK版本
</code></pre>
<p><img src="/images/2021/01/fbig-upload-error-internal-sdk-.png" alt="fbig-upload-error-internal-sdk-"></p>
<p>英文错误提示：</p>
<pre><code>Must Not Contain Internal SDK

Games must not include an internal SDK version
</code></pre>
<p><img src="/images/2021/01/fbig-upload-error-internal-sdk-2.png" alt="fbig-upload-error-internal-sdk-2"></p>
<h1 id="">解决方法</h1>
<p>导致这个错误的原因是，facebook小游戏的sdk被直接添加到了游戏包里，并从游戏包中加载，而不是从Facebook的cdn加载。</p>
<p>解决步骤：</p>
<ol>
<li>移除从游戏包加载Facebook SDK的代码</li>
</ol>
<pre><code>// 这种是不允许的
// loadLib(&quot;libs/fbinstant.6.3.js&quot;)
</code></pre>
<ol start="2">
<li>移除游戏包中包含的Facebook SDK库(fbinstant.6.3.js)</li>
<li>添加在线加载Facebook SDK的代码，参考：</li>
</ol>
<pre><code>&lt;script src=&quot;https://connect.facebook.net/en_US/fbinstant.6.3.js&quot;&gt;&lt;/script&gt;
</code></pre>
<!--kg-card-end: markdown-->