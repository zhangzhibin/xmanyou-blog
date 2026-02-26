---
title: "苹果App Store订阅类商品的测试笔记"
description: "关于订阅类商品的一些笔记"
pubDate: 2019-09-02T05:01:00.000Z
author: "阿斌"
tags: ["开发笔记", "App Store"]
draft: false
type: post
slug: "appstore_subcription_duration_testing"
---

<!--kg-card-begin: markdown--><h2 id="">订阅周期</h2>
<p>为了便于测试，苹果对于测试中的加快自动订阅商品，设置了更短的订阅周期。具体如下：</p>
<pre><code>实际时限 测试时限
1 周     3 分钟
1 个月   5 分钟
2 个月  10 分钟
3 个月  15 分钟
6 个月  30 分钟
1 年   1 小时
</code></pre>
<h2 id="">自动订阅次数</h2>
<p>最多自动订阅6次</p>
<h2 id="">参考</h2>
<p><a href="https://help.apple.com/app-store-connect/#/dev7e89e149d">https://help.apple.com/app-store-connect/#/dev7e89e149d</a></p>
<p><img src="/images/2019/09/AppStore_subcription_duration.png" alt="AppStore_subcription_duration"></p>
<!--kg-card-end: markdown-->