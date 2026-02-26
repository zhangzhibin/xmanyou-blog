---
title: "#Facebook Instant Game FB小游戏无法使用谷歌分析gtag的解决方法"
description: "gtag('config', 'ID', { cookie_flags: 'max-age=7200;secure;samesite=none' });\n"
pubDate: 2021-06-21T08:48:07.000Z
author: "阿斌"
tags: ["facebook instant game", "h5 小游戏开发", "google"]
draft: false
type: post
slug: "facebook-instant-game-can-not-send-event-using-gtag"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>Facebook将于2021年6月30日正式关闭Facebook分析服务，为了更好地进行数据分析，Facebook小游戏需要接入一个第三方分析服务。</p>
<p>在测试谷歌分析服务的时候发现，Facebook小游戏似乎无法发送数据。</p>
<p>这是怎么回事呢？</p>
<h1 id="">解决方法</h1>
<p>研究发现，这是Facebook的一个限制</p>
<blockquote>
<p><a href="https://github.com/firebase/firebase-js-sdk/issues/4046">https://github.com/firebase/firebase-js-sdk/issues/4046</a></p>
</blockquote>
<pre><code>I think I found a solution. The problem is with this year Chrome cross-site cookie handling.
Due to hosting app in an facebook iframe - cookie_flags: 'max-age=7200;secure;samesite=none' is required for request to pass thru. I'm able to override gtag initialization and push this setting after firebase initial initialization but I wonder if there is a way of passing it in firebase intial config instead of recreating gtag -
gtag('config', 'ID', { cookie_flags: 'max-age=7200;secure;samesite=none' });
</code></pre>
<p>在初始化gtag时，需要加入以下参数才可以</p>
<pre><code>gtag('config', 'ID', { cookie_flags: 'max-age=7200;secure;samesite=none' });
</code></pre>
<p>这个临时解决方法带来的问题是，一旦Facebook改动了cookie的参数需求，有可能又失效了。</p>
<!--kg-card-end: markdown-->