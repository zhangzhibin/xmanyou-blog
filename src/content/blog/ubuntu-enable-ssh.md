---
title: "#ubuntu 开启ssh服务"
description: "为ubuntu 安装、查看、启动 ssh 服务"
pubDate: 2021-04-10T03:43:45.000Z
author: "阿斌"
tags: ["linux", "ssh"]
tagSlugs: ["linux", "ssh"]
draft: false
type: post
slug: "ubuntu-enable-ssh"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>新装的Ubuntu 有时候并没有自动安装ssh服务。</p>
<p>尝试用ssh连接时，会报错：</p>
<pre><code>ssh: connect to host 192.168.1.xx port 22: Connection refused
</code></pre>
<p>这时候，需要手动安装。</p>
<h2 id="">安装</h2>
<pre><code>sudo apt update
sudo apt install openssh-server
</code></pre>
<h3 id="">开启</h3>
<p>安装完后默认启动ssh服务，如果没有的话，可以手动开启。</p>
<pre><code>sudo systemctl enable --now ssh
sudo systemctl start ssh
</code></pre>
<h2 id="">查看状态</h2>
<pre><code>sudo systemctl status ssh
</code></pre>
<h2 id="">参考</h2>
<ul>
<li><a href="https://linuxconfig.org/enable-ssh-on-ubuntu-20-04-focal-fossa-linux">https://linuxconfig.org/enable-ssh-on-ubuntu-20-04-focal-fossa-linux</a></li>
<li><a href="https://linuxize.com/post/how-to-enable-ssh-on-ubuntu-18-04/">https://linuxize.com/post/how-to-enable-ssh-on-ubuntu-18-04/</a></li>
</ul>
<!--kg-card-end: markdown-->