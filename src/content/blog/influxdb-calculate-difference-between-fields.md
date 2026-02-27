---
title: "InfluxDB计算两个字段的差值"
description: "有什么办法呢？其实很简单。"
pubDate: 2020-05-19T06:36:49.000Z
author: "阿斌"
tags: ["开发笔记", "influxdb"]
tagSlugs: ["dev", "influxdb"]
draft: false
type: post
slug: "influxdb-calculate-difference-between-fields"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>使用InfluxDB时，有时候，我们需要计算同一个表(也就是influxDB中的measurement)中两个字段的差值(field)。</p>
<p>比如，有个measurement，用于记录玩家在尝试从游戏A跳转到游戏B中的事件。需要注意的是，由于一旦玩家成功从游戏A跳转到游戏B中，那么，在游戏A中，是无法统计这个事件的。</p>
<p>在游戏A中，可以统计到两个事件：</p>
<ol>
<li>玩家尝试跳转 attempt_event</li>
<li>玩家取消跳转 cancel_event</li>
</ol>
<p>那么，成功跳转的事件数就是 success_event = attempt_event - cancel_event</p>
<p>那么，在influxDB中，要怎么查询这样的数据呢？</p>
<h2 id="">解决方法</h2>
<ul>
<li>
<p>步骤1.<br>
将attempt_event和cancel_event作为field，而不是tag插入事件表(events)中。</p>
</li>
<li>
<p>步骤2.<br>
执行以下influxsql语句</p>
</li>
</ul>
<pre><code>select (sum(attempt_event)-sum(cancel_event)) as success_sum from events
</code></pre>
<!--kg-card-end: markdown-->