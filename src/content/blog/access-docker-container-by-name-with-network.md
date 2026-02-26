---
title: "#docker 如何从容器A直接访问容器B"
description: "使用network可以将多个容器连接到一起，并且相互间可以通过容器名直接访问。"
pubDate: 2021-08-17T08:22:13.000Z
author: "阿斌"
tags: ["docker", "开发笔记"]
tagSlugs: ["docker", "dev"]
draft: false
type: post
slug: "access-docker-container-by-name-with-network"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>测试环境中，我们经常不使用docker-compose，而是直接使用docker run来快速启动一个容器。</p>
<p>当需求启动多个容器，并且相互间需要互相访问时，这种方法就不太方便了。</p>
<p>有没有什么方法呢，可以让两个docker容器可以相互访问，而且不需要使用ip，直接使用容器名呢？</p>
<h2 id="">解决方法</h2>
<p>那就是使用network。</p>
<p>处于同一个network下的容器，可以直接使用容器名相互访问。</p>
<p>步骤</p>
<ul>
<li>1). 创建network</li>
</ul>
<pre><code>docker network create &lt;网络名&gt;
</code></pre>
<ul>
<li>2). 启动容器并加入对应的network</li>
</ul>
<pre><code>docker run --net &lt;网络名&gt; --name &lt;容器名&gt; &lt;镜像名&gt;
</code></pre>
<p>这样就可以了。</p>
<h2 id="dockercomposeservice">不同docker compose中的service如何连接？</h2>
<p>同样是network</p>
<p>docker-compose v3.5以后，可以很方便地为network命名，然后在不同compose中使用相同的network，可以将不同文件中的service连接到一起。</p>
<p>用法</p>
<pre><code># 定义
networks: 
  share-network:
    name: &quot;share-network01&quot;

# 在service中指定
services:
  service1:
    image: &lt;image&gt;
    networks: 
      - share-network
</code></pre>
<h2 id="">其他</h2>
<p>更多docker network命令，可以参考</p>
<blockquote>
<p><a href="https://docs.docker.com/engine/reference/commandline/network/">https://docs.docker.com/engine/reference/commandline/network/</a></p>
</blockquote>
<p><strong>查询已经存在的network</strong></p>
<pre><code>docker network ls
</code></pre>
<!--kg-card-end: markdown-->