---
title: "#ubuntu 修改主机名hostname"
description: "用别的ubuntu系统镜像导入创建的虚拟机，会继续沿用之前的主机名hostname。为了不与原系统混在一起，需要修改主机名hostname。"
pubDate: 2021-04-10T04:37:25.000Z
author: "阿斌"
tags: ["linux", "开发笔记"]
tagSlugs: ["linux", "dev"]
draft: false
type: post
slug: "ubuntu-change-hostname"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>用别的ubuntu系统镜像导入创建的虚拟机，会继续沿用之前的主机名hostname。为了不与原系统混在一起，需要修改主机名hostname。</p>
<h1 id="1hostnamectl">1. 使用hostnamectl查看和修改</h1>
<h2 id="11hostname">1.1. 查看 hostname</h2>
<pre><code>hostnamectl
</code></pre>
<p>举例</p>
<pre><code>minigame@minigame-dev:~$ hostnamectl
   Static hostname: minigame-dev
         Icon name: computer-vm
           Chassis: vm
        Machine ID: 9d8b1b5ed4134c55b0809bc4dde92169
           Boot ID: 901501f4ddd04f9595be47375edceb44
    Virtualization: vmware
  Operating System: Ubuntu 20.04.2 LTS
            Kernel: Linux 5.4.0-70-generic
      Architecture: x86-64
</code></pre>
<h2 id="12hostname">1.2. 修改hostname</h2>
<pre><code>sudo hostnamectl set-hostname &lt;新host name&gt;
</code></pre>
<p>举例</p>
<pre><code>sudo hostnamectl set-hostname abin-01
</code></pre>
<h1 id="2">2. 修改本地域名解析</h1>
<h2 id="21etchosts">2.1. 查看 /etc/hosts</h2>
<p>如果查看hosts文件，可以看到127.0.0.1还没有解析到新的hostname</p>
<pre><code>cat /etc/hosts
127.0.0.1 localhost
127.0.1.1 minigame-dev
</code></pre>
<h2 id="22etchosts">2.2. 修改/etc/hosts</h2>
<pre><code>sudo vi /etc/hosts
127.0.0.1 localhost
127.0.1.1 abin-01 &lt;--- 这里填新的hostname
</code></pre>
<h1 id="3">3. 重新登录并验证</h1>
<pre><code>hostnamectl
   Static hostname: abin-01
         Icon name: computer-vm
           Chassis: vm
        Machine ID: 9d8b1b5ed4134c55b0809bc4dde92169
           Boot ID: 901501f4ddd04f9595be47375edceb44
    Virtualization: vmware
  Operating System: Ubuntu 20.04.2 LTS
            Kernel: Linux 5.4.0-70-generic
      Architecture: x86-64
</code></pre>
<h1 id="4">4. 参考</h1>
<ul>
<li><a href="https://linuxize.com/post/how-to-change-hostname-on-ubuntu-18-04/">https://linuxize.com/post/how-to-change-hostname-on-ubuntu-18-04/</a></li>
<li><a href="https://linuxize.com/post/how-to-change-hostname-on-ubuntu-20-04/">https://linuxize.com/post/how-to-change-hostname-on-ubuntu-20-04/</a></li>
</ul>
<!--kg-card-end: markdown-->