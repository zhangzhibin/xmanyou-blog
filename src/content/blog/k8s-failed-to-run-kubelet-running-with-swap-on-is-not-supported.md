---
title: "#Kubernetes failed to run Kubelet: running with swap on is not supported, please disable swap"
description: "安装kubernetes默认需要禁用swap"
pubDate: 2021-03-30T03:43:56.000Z
author: "阿斌"
tags: ["Kubernetes", "Ubuntu"]
tagSlugs: ["kubernetes", "ubuntu"]
draft: false
type: post
slug: "k8s-failed-to-run-kubelet-running-with-swap-on-is-not-supported"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>安装完Kubernetes以后，测试了一下kubelet，遇到这个错误：</p>
<pre><code>failed to run Kubelet: running with swap on is not supported, please disable swap
</code></pre>
<h1 id="">解决方法</h1>
<p>最简单的解决方法是: 禁用swap</p>
<p>Ubuntu下，在命令行里执行：</p>
<pre><code>sudo swapoff -a
</code></pre>
<!--kg-card-end: markdown-->