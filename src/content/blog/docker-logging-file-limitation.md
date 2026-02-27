---
title: "#docker 设置日志文件限制防止磁盘被占满"
description: "默认设置下，Docker对日志是没有限制的，很容易将磁盘空间全部占满。"
pubDate: 2021-03-02T09:21:53.000Z
author: "阿斌"
tags: ["docker", "开发笔记"]
tagSlugs: ["docker", "dev"]
draft: false
type: post
slug: "docker-logging-file-limitation"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>使用docker时，如果不设置日志文件的大小，所有的docker容器输出的日志都会保存下来，直到占满所有的磁盘空间。</p>
<p>这是因为，默认的日志设置为json-file，为了与旧版本docker兼容，这个设置没有添加日志限制。</p>
<p>来自官方的提示：</p>
<blockquote>
<p><a href="https://docs.docker.com/config/containers/logging/configure/">https://docs.docker.com/config/containers/logging/configure/</a></p>
</blockquote>
<p><img src="/content/images/2021/03/docker-file-limitation-01.png" alt="docker-file-limitation-01"></p>
<h2 id="">解决方法</h2>
<p>有两种</p>
<h3 id="1">1. 修改全局日志选项</h3>
<ul>
<li>1). 打开docker的daemon.json文件</li>
</ul>
<pre><code>sudo vi /etc/docker/daemon.json
</code></pre>
<ul>
<li>2). 添加日志限制<br>
可以使用默认有日志限制的local日志</li>
</ul>
<pre><code>{
...
  &quot;log-driver&quot;: &quot;local&quot;
}
</code></pre>
<p>关于local日志的默认值</p>
<blockquote>
<p><a href="https://docs.docker.com/config/containers/logging/local/">https://docs.docker.com/config/containers/logging/local/</a></p>
</blockquote>
<ul>
<li>max-size=20m</li>
<li>max-file=5</li>
<li>compress=false</li>
</ul>
<p>或者<br>
为默认的json-file日志选项添加限制</p>
<blockquote>
<p><a href="https://docs.docker.com/config/containers/logging/json-file/">https://docs.docker.com/config/containers/logging/json-file/</a></p>
</blockquote>
<pre><code>{
    ...
  &quot;log-driver&quot;: &quot;json-file&quot;,
  &quot;log-opts&quot;: {
    &quot;max-size&quot;: &quot;10m&quot;,
    &quot;max-file&quot;: &quot;3&quot;
  }
}
</code></pre>
<ul>
<li>3). 重启docker</li>
</ul>
<pre><code>sudo systemctl restart docker
</code></pre>
<ul>
<li>4). 重新创建容器<br>
docker重启后，所有新容器都会使用新的日志选项，但是已经创建容器则会继续使用旧的选项。<br>
所以，如果旧的容器还在运行，需要重新创建。</li>
</ul>
<h3 id="2">2. 为每个容器单独设置日志选项</h3>
<p>举例</p>
<pre><code>docker run -it --log-opt mode=non-blocking --log-opt max-buffer-size=4m alpine ping 127.0.0.1
</code></pre>
<h2 id="">其他</h2>
<p>更多的日志选项，可以参考官方文档。</p>
<blockquote>
<p><a href="https://docs.docker.com/config/containers/logging/configure/">https://docs.docker.com/config/containers/logging/configure/</a></p>
</blockquote>
<p><img src="/content/images/2021/03/docker-file-limitation-02.png" alt="docker-file-limitation-02"></p>
<!--kg-card-end: markdown-->