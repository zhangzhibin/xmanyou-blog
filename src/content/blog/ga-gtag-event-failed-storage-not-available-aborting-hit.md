---
title: "谷歌分析提交事件时报错：Storage not available. Aborting hit."
description: "相同的谷歌分析代码，在普通页面上正常运行，但是在iFrame的页面中，却发现有些事件无法正常上报。这是为什么呢？"
pubDate: 2022-03-11T15:12:17.000Z
author: "阿斌"
tags: ["h5 小游戏开发", "开发笔记"]
tagSlugs: ["h5", "dev"]
draft: false
type: post
slug: "ga-gtag-event-failed-storage-not-available-aborting-hit"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>相同的谷歌分析代码，在普通页面上正常运行，但是在iFrame的页面中，却发现有些事件无法正常上报。</p>
<p>通过谷歌分析调试工具发现了奇怪的错误：</p>
<pre><code>Cookie write failed.
Storage not available. Aborting hit.
</code></pre>
<p><img src="/content/images/2022/03/ga-gtag-event-failed-storage-not-available-aborting-hit.png" alt="ga-gtag-event-failed-storage-not-available-aborting-hit"></p>
<h2 id="">解决方法</h2>
<p>这是由于Chrome的cookie设置决定的，具体原因可以查看ga文档：</p>
<blockquote>
<p><a href="https://developers.google.com/analytics/devguides/collection/gtagjs/cookies-user-id">https://developers.google.com/analytics/devguides/collection/gtagjs/cookies-user-id</a></p>
</blockquote>
<p>解决方法就是需要在初始化时手动设置一个参数：<br>
<em>cookie_flags</em>: <code>secure;samesite=none</code></p>
<p>完整初始化示例：</p>
<pre><code>gtag('config', gaId, { cookie_flags: 'secure;samesite=none' });
</code></pre>
<p>这个问题与之前在Facebook小游戏平台上使用ga遇到的问题一样：</p>
<blockquote>
<p><a href="https://xmanyou.com/facebook-instant-game-can-not-send-event-using-gtag/">https://xmanyou.com/facebook-instant-game-can-not-send-event-using-gtag/</a></p>
</blockquote>
<!--kg-card-end: markdown-->