---
title: "#docker 批量绑定和导出端口"
description: "一次导出连续port"
pubDate: 2021-04-16T06:04:57.000Z
author: "阿斌"
tags: ["docker", "开发笔记"]
draft: false
type: post
slug: "docker-export-port-in-range"
---

<!--kg-card-begin: markdown--><h1 id="">用法</h1>
<p>docker-compose.yml的参数是：</p>
<pre><code>ports:
  - &quot;3000&quot;
  - &quot;3000-3005&quot;
  - &quot;8000:8000&quot;
  - &quot;9090-9091:8080-8081&quot;
  - &quot;49100:22&quot;
  - &quot;127.0.0.1:8001:8001&quot;
  - &quot;127.0.0.1:5000-5010:5000-5010&quot;
  - &quot;127.0.0.1::5000
  - &quot;6060:6060/udp&quot;
  - &quot;12400-12500:1240&quot;
</code></pre>
<h1 id="">参考</h1>
<ul>
<li><a href="https://docs.docker.com/compose/compose-file/compose-file-v3/#ports">https://docs.docker.com/compose/compose-file/compose-file-v3/#ports</a></li>
</ul>
<!--kg-card-end: markdown-->