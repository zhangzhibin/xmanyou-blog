---
title: "#GooglePlay 谷歌商店下载的应用登录Facebook报错：invalid key hash"
description: "Google Play商店自动签名引发的问题"
pubDate: 2021-05-10T06:53:45.000Z
author: "阿斌"
tags: ["google play", "android", "开发笔记"]
tagSlugs: ["google-play", "android", "dev"]
draft: false
type: post
slug: "facebook-login-failed-with-invalid-key-hash-for-app-downloaded-from-google-play"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>最近在接入Facebook登录SDK，开发环境下测试正常，发布到谷歌商店后，下载测试时，遇到了奇怪的问题的错误：</p>
<pre><code>Invalid key hash. The key hash xxxxxxxx does not match any stored key hashes. Configure your app key hashes at https://developers.facebook.com/apps/xxxxx
</code></pre>
<p><img src="/images/2021/05/facebook-login-invalid-key-hash-01.png" alt="facebook-login-invalid-key-hash-01"></p>
<p>明明已经按照Facebook的SDK接入流程进行了接入和测试，并且也添加了发布证书的key hash，为什么又冒出来一个新的未知的key hash呢？</p>
<h1 id="">解决方法</h1>
<p>原来，打出来的应用包(不管是aab还是apk)上传到Google Play后台后，会被重新签名，而这个签名证书的hash值没有注册到Facebook后台。</p>
<p><img src="/images/2021/05/facebook-login-invalid-key-hash-02.png" alt="facebook-login-invalid-key-hash-02"></p>
<p>获取该证书的hash值的方法：</p>
<ul>
<li>1). 下载证书</li>
<li>2). 执行以下命令，获取hash值</li>
</ul>
<pre><code>openssl dgst -sha1 -binary &lt;GooglePlay的发布证书&gt;.der | openssl base64
</code></pre>
<ul>
<li>3). 到Facebook后台注册</li>
</ul>
<!--kg-card-end: markdown-->