---
title: "#gitlab 开启docker registry镜像库功能"
description: "添加registry_external_url参数即可开启"
pubDate: 2021-03-09T06:03:35.000Z
author: "阿斌"
tags: ["gitlab", "docker", "开发笔记"]
draft: false
type: post
slug: "gitlab-enable-docker-registry"
---

<!--kg-card-begin: markdown--><p>gitlab是自带docker registry模块的，但是默认是关闭的。</p>
<p>没开启之前，在项目的web管理界面上，看到是这样子。<br>
<img src="/images/2021/03/gitlab-enable-docker-registry-01.png" alt="gitlab-enable-docker-registry-01"></p>
<p>开启方法</p>
<ul>
<li>1). 修改gitlab.rb</li>
</ul>
<pre><code>registry_external_url 'http://127.0.0.1:4567'
</code></pre>
<ul>
<li>2). 如果是用docker-compose运行的gitlab，可以添加GITLAB_OMNIBUS_CONFIG环境变量</li>
</ul>
<pre><code>    environment:
      GITLAB_OMNIBUS_CONFIG: |
        registry_external_url 'http://127.0.0.1:4567'
</code></pre>
<p>修改后，重启gitlab。</p>
<p>成功开启的话，可以在项目的管理界面上找到：<strong>容器镜像库</strong></p>
<p><img src="/images/2021/03/gitlab-enable-docker-registry-02.png" alt="gitlab-enable-docker-registry-02"></p>
<!--kg-card-end: markdown-->