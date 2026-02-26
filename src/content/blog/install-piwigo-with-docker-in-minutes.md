---
title: "用Docker安装Piwigo个人相册系统"
description: "使用Docker一分钟快速安装个人相册Piwigo"
pubDate: 2019-09-10T01:27:11.000Z
author: "阿斌"
tags: ["开发笔记", "docker", "Piwigo"]
tagSlugs: ["dev", "docker", "piwigo"]
draft: false
type: post
slug: "install-piwigo-with-docker-in-minutes"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="github">GitHub 库</h2>
<blockquote>
<p><a href="https://github.com/xmanyou/piwigo-docker">https://github.com/xmanyou/piwigo-docker</a></p>
</blockquote>
<h2 id="">环境需求</h2>
<p>需要安装 docker 和 docker-compose</p>
<blockquote>
<p><a href="https://www.docker.com">https://www.docker.com</a></p>
</blockquote>
<p>关于Docker</p>
<blockquote>
<p><a href="https://yeasy.gitbooks.io/docker_practice/introduction/">https://yeasy.gitbooks.io/docker_practice/introduction/</a></p>
</blockquote>
<p>国内用户如果下载docker镜像太慢，可以配置docker hub的国内镜像。</p>
<blockquote>
<p>参考这篇 <a href="https://yeasy.gitbooks.io/docker_practice/install/mirror.html">https://yeasy.gitbooks.io/docker_practice/install/mirror.html</a></p>
</blockquote>
<h2 id="">安装</h2>
<ul>
<li>下载</li>
</ul>
<pre><code>git clone git@github.com:xmanyou/piwigo-docker.git
</code></pre>
<ul>
<li>通过docker-compose启动</li>
</ul>
<pre><code>docker-compose up -d
</code></pre>
<ul>
<li>通过docker-compose停止</li>
</ul>
<pre><code>docker-compose down
</code></pre>
<h2 id="">镜像内容</h2>
<p>本镜像包括2个服务</p>
<ul>
<li>mysql 5</li>
<li>linuxserver/piwigo (<a href="https://github.com/linuxserver/docker-piwigo">https://github.com/linuxserver/docker-piwigo</a>)</li>
</ul>
<p>配置文件</p>
<pre><code>version: &quot;3&quot;
services:
  piwigo:
    image: linuxserver/piwigo
    network_mode: bridge
    ports:
      - 8899:80
    links:
      - db

  db:
    image: mysql:5
    network_mode: bridge
    environment:
      MYSQL_USER: &quot;piwigo&quot;
      MYSQL_PASSWORD: &quot;piwigo&quot;
      MYSQL_DATABASE: &quot;piwigo&quot;
      MYSQL_RANDOM_ROOT_PASSWORD: &quot;true&quot;
</code></pre>
<h2 id="piwigo">安装Piwigo</h2>
<p>镜像启动后，需要先执行Piwigo的安装，打开页面：<a href="http://localhost:8899">http://localhost:8899</a></p>
<p>数据库配置如下：</p>
<ul>
<li>数据库主机: db 	  (注意，这里要填镜像里的service名，而不是localhost)</li>
<li>数据库用户: piwigo   (mysql db user)</li>
<li>数据库密码: piwigo   (mysql db password)</li>
<li>数据库名:   piwigo   (mysql db name)</li>
</ul>
<p>管理员信息自行配置。</p>
<p>点击底部安装按钮。</p>
<p><img src="/images/2019/09/piwigo_setup.png" alt="piwigo_setup"></p>
<p>一切顺利的话，很快就配置完成了。</p>
<p><img src="/images/2019/09/piwigo_setup_ready.png" alt="piwigo_setup_ready"></p>
<h2 id="piwigo">访问和管理Piwigo</h2>
<p>打开页面：<a href="http://localhost:8899">http://localhost:8899</a></p>
<p>用管理员账号登录，即可进行管理。</p>
<!--kg-card-end: markdown-->