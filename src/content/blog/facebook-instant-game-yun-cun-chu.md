---
title: "#Facebook Instant Game# 云存储"
description: "Facebook Instant Game 为每个玩家提供了一个云空间，每个游戏都可以保存不超过1M的数据。"
pubDate: 2018-12-13T14:37:54.000Z
author: "阿斌"
tags: ["开发笔记", "h5 小游戏开发", "facebook instant game"]
tagSlugs: ["dev", "h5", "facebook-instant-game"]
draft: false
type: post
slug: "facebook-instant-game-yun-cun-chu"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>Facebook Instant Game 为每个玩家提供了一个云空间，每个游戏都可以保存不超过1M的数据。</p>
<blockquote>
<p>参考<br>
<a href="https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.2">https://developers.facebook.com/docs/games/instant-games/sdk/fbinstant6.2</a></p>
</blockquote>
<h2 id="">数据格式</h2>
<p>键值对</p>
<h2 id="">访问接口</h2>
<ol>
<li>读数据<br>
FBInstant.player.getDataAsync(keys:string[])</li>
</ol>
<p><strong>参数</strong><br>
要读的数据的keys</p>
<p><strong>示例</strong></p>
<pre><code>FBInstant.player
  .getDataAsync(['achievements', 'currentLife'])
  .then(function(data) {
     console.log('data is loaded');
     var achievements = data['achievements'];
     var currentLife = data['currentLife'];
  });
</code></pre>
<ol start="2">
<li>写数据<br>
FBInstant.player.setDataAsync(data:{})</li>
</ol>
<p><strong>参数</strong><br>
一组键值对</p>
<p><strong>示例</strong></p>
<pre><code>FBInstant.player
  .setDataAsync({
    achievements: ['medal1', 'medal2', 'medal3'],
    currentLife: 300,
  })
  .then(function() {
    console.log('data is set');
  });
</code></pre>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->