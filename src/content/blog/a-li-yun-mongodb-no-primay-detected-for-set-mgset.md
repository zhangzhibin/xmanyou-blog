---
title: "阿里云MongoDB 连接错误：No primary detected for set mgset-xxxx"
description: "记一次手滑引发的惨案"
pubDate: 2021-02-07T02:00:40.000Z
author: "阿斌"
tags: ["MongoDB", "阿里云", "开发笔记"]
tagSlugs: ["mongodb", "aliyun", "dev"]
draft: false
type: post
slug: "a-li-yun-mongodb-no-primay-detected-for-set-mgset"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>为了减少运维开支，简化运维工作，最近在使用阿里云的MongoDB云服务器。</p>
<p>相比于亚马逊AWS，在阿里云上部署MongoDB非常简单，因为阿里云提供了开箱即用的MongoDB服务。</p>
<p>在购买阿里云MongoDB服务时，只需要关注以下几个指标：</p>
<ul>
<li>1). 区域，尽量离需要服务的用户位置近一些。虽然DB不作为前端直接提供服务，还可以直接通过内网网络进行连接，但是，与其他服务尽量在同一个地域，能够更好地保证内网的稳定性。</li>
<li>2). 性能，可以选择cpu核数和内存容量</li>
<li>3). 集群方式，可以选择
<ul>
<li>a. 副本集</li>
<li>b. 分片集群</li>
</ul>
</li>
<li>4). MongoDB 版本</li>
</ul>
<p>这些配置除了影响数据库的性能以外，还会影响最终产生的费用，需要根据项目的实际情况综合考虑。</p>
<p>按照开发团队的需求，我们选购了相应性能配置、足够容量、3节点的副本集，这样在项目初期就有足够的稳定性和容错能力。</p>
<p>但是，在交付给开发团队使用的时候，遇到一个奇怪的错误，无论是代码还是MongoDB的命令行工具mongo都报了类似的错误：</p>
<pre><code>No primary detected for set mgset-xxxxxxxxx
</code></pre>
<p>详细日志是这样子：</p>
<pre><code>...
Successfully connected to &lt;节点1&gt;:3717 (1 connections now open &lt;节点1&gt;:3717 with a 5 second timeout)
2021-02-03T18:45:24.232+0800 I NETWORK  [thread1] Detected bad connection created at 1612349124231592 microSec, clearing pool for &lt;节点1&gt;:3717 of 0 connections
2021-02-03T18:45:24.232+0800 I NETWORK  [thread1] Dropping all pooled connections to &lt;节点1&gt;:3717(with timeout of 5 seconds)
2021-02-03T18:45:24.232+0800 I NETWORK  [thread1] Ending connection to host &lt;节点1&gt;:3717(with timeout of 5 seconds) due to bad connection status; 0 connections to that host remain open
2021-02-03T18:45:24.233+0800 I NETWORK  [thread1] Successfully connected to &lt;节点2&gt;:3717 (1 connections now open to &lt;节点2&gt;:3717 with a 5 second timeout)
2021-02-03T18:45:24.234+0800 I NETWORK  [thread1] Detected bad connection created at 1612349124233198 microSec, clearing pool for &lt;节点2&gt;:3717 of 0 connections
2021-02-03T18:45:24.234+0800 I NETWORK  [thread1] Dropping all pooled connections to &lt;节点2&gt;:3717(with timeout of 5 seconds)
2021-02-03T18:45:24.234+0800 I NETWORK  [thread1] Ending connection to host &lt;节点2&gt;:3717(with timeout of 5 seconds) due to bad connection status; 0 connections to that host remain open
2021-02-03T18:45:24.234+0800 W NETWORK  [thread1] No primary detected for set mgset-xxxxxxxxxx
2021-02-03T18:45:24.234+0800 E QUERY    [thread1] Error: connect failed to replica set mgset-xxxxxxxxx/&lt;节点1&gt;:3717,&lt;节点2&gt;:3717 :
connect@src/mongo/shell/mongo.js:240:13
@(connect):1:6
exception: connect failed
</code></pre>
<h1 id="">解决过程</h1>
<ol>
<li>确认用户名，没有问题</li>
<li>确认用户权限，没有问题</li>
<li>确认root用户，有同样的问题</li>
<li>通过阿里云的云端数据管理工具（DMS）测试连接MongoDB数据库，一切正常</li>
<li>通过MongoDB查看MongoDB的副本集状态，一切正常</li>
</ol>
<pre><code>运行 rs.status()
</code></pre>
<ol start="6">
<li>在阿里云MongoDB管理后台手动进行切换，能正常切换主从节点</li>
<li>使用与MongoDB数据库相同版本的3.4客户端连接，问题依旧</li>
</ol>
<p>这就奇怪了，会是什么问题呢？</p>
<p>最后，无意中发现阿里云控制台上显示购买的MongoDB是4.2版本！<br>
而研发团队用的是3.x版本MongoDB！</p>
<p>会不会是服务端和客户端版本不一致导致的呢？</p>
<h1 id="">解决方法</h1>
<p>重新购买了4.2版本MongoDB，再次连接，一切正常！</p>
<p>所以，原因就是：</p>
<p><strong>手滑买错了服务器版本</strong></p>
<!--kg-card-end: markdown-->