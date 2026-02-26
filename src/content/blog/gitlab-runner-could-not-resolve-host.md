---
title: "#gitlab-runner Could not resolve host"
description: "gitlab-runner使用docker执行自动任务时报错了"
pubDate: 2021-03-11T05:05:35.000Z
author: "阿斌"
tags: ["gitlab", "gitlab-runner", "CI", "开发笔记"]
draft: false
type: post
slug: "gitlab-runner-could-not-resolve-host"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>用docker运行gitlab和gitlab-runner，并且二者运行在同一台机器上。</p>
<p>gitlab-runner正常注册，并使用docker executor。</p>
<p>在gitlab中添加作业以后，发现失败了，作业的执行日志如下：</p>
<pre><code>Running with gitlab-runner 13.7.0 (943fc252)
  on default A8J5JmsQ
Preparing the &quot;docker&quot; executor
00:18
Using Docker executor with image python:3.6 ...
Pulling docker image python:3.6 ...
Using docker image sha256:6b0219e0ed757f23e9140c2efd0529e4a77aca47b1555e4ded26101ffe136d56 for python:3.6 with digest python@sha256:da022140db3b40d07c81815158092ff8ccfd967926b533a7c0b573eeeb5be120 ...
Preparing environment
00:00
Running on runner-a8j5jmsq-project-2-concurrent-0 via 52a38353b8ab...
Getting source from Git repository
00:01
Fetching changes with git depth set to 50...
Reinitialized existing Git repository in /builds/zhangzhibin/hello/.git/
fatal: unable to access 'http://9bc3f7e4d778/zhangzhibin/hello.git/': Could not resolve host: 9bc3f7e4d778
Cleaning up file based variables
00:01
ERROR: Job failed: exit code 1
</code></pre>
<p><img src="/images/2021/03/gitlab-runner-job-error-could-not-resolve-host-01.png" alt="gitlab-runner-job-error-could-not-resolve-host-01"></p>
<h1 id="">解决方法</h1>
<p>从日志中可以发现，错误的地方是在runner试图从gitlab拉取代码时发生的。</p>
<p>其中9bc3f7e4d778是gitlab对应的容器名，也就是gitlab的容器机器名字。</p>
<h2 id="">问题原因</h2>
<p>没有配置的情况下，gitlab默认使用容器名做为外部访问地址：http://&lt;容器名&gt;</p>
<p>runner在执行作业的时候，会另外启动一个docker容器，而这个容器默认与gitlab不在同一个网络中，无法识别gitlab的host。</p>
<h2 id="">方案</h2>
<ul>
<li>1). 将二者添加到同一个network下。<br>
先查看gitlab所在的network</li>
</ul>
<pre><code>docker network ls
</code></pre>
<p>然后，在gitlab-runner的配置文件config.toml添加<strong>network_mode</strong>参数，添加在[runners.docker]下</p>
<pre><code>  [runners.docker]
  ...
    network_mode = &quot;&lt;gitlab 所在的network&gt;&quot;
  ...
</code></pre>
<p>重启gitlab-runner</p>
<ul>
<li>2). 更改git clone的地址<br>
在gitlab-runner的配置文件config.toml添加<strong>clone_url</strong>参数，添加在[[runners]]的全局配置中</li>
</ul>
<pre><code>[[runners]]
...
clone_url = &quot;gitlab的外部访问url&quot;
...
</code></pre>
<h2 id="">其他</h2>
<p>如果遇到修改后，gitlab-runner无法启动，甚至报错：</p>
<pre><code>gitlab-runner    | FATAL: Service run failed                           error=toml: cannot load TOML value of type []interface {} into a Go string
</code></pre>
<p><img src="/images/2021/03/gitlab-runner-load-toml-value-failed.png" alt="gitlab-runner-load-toml-value-failed"></p>
<p>可以尝试将旧的config.toml备份，然后创建一个新的。</p>
<h1 id="">参考</h1>
<ul>
<li><a href="https://docs.gitlab.com/runner/executors/docker.html#networking">https://docs.gitlab.com/runner/executors/docker.html#networking</a></li>
<li><a href="https://docs.gitlab.com/runner/configuration/advanced-configuration.html">https://docs.gitlab.com/runner/configuration/advanced-configuration.html</a></li>
</ul>
<!--kg-card-end: markdown-->