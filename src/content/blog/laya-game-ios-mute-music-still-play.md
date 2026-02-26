---
title: "#Laya 游戏在iOS平台静音后还在继续播放音乐"
description: "一行代码解决Facebook这个常见的审核问题。"
pubDate: 2021-03-06T03:48:11.000Z
author: "阿斌"
tags: ["facebook instant game", "laya", "h5 小游戏开发", "开发笔记"]
draft: false
type: post
slug: "laya-game-ios-mute-music-still-play"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>近期经常有小游戏在提审时，被Facebook打回来。</p>
<p>理由是：iOS上静音后，游戏仍然在播放声音。</p>
<p><img src="/images/2021/03/iPhone-mute-button.png" alt="iPhone-mute-button"></p>
<p>Facebook给的建议是：</p>
<pre><code>响应移动设备上的物理静音开关（我们推荐使用 WebAudio API）
</code></pre>
<p><img src="/images/2021/03/Facebook-instant-game-ios-mute-01.png" alt="Facebook-instant-game-ios-mute-01"></p>
<p>可是，Laya里怎么改用WebAudio呢？</p>
<p>通常我们是直接用Laya.SoundManager.PlayMusic来播放的</p>
<pre><code>Laya.SoundManager.playMusic(&quot;sounds/bgm.mp3&quot;);
</code></pre>
<h1 id="">解决方法</h1>
<p>原来，Laya.SoundManager支持两种播放接口，而默认使用的是Audio标签这种方案：</p>
<pre><code>&lt;audio&gt;&lt;/audio&gt;
</code></pre>
<p><strong>解决方案</strong><br>
不使用Audio标签方案。</p>
<p><strong>具体做法</strong><br>
需要在游戏初始化之后，首次播放音乐之前，添加以下代码：</p>
<pre><code>Laya.SoundManager.useAudioMusic = false;
</code></pre>
<p>搞定。</p>
<!--kg-card-end: markdown-->