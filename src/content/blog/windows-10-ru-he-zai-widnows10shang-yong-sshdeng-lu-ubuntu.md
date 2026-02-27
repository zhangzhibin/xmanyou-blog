---
title: "#Windows 10# 如何在Widnows10上用ssh登录Ubuntu"
description: "如何不用每次登录Ubuntu都输入密码"
pubDate: 2019-03-29T01:53:02.000Z
author: "阿斌"
tags: ["开发笔记", "linux", "windows"]
tagSlugs: ["dev", "linux", "windows"]
draft: false
type: post
slug: "windows-10-ru-he-zai-widnows10shang-yong-sshdeng-lu-ubuntu"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><h2 id="">使用用户密码登录</h2>
<ol>
<li>打开Powershell</li>
<li>用ssh &lt;远程主机用户名&gt;@&lt;远程主机ip或者域名&gt;<pre><code>ssh &lt;remote_username&gt;@&lt;remoteserver.ip&gt;
</code></pre>
<img src="/content/images/2019/03/Snipaste_2019-03-29_09-42-44.png" alt="Snipaste_2019-03-29_09-42-44"></li>
</ol>
<h2 id="">不使用用户密码</h2>
<ol>
<li>先创建ssh key<br>
如果你已经装了git的客户端，可以参考
<blockquote>
<p><a href="https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent">https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent</a></p>
</blockquote>
</li>
<li>将ssh key的公钥上传到主机<pre><code>scp &lt;windows上的公钥&gt; &lt;远程主机用户名&gt;@&lt;远程主机ip或者域名&gt;:~/.ssh/id_rsa.win.pub

举例
scp C:\Users\&lt;Windows_User&gt;\.ssh\id_rsa.pub &lt;remote_username&gt;@&lt;remoteserver.ip&gt;:~/.ssh/id_rsa.win.pub
</code></pre>
</li>
<li>用用户密码登录到远程主机<br>
由于Windows上没有ssh-copy-id 不然，可以直接用这个命令来添加，无需登录远程主机进行操作<pre><code>在安装了ssh-copy-id机器上用
ssh-copy-id &lt;remote_username&gt;@&lt;remoteserver.ip&gt;
</code></pre>
</li>
<li>在远程主机上将windows的key添加到authorized_keys文件中<br>
<strong>注意</strong>：如果该文件已经存在，不要直接覆盖<pre><code>cat ~/.ssh/id_rsa.win.pub &gt;&gt; ~/.ssh/authorized_keys
</code></pre>
</li>
<li>测试</li>
</ol>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->