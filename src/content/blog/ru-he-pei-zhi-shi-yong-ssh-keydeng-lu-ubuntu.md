---
title: "Mac如何配置使用ssh key登录ubuntu"
description: "首先，你要先有一个密钥。\n然后，执行以下命令将密钥上传到ubuntu服务器上\n\n> ssh-copy-id <ubuntu_user>@<ubuntu_host>\n\n\n其中\n<ubuntu_user> 指要使用这个key登录的远程主机的用户\n<ubuntu_host> 指要登录远程主机的ip或者域名\n\n系统会提示你输入"
pubDate: 2018-03-21T08:48:36.000Z
author: "阿斌"
tags: ["开发笔记", "mac", "linux", "ssh"]
draft: false
type: post
slug: "ru-he-pei-zhi-shi-yong-ssh-keydeng-lu-ubuntu"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p><strong>首先</strong>，你要先有一个密钥。<br>
<strong>然后</strong>，执行以下命令将密钥上传到ubuntu服务器上</p>
<blockquote>
<p>ssh-copy-id &lt;ubuntu_user&gt;@&lt;ubuntu_host&gt;</p>
</blockquote>
<p><strong>其中</strong><br>
&lt;ubuntu_user&gt; 指要使用这个key登录的远程主机的用户<br>
&lt;ubuntu_host&gt; 指要登录远程主机的ip或者域名</p>
<p>系统会提示你输入该用户的登录密码。<br>
完成后，你可以直接用以下命令直接登录了：</p>
<blockquote>
<p>ssh &lt;ubuntu_user&gt;@&lt;ubuntu_host&gt;</p>
</blockquote>
<p><strong>示例</strong></p>
<blockquote>
<p>My-MacBook-Pro:~ xxx$ ssh-copy-id <a href="mailto:xxx@xxxx.com">xxx@xxxx.com</a><br>
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: &quot;/Users/xxxx/.ssh/id_rsa.pub&quot;<br>
The authenticity of host 'xxxx.com (xxx.xxx.xxx.xxx)' can't be established.<br>
ECDSA key fingerprint is SHA256:XZBYWpmhN61XwwCkPx0tEVKwntV7gzGS5hGwTld28cc.<br>
Are you sure you want to continue connecting (yes/no)? yes<br>
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed<br>
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys<br>
<a href="mailto:xxx@xxxx.com">xxx@xxxx.com</a>'s password:</p>
<p>Number of key(s) added:        1</p>
<p>Now try logging into the machine, with:   &quot;ssh 'xxx@xxxx.com'&quot;<br>
and check to make sure that only the key(s) you wanted were added.</p>
</blockquote>
<p><strong>注意</strong>，如果你的系统没有安装 ssh-copy-id，则需要先安装这个命令：</p>
<blockquote>
<p>brew install ssh-copy-id</p>
</blockquote>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->