---
title: "Google Play 提包错误：您的APK或Android App Bundle会使用需提供隐私权政策的权限"
description: "一个机翻引发的事故"
pubDate: 2021-02-08T10:07:56.000Z
author: "阿斌"
tags: ["android", "google play", "开发笔记"]
tagSlugs: ["android", "google-play", "dev"]
draft: false
type: post
slug: "google-play-permission-requires-privacy-policy"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>最近一个游戏提包到Google Play时，遇到一个错误：</p>
<pre><code>您的APK或Android App Bundle会使用需提供隐私权政策的权限
</code></pre>
<p><img src="/images/2021/02/GooglePlay-APK-AAB-require-privacy-policy-permission.png" alt="GooglePlay-APK-AAB-require-privacy-policy-permission"></p>
<p>点击“了解详情”的话，会跳转到一篇不知所云的文章。</p>
<p><img src="/images/2021/02/GooglePlay-APK-AAB-require-privacy-policy-permission-02.png" alt="GooglePlay-APK-AAB-require-privacy-policy-permission-02"></p>
<h1 id="">解决方法</h1>
<p>这段中文看着非常绕，于是试着翻译成英文，然后google搜索一下：</p>
<p><img src="/images/2021/02/GooglePlay-APK-AAB-require-privacy-policy-permission-03.png" alt="GooglePlay-APK-AAB-require-privacy-policy-permission-03"></p>
<p>英文的错误差不多是这样子：</p>
<pre><code>Apps using these permissions in an APK are required to have a privacy policy set
</code></pre>
<p>大概是说，App里用到了需要提供隐私条款的权限。</p>
<p>所以，解决的方法是：<br>
<strong>在Google Play商店后台，提供一个有效的隐私条款连接。</strong></p>
<!--kg-card-end: markdown-->