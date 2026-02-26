---
title: "#Ubuntu 更改ssh默认连接端口"
description: "修改sshd_config来指定新的ssh端口"
pubDate: 2021-03-08T06:46:48.000Z
author: "阿斌"
tags: ["Ubuntu", "开发笔记"]
tagSlugs: ["ubuntu", "dev"]
draft: false
type: post
slug: "ubuntu-change-ssh-port"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>ssh默认的连接端口是22</p>
<p>但是，为了安全起见，一般会改成其他端口，具体步骤如下</p>
<ul>
<li>
<p>0). 开启云服务器的对应端口<br>
如果是阿里云之类的云服务器，需要先从云服务器后台打开对应的端口。</p>
</li>
<li>
<p>1). 修改/etc/ssh/sshd_config<br>
查看当前ssh的端口</p>
</li>
</ul>
<pre><code>grep -i port /etc/ssh/sshd_config
</code></pre>
<p>如果看到</p>
<pre><code>#Port 22
#GatewayPorts no
</code></pre>
<p>表示当前端口是22</p>
<p>使用sudo修改#Port这行，将22改成想要的端口，比如6666</p>
<pre><code>sudo vi /etc/ssh/sshd_config
...
Port 6666
...
</code></pre>
<ul>
<li>2). 重启sshd服务</li>
</ul>
<pre><code>sudo systemctl restart sshd
</code></pre>
<p>查看是否生效</p>
<pre><code>sudo netstat -tulpn | grep ssh
tcp        0      0 0.0.0.0:6666           0.0.0.0:*               LISTEN      18138/sshd
</code></pre>
<ul>
<li>3). 重新连接</li>
</ul>
<pre><code>ssh &lt;server-ip&gt; -p &lt;新端口&gt;
</code></pre>
<h1 id="">其他副作用</h1>
<p>客户端连接时，如果发现以下错误：</p>
<pre><code>@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
</code></pre>
<p><img src="/images/2021/03/ssh-known-host-key-changed.png" alt="ssh-known-host-key-changed"></p>
<p>表示客户端之前已经连接过，需要修改 .ssh/known_hosts</p>
<p>删掉之前的host记录，然后重新连接即可。</p>
<!--kg-card-end: markdown-->