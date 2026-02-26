---
title: "Nexus Docker容器安装后不停重启：cannot create directory '../sonatype-work/nexus3/log': Permission denied"
description: "其实官方文档中已经给出了建议"
pubDate: 2021-12-16T16:05:52.000Z
author: "阿斌"
tags: ["Nexus", "docker", "开发笔记"]
tagSlugs: ["nexus", "docker", "dev"]
draft: false
type: post
slug: "nexus-docker-start-failed-with-permission-denied"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>按照Nexus官方文档创建Nexus docker容器作为私有docker镜像，结果在启动以后一直在不停重启。</p>
<p>用<code>docker logs</code>命令查看时发现错误：</p>
<pre><code>cannot create directory '../sonatype-work/nexus3/log': Permission denied
</code></pre>
<h1 id="">解决方法</h1>
<p>这是因为Nexus docker镜像使用的用户id是200，需要有映射到容器中/nexus-data目录的本地的权限。</p>
<p><img src="/images/2021/12/setup-nexus-with-docker-got-permission-error.png" alt="setup-nexus-with-docker-got-permission-error"></p>
<p>最简单的方式就是将这个目录的所有权修改为200。</p>
<pre><code>sudo chown -R 200 &lt;本地nexus-data目录&gt;
</code></pre>
<p>例如本地目录是 /data/nexus-data，则</p>
<pre><code>sudo chown -R 200 /data/nexus-data
</code></pre>
<h2 id="">参考文献</h2>
<p>其实官方文档 <a href="https://hub.docker.com/r/sonatype/nexus3/">https://hub.docker.com/r/sonatype/nexus3/</a> 很详细介绍了持久化数据的两种做法：</p>
<ul>
<li>1). 使用docker创建volume</li>
</ul>
<pre><code>$ docker volume create --name nexus-data
$ docker run -d -p 8081:8081 --name nexus -v nexus-data:/nexus-data sonatype/nexus3
</code></pre>
<ul>
<li>2). 手动挂载volume，这时需要设置权限</li>
</ul>
<pre><code>$ mkdir /some/dir/nexus-data &amp;&amp; chown -R 200 /some/dir/nexus-data
$ docker run -d -p 8081:8081 --name nexus -v /some/dir/nexus-data:/nexus-data sonatype/nexus3
</code></pre>
<p><img src="/images/2021/12/setup-nexus-with-docker-got-permission-error-02.png" alt="setup-nexus-with-docker-got-permission-error-02"></p>
<!--kg-card-end: markdown-->