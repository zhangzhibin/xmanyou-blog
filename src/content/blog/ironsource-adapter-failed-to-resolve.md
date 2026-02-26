---
title: "#IronSource# 接入Admob、Facebook报错：Failed to resolve: com.ironsource.adapters"
description: "按照文档一步步操作也依然失败的原因"
pubDate: 2020-10-15T03:53:59.000Z
author: "阿斌"
tags: ["android", "开发笔记"]
draft: false
type: post
slug: "ironsource-adapter-failed-to-resolve"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>Android 平台接入IronSource广告聚合时，按照文档一步步接入，但是在编译的时候却报错：</p>
<pre><code>CONFIGURE SUCCESSFUL in 0s
ERROR: Failed to resolve: com.ironsource.adapters:admobadapter:4.3.14
Show in Project Structure dialog
Affected Modules: app

ERROR: Failed to resolve: com.ironsource.adapters:facebookadapter:4.3.21
Show in Project Structure dialog
Affected Modules: app
</code></pre>
<p><img src="/images/2020/10/IronSource-adapter-failed.png" alt="IronSource-adapter-failed"></p>
<p>奇怪的是，相同网络条件下，IronSource的另一个依赖库com.ironsource.sdk:mediationsdk却没有报错。</p>
<p>无论怎么设置Http Proxy代理服务器，都无法解决改问题。</p>
<h1 id="">解决方法</h1>
<p>最后发现，需要在app的gradle添加对应的repositories，如下</p>
<pre><code>repositories {
    jcenter()
    google()
    maven {
        url &quot;https://dl.bintray.com/ironsource-mobile/android-sdk&quot;
    }
    maven {
        url 'https://dl.bintray.com/ironsource-mobile/android-adapters'
    }
}
</code></pre>
<p>像这样子：<br>
<img src="/images/2020/10/IronSource-adapter-gradle-repo.png" alt="IronSource-adapter-gradle-repo"></p>
<!--kg-card-end: markdown-->