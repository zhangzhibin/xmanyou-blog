---
title: "#鸿蒙 老项目装不上新设备，报错： INSTALL_PARSE_FAILED_USESDK_ERROR"
description: "当老项目遇上新设备……"
pubDate: 2021-04-17T16:20:37.000Z
author: "阿斌"
tags: ["鸿蒙", "开发笔记"]
tagSlugs: ["hong-meng", "dev"]
draft: false
type: post
slug: "harmony-os-install-parse-failed-usersdk-error"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>网上下载了一个鸿蒙项目，在本地测试的时候，在一台设备上可以安装，而在另一台版本更新的设备上，却总是装不上。</p>
<p>看了一下DevEco运行时的错误，是</p>
<pre><code>$ hdc shell bm install -p /sdcard/f77dae0261d749f2af3674f4d96eeba1/
Failure[INSTALL_PARSE_FAILED_USESDK_ERROR]
$ hdc shell rm -rf /sdcard/f77dae0261d749f2af3674f4d96eeba1
Error while Deploying HAP
</code></pre>
<p><img src="/content/images/2021/04/harmony-os-INSTALL_PARSE_FAILED_USESDK_ERROR-01.png" alt="harmony-os-INSTALL_PARSE_FAILED_USESDK_ERROR-01"></p>
<h1 id="">解决方法</h1>
<p>从错误描述来看，应该是设备的版本和开发工具的sdk版本不一致导致的。</p>
<h2 id="1">1. 终极解决方法</h2>
<p>使用支持手机鸿蒙OS版本的最新的鸿蒙开发工具DevEco。</p>
<h2 id="2">2. 临时解决方法</h2>
<p>有时候，升级DevEco是不可取的，就只能用临时的解决方法：移除config.json中，releaseType字段。</p>
<p>例如：</p>
<pre><code>    &quot;apiVersion&quot;: {
      &quot;compatible&quot;: 3,
      &quot;target&quot;: 4,
      &quot;releaseType&quot;: &quot;Beta1&quot; &lt;--- 找到这一行，删除这一行，以及上一行的最后的逗号。
    }
</code></pre>
<p><img src="/content/images/2021/04/harmony-os-INSTALL_PARSE_FAILED_USESDK_ERROR-02.png" alt="harmony-os-INSTALL_PARSE_FAILED_USESDK_ERROR-02"></p>
<p>再次运行，就可以安装上了。</p>
<h1 id="">参考</h1>
<ul>
<li><a href="https://www.cnblogs.com/qixingchao/p/14609384.html">https://www.cnblogs.com/qixingchao/p/14609384.html</a></li>
</ul>
<!--kg-card-end: markdown-->