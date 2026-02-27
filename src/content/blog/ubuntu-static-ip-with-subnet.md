---
title: "#ubuntu 安装时subnet怎么填？"
description: "填255.255.255.0为什么不对？"
pubDate: 2021-05-07T01:39:02.000Z
author: "阿斌"
tags: ["Ubuntu", "开发笔记"]
tagSlugs: ["ubuntu", "dev"]
draft: false
type: post
slug: "ubuntu-static-ip-with-subnet"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>参考：<a href="https://askubuntu.com/questions/1034317/static-ip-with-netplan">https://askubuntu.com/questions/1034317/static-ip-with-netplan</a></p>
<p>示例 1.</p>
<pre><code>Subnet:  10.10.10.0/24 (不是子网掩码，所以255.255.255.0/24是不行的)
Address: 10.10.10.20
Gateway: 10.10.10.1
Name Servers: 10.10.10.1
</code></pre>
<p>示例 2.<br>
<img src="/content/images/2021/05/ubuntu-install-static-ip.png" alt="ubuntu-install-static-ip"></p>
<p>更多参考：<br>
<a href="https://opensource.com/article/16/12/cidr-network-notation-configuration-linux">https://opensource.com/article/16/12/cidr-network-notation-configuration-linux</a></p>
<!--kg-card-end: markdown-->