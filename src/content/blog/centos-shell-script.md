---
title: "Centos 常用管理命令"
description: "ssh登录、用户管理、组管理、sudo设置等等。"
pubDate: 2021-02-03T01:33:57.000Z
author: "阿斌"
tags: ["linux", "开发笔记", "centos"]
tagSlugs: ["linux", "dev", "centos"]
draft: false
type: post
slug: "centos-shell-script"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="sshid">复制ssh id</h2>
<pre><code>
ssh-copy-id &lt;username&gt;@&lt;server ip&gt;

</code></pre>
<h2 id="">创建用户</h2>
<ul>
<li>添加用户</li>
</ul>
<pre><code>
adduser &lt;username&gt;

</code></pre>
<ul>
<li>设置密码</li>
</ul>
<pre><code>
passwd &lt;username&gt;

</code></pre>
<h2 id="">用户组管理</h2>
<ul>
<li>查看组</li>
</ul>
<pre><code>
groups

groups &lt;username&gt;

</code></pre>
<ul>
<li>添加用户到组</li>
</ul>
<pre><code>
usermod –aG wheel &lt;username&gt;

</code></pre>
<ul>
<li>移除组</li>
</ul>
<pre><code>
gpasswd -d &lt;username&gt; &lt;groupname&gt;

</code></pre>
<h2 id="sudo">添加sudo权限</h2>
<ul>
<li>启用sudo用户组</li>
</ul>
<p>Centos 默认的sudo用户组是wheel，而不是像ubuntu那样是sudo，如果没有启用，则需要用以下命令来修改配置。</p>
<pre><code>
visudo

</code></pre>
<p>修改wheel组</p>
<pre><code>
### Allows people in group wheel to run all commands

%wheel  ALL=(ALL)       ALL

</code></pre>
<ul>
<li>添加用户到sudo用户组 wheel</li>
</ul>
<pre><code>
usermod -aG wheel catslifeu

</code></pre>
<!--kg-card-end: markdown-->