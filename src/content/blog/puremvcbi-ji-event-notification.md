---
title: "#PureMVC笔记# Event，Notification，Command的区别"
description: "在PureMVC中（其实在实际项目里），提到了3个很相似的概念：Event，Notification和Command。\n\n这三者，是实际实现时，完全可以用同一套相似的方法来实现，那么，为什么还要提出三个概念呢？"
pubDate: 2018-11-14T11:20:11.000Z
author: "阿斌"
tags: ["开发笔记", "PureMVC"]
tagSlugs: ["dev", "puremvc"]
draft: false
type: post
slug: "puremvcbi-ji-event-notification"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>在PureMVC中（其实在实际项目里），提到了3个很相似的概念：Event，Notification和Command。</p>
<p>这三者，是实际实现时，完全可以用同一套相似的方法来实现，那么，为什么还要提出三个概念呢？</p>
<p>在一个框架中，我们除了要关心底层的实现，更要关注这些概念的实际用途，简单的说：</p>
<h4 id="event"><em>Event</em> : 有事情发生</h4>
<p>Event用来告诉外部对象，有事情发生了，比如，一个动画播放完毕，一个网络请求结束了。</p>
<h4 id="notification"><em>Notification</em> : 有状态变化</h4>
<p>Notification用来告诉外部对象，有状态/数据发生了变化，比如，玩家的金币增加了，玩家分数变化了。</p>
<h4 id="command"><em>Command</em> : 有事情要做</h4>
<p>Command用来告诉外部对象，需要执行某个动作了，比如玩家点击了开始游戏，需要开始游戏了。</p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->