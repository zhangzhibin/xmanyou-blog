---
title: "#Linux 如何检查远程端口是否打开"
description: "nc -zv <address> <port> 可以用来测试端口是否正常"
pubDate: 2021-05-07T02:16:25.000Z
author: "阿斌"
tags: ["linux", "Ubuntu", "开发笔记", "杂七杂八"]
draft: false
type: post
slug: "linux-check-remote-port-with-nc"
---

<!--kg-card-begin: markdown--><p>使用nc命令可以检查远程端口是否打开，用来判断连接是否可用。</p>
<pre><code>nc -zv &lt;address&gt; &lt;port&gt;
</code></pre>
<ul>
<li>-z 使用0输入/输出模式，只在扫描通信端口时使用。</li>
<li>-v 显示指令执行过程。</li>
</ul>
<p>示例</p>
<pre><code>nc -zv 192.168.1.12 22
Connection to 192.168.1.12 22 port [tcp/ssh] succeeded!
</code></pre>
<p>参考</p>
<blockquote>
<p><a href="https://www.runoob.com/linux/linux-comm-nc.html">https://www.runoob.com/linux/linux-comm-nc.html</a></p>
</blockquote>
<!--kg-card-end: markdown-->