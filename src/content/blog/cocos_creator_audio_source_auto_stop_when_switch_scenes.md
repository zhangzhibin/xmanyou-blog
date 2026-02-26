---
title: "#Cocos Creator# 为什么音乐音效在场景切换的时候自动停止了？"
description: "为什么背景音乐在场景切换时会自动停止播放？要怎么解决？"
pubDate: 2019-07-03T07:49:27.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "h5 小游戏开发"]
draft: false
type: post
slug: "cocos_creator_audio_source_auto_stop_when_switch_scenes"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>一般来说，每个场景都会有自己的背景音乐，所以，之前我一直没有注意到有什么问题。</p>
<p>直到有一天，我想让游戏从头到尾一直循环播放同一首背景音乐，结果，咦，背景音乐怎么自动停了？</p>
<h2 id="">原因</h2>
<p>暂时还没有找到Cocos Creator对此的相关说法。</p>
<h2 id="">解决方法</h2>
<p>Cocos Creator提供了两种方式来播放音乐音效：</p>
<ol>
<li><strong>Audio Source组件</strong></li>
</ol>
<p>使用Audio Source组件，可以直接在场景编辑器里对音乐的播放进行设置，这是很常用的一种方式。</p>
<p>但是，正是这种方式，导致场景切换时，音乐自动停止播放。</p>
<p>而且，这种中断不是因为Node被删除导致的，而是Cocos Creator内部的机制导致的。</p>
<ol start="2">
<li><strong>cc.audioEngine</strong></li>
</ol>
<p>Cocos Creator还提供了另外一种非组件的方式来播放音乐，就是cc.audioEngine模块。</p>
<p>与Audio Source不同，cc.audioEngine只能通过脚本来调用，好处是可以获得更多的控制权，也就是不会被自动停止播放。</p>
<p>具体代码：</p>
<pre><code>    let audioId = cc.audioEngine.playMusic(this.clip, true);
    cc.audioEngine.setVolume(audioId, 0.5);
</code></pre>
<h2 id="">参考</h2>
<p><a href="http://docs.cocos.com/creator/manual/zh/audio/audio.html">http://docs.cocos.com/creator/manual/zh/audio/audio.html</a></p>
<!--kg-card-end: markdown-->