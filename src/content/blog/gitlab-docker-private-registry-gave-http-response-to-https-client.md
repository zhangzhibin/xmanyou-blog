---
title: "#docker 登录私有docker镜像库报错：server gave HTTP response to HTTPS client"
description: "docker服务器没有设置tls的话，需要在客户端添加一个非安全站点列表才行。"
pubDate: 2021-03-10T02:36:50.000Z
author: "阿斌"
tags: ["docker", "开发笔记"]
tagSlugs: ["docker", "dev"]
draft: false
type: post
slug: "gitlab-docker-private-registry-gave-http-response-to-https-client"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>在内网通过gitlab搭建了一个docker镜像库，但是在使用docker登录时，却报了这么个错误：</p>
<pre><code>docker login 192.168.1.12:49264
Username: zhangzhibin
Password:

Error response from daemon: Get https://192.168.1.12:49264/v2/: http: server gave HTTP response to HTTPS client
</code></pre>
<p>从错误描述来看，错误的来源是docker daemon。</p>
<p>错误的原因是，</p>
<ul>
<li>docker客户端默认使用的是https连接</li>
<li>私有镜像库没有配置https的时候，默认返回的是http信息</li>
</ul>
<p>二者不一致。</p>
<h1 id="">解决方法</h1>
<ol>
<li>为镜像库配置https，并使用配置了https的地址去连接docker镜像库</li>
<li>客户端允许http连接<br>
可以根据<strong>冰河团队</strong>提供的解决方法进行修改</li>
</ol>
<blockquote>
<p><a href="https://www.cnblogs.com/binghe001/p/12882214.html">https://www.cnblogs.com/binghe001/p/12882214.html</a></p>
</blockquote>
<p>可以通过在docker daemon.json中配置insecure-registries，来解决https问题。</p>
<p>文件位置：</p>
<ul>
<li>linux环境中，daemon.json位于: /etc/docker/daemon.json</li>
<li>在mac或者windows中，可以通过ui界面来修改配置：<br>
<img src="/content/images/2021/03/docker-registry-insecure-http-01.png" alt="docker-registry-insecure-http-01"></li>
</ul>
<p>改完，重启docker daemon 即可。</p>
<!--kg-card-end: markdown-->