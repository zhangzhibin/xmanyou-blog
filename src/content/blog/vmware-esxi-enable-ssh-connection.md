---
title: "#VMWare #ESXi 开启ssh访问"
description: "介绍一个远程开启ESXi主机ssh访问功能的方法。"
pubDate: 2021-03-19T06:43:46.000Z
author: "阿斌"
tags: ["vmware", "开发笔记"]
draft: false
type: post
slug: "vmware-esxi-enable-ssh-connection"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>VMWare ESXi 安装完后，默认是不能用ssh访问的。但是，有时候我们会需要通过ssh连接，并调用vmware的工具进行一些格式转换工作。</p>
<p>这时候就需要开启ssh连接了。</p>
<h1 id="">解决方法</h1>
<ul>
<li>1). 通过浏览器打开ESXi虚拟机服务器的管理界面，登录</li>
<li>2). 主机-&gt;管理-&gt;服务，启动TSM-SSH</li>
</ul>
<p><img src="/images/2021/03/vmware-esxi-enable-ssh-connection.png" alt="vmware-esxi-enable-ssh-connection"></p>
<ul>
<li>3). 连接测试</li>
</ul>
<pre><code>ssh &lt;用户名&gt;@&lt;ESXi主机ip&gt;
</code></pre>
<!--kg-card-end: markdown-->