---
title: "快速用谷歌提供的签名生成Facebook登录所需的Hash值"
description: "没有key store也一样能获取apk签名的hash值"
pubDate: 2021-08-13T04:06:35.000Z
author: "阿斌"
tags: ["android", "google play", "开发笔记"]
tagSlugs: ["android", "google-play", "dev"]
draft: false
type: post
slug: "generate-facebook-login-hash-key-from-google-sign-sha1"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>谷歌后台提供了签名的托管服务，用于对上传的发布包进行重新签名。</p>
<p>接入Facebook登录功能时，根据文档，需要提供游戏包签名秘钥的hash串。如果是自己的key store，可以用以下命令来生成:</p>
<pre><code>keytool -exportcert -alias &lt;别名&gt; -keystore &lt;key store文件&gt; | openssl sha1 -binary | openssl base64
</code></pre>
<p>如果没有添加谷歌托管签名服务对应秘钥的hash值，而直接将游戏上线，会导致Facebook登录功能失败：<br>
<img src="/content/images/2021/08/fb-login-invalid-hash-key.png" alt="fb-login-invalid-hash-key"></p>
<h1 id="">解决方法</h1>
<p>由于谷歌的托管服务没有提供key store文件，只提供了sha-1等的二进制表示串，没法用Facebook提供的命令来获取hash值，这可怎么办呢？</p>
<p>Stackoverflow上，有人提供了个快速的方法，详细步骤：</p>
<ul>
<li>1). 打开浏览器的开发者工具</li>
<li>2). 切换到console控制台</li>
<li>3). 输入以下命令</li>
</ul>
<pre><code>btoa('签名的SHA-1值'.split(':').map(hc =&gt; String.fromCharCode(parseInt(hc, 16))).join(''))
</code></pre>
<p>就会输出Facebook所需的hash值了。</p>
<p><img src="/content/images/2021/08/fb-login-invalid-hash-key2.png" alt="fb-login-invalid-hash-key2"></p>
<h2 id="">总结一下</h2>
<ul>
<li>hex map 转换成 base64</li>
</ul>
<pre><code>btoa('a7:77:d9:20:c8:01:dd:fa:2c:3b:db:b2:ef:c5:5a:1d:ae:f7:28:6f'.split(':').map(hc =&gt; String.fromCharCode(parseInt(hc, 16))).join(''))
</code></pre>
<ul>
<li>base64 转换 hex map</li>
</ul>
<pre><code>atob('p3fZIMgB3fosO9uy78VaHa73KG8=').split('').map(c =&gt; c.charCodeAt(0).toString(16)).join(':')
</code></pre>
<h2 id="">参考</h2>
<ul>
<li><a href="https://stackoverflow.com/questions/7506392/how-to-create-android-facebook-key-hash">https://stackoverflow.com/questions/7506392/how-to-create-android-facebook-key-hash</a></li>
</ul>
<!--kg-card-end: markdown-->