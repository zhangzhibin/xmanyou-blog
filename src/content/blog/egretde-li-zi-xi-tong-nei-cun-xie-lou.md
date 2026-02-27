---
title: "Egret的粒子系统可能导致内存泄漏"
description: "最近在用Egret开发h5游戏，发现加入粒子系统以后，产生了大量的内存泄漏。\n\n后来查看源码，发现Egret的粒子系统，从舞台（stage）移除以后，并不会自动清除所有的粒子，需要手动调用clear方法，或者在stop的时候传入true参数。"
pubDate: 2017-11-06T02:14:37.000Z
author: "阿斌"
tags: ["开发笔记", "egret"]
tagSlugs: ["dev", "egret"]
draft: false
type: post
slug: "egretde-li-zi-xi-tong-nei-cun-xie-lou"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>最近在用Egret开发h5游戏，发现有内存泄漏。通过Google的开发者工具检查，发现是粒子系统没有被移除，导致产生了大量的内存泄漏。</p>
<p>再查看源码，发现Egret的粒子系统，从舞台（stage）移除以后，并不会自动清除所有的粒子，需要手动调用clear方法，或者在stop的时候传入true参数。</p>
<p>如下：<br>
<img src="/content/images/2017/11/5688670.png" alt="5688670"></p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->