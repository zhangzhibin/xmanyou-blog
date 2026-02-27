---
title: "从Prometheus居然不能填充mock数据说起"
description: "浓眉大眼的Prometheus居然不支持写入测试数据，你敢信？"
pubDate: 2022-06-18T15:39:15.000Z
author: "阿斌"
tags: ["Prometheus", "influxdb", "开发笔记"]
tagSlugs: ["prometheus", "influxdb", "dev"]
draft: false
type: post
slug: "how-to-import-mock-data-into-prometheus"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>大家好，想必大家都听过Prometheus，也就是普罗米修斯。今天的主角就是它!</p>
<p>注意，是这个：<br>
<img src="/content/images/2022/06/prometheus-import-mock-metric-data-01.png" alt="prometheus-import-mock-metric-data-01"><br>
不是这个：<br>
<img src="/content/images/2022/06/prometheus-import-mock-metric-data-02.png" alt="prometheus-import-mock-metric-data-02"></p>
<h2 id="">起</h2>
<p>最近，团队里的小伙伴在做方案调研的过程中，提了个奇怪且大胆的要求：<strong>用Prometheus做个测试，要先跑两天数据</strong>。<br>
<img src="/content/images/2022/06/prometheus-import-mock-metric-data-03.png" alt="prometheus-import-mock-metric-data-03"></p>
<p>啥？!<br>
浓眉大眼的Prometheus居然不能填充Mock数据？<br>
github上4万多颗星是瞎给的吗？<br>
<img src="/content/images/2022/06/prometheus-import-mock-metric-data-04.png" alt="prometheus-import-mock-metric-data-04"></p>
<h2 id="">承</h2>
<p>于是乎，不信邪的我，又是看文档，又是搜谷歌，又是翻StackOverFlow，哈，终于被我找到一个方法：<br>
<img src="/content/images/2022/06/prometheus-import-mock-metric-data-05.png" alt="prometheus-import-mock-metric-data-05"><br>
小伙伴二话不说直接开测，然后：<br>
<img src="/content/images/2022/06/prometheus-import-mock-metric-data-06.png" alt="prometheus-import-mock-metric-data-06"></p>
<h2 id="">转</h2>
<p>于是乎，不信邪的我，又是看文档，又是搜谷歌，又是翻StackOverFlow，硬着头皮啃了好一会英文，然后：<br>
叮！你的英语阅读能力又提升了！<br>
<img src="/content/images/2022/06/prometheus-import-mock-metric-data-07.png" alt="prometheus-import-mock-metric-data-07"><br>
然后，我看到了让人绝望的一段文字：<br>
<img src="/content/images/2022/06/prometheus-import-mock-metric-data-08.png" alt="prometheus-import-mock-metric-data-08"></p>
<blockquote>
<p>来源：<br>
<a href="https://groups.google.com/g/prometheus-developers/c/Z5KwE6KbwN0?pli=1">https://groups.google.com/g/prometheus-developers/c/Z5KwE6KbwN0?pli=1</a></p>
</blockquote>
<p>简单说，这段话有两层意思：</p>
<ul>
<li>1). <strong>Prometheus是个指标(metric)系统，它定时去抓取目标系统的实时状态(指标)，而不关心这些数据的发生时间。</strong></li>
<li>2). <strong>Prometheus不适合用来记录在特定时间发生的事件数据，处理这些数据是Elasticsearch或者InfluxDB更擅长的事。</strong></li>
</ul>
<p>好吧，我们想做的事情，不适合用Prometheus。<br>
似乎可以结案了?</p>
<h2 id="">折</h2>
<p>但是，这都2202年了，即使不是出于测试需要，实际生产环境中，肯定有人想要导入历史数据的吧，难道Prometheus也不支持导入历史数据吗？<br>
于是乎，不信邪的我，又是看文档，又是搜谷歌，又是翻StackOverFlow……<br>
终于！<br>
我学会了一个新的词：<strong>backfill</strong><br>
直译过来就是：<strong>回填</strong>。<br>
<img src="/content/images/2022/06/prometheus-import-mock-metric-data-09.png" alt="prometheus-import-mock-metric-data-09"><br>
什么是回填？<br>
土木工程上，回填就是把之前挖的坑填回去。<br>
软件工程上，就是<s>修bug</s>导入历史数据。</p>
<p>早在2020年的某天，我最爱的Grafana的某个大佬在某次讨论会上，讨论过一个话题：如何向Prometheus批量回填数据<br>
<img src="/content/images/2022/06/prometheus-import-mock-metric-data-10.png" alt="prometheus-import-mock-metric-data-10"><br>
并<s>水</s>发表了一篇博客：《提高Prometheus回填历史数据的效率，我们是这么做的》<br>
<img src="/content/images/2022/06/prometheus-import-mock-metric-data-11.png" alt="prometheus-import-mock-metric-data-11"><br>
还顺手还提了个PR:<br>
<img src="/content/images/2022/06/prometheus-import-mock-metric-data-12.png" alt="prometheus-import-mock-metric-data-12"></p>
<blockquote>
<p>来源：<a href="https://grafana.com/blog/2020/09/02/how-were-improving-backfill-methods-to-get-older-data-into-prometheus/">https://grafana.com/blog/2020/09/02/how-were-improving-backfill-methods-to-get-older-data-into-prometheus/</a></p>
</blockquote>
<p>于是乎，这下差不多可以结案了：<br>
<strong>Prometheus虽然不支持为指标设置时间戳，但是，通过promtool这个命令行工具，可以将历史数据以直接写入数据库，或者说回填。</strong><br>
<img src="/content/images/2022/06/prometheus-import-mock-metric-data-13.png" alt="prometheus-import-mock-metric-data-13"></p>
<h2 id="">结</h2>
<p>简单总结一下，</p>
<ul>
<li>1). <strong>Prometheus是一个建立在时序数据库(tsdb)上的指标监控系统，而不是个通用的时序数据库，跟InfluxDB从根本上来说，根本不是一回事。</strong></li>
<li>2). Prometheus是个指标(metric)系统，它定时去抓取目标系统的实时状态(指标)，而不关心这些数据的实际发生时间。</li>
<li>3). Prometheus不适合用来记录在特定时间发生的事件数据，处理这些数据是Elasticsearch或者InfluxDB更擅长的事。</li>
<li>4). Prometheus虽然不支持为指标设置时间戳，但是，通过promtool这个命令行工具，可以将历史数据以Prometheus的数据格式直接写入，或者说回填。</li>
</ul>
<p>以上，就是一个耿直IT男如何浪费时间在一件看似可能实现、实际上不可能实现、可是又不是不能实现、只是没啥实际用的事情上，并且为此水了一篇博客的经过。</p>
<p><img src="/content/images/2022/06/prometheus-import-mock-metric-data-14.png" alt="prometheus-import-mock-metric-data-14"></p>
<!--kg-card-end: markdown-->