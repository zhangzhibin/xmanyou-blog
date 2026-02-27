---
title: "No signing certificate \"iOS Distribution\" found"
description: "开发ios应用至少都会遇到一次这样的错误"
pubDate: 2021-08-27T06:31:22.000Z
author: "阿斌"
tags: ["ios", "开发笔记"]
tagSlugs: ["ios", "dev"]
draft: false
type: post
slug: "no-signing-certificate-ios-distribution-found"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>iOS项目打包的时候需要两套文件：</p>
<ul>
<li>开发者账号的签名证书 signing certificate (一套签名：包含证书.cert和私钥.p12两个文件)</li>
<li>应用的签名文件 provision (一般文件后缀.mobileprovision)</li>
</ul>
<p>一个常见的错误就是</p>
<pre><code>No signing certificate &quot;iOS Distribution&quot; found
</code></pre>
<p>或者</p>
<pre><code>No signing certificate &quot;iOS Development&quot; found
</code></pre>
<p><img src="/content/images/2021/08/no-signing-certificate-iOS-distribution-found-01.png" alt="no-signing-certificate-iOS-distribution-found-01"></p>
<h2 id="">解决方法</h2>
<p>这种情况，就需要检查两套文件是否都齐全。</p>
<h3 id="">检查开发者证书</h3>
<p>打开钥匙链 keychain，检查相关的开发证书是否安装，并且左边有个展开按钮，表示已经安装了私钥。</p>
<p>如果看到证书没有展开按钮，则表示私钥没有安装，在XCode中点击“Manage Certificates”按钮，会提示 “Missing Private Key”</p>
<p><img src="/content/images/2021/08/no-signing-certificate-iOS-distribution-found-missing-private-key.png" alt="no-signing-certificate-iOS-distribution-found-missing-private-key"></p>
<p>需要从申请证书的原始电脑上重新导出私钥.p12文件。</p>
<p><img src="/content/images/2021/08/app-developer-certification.png" alt="app-developer-certification"><br>
(<em>图片来自https://www.jianshu.com/p/b486ebe6e36a</em>)</p>
<h3 id="">检查描述文件</h3>
<p>检查描述文件是否正确，主要是用以生成该描述文件的证书是否有效。</p>
<h3 id="xcode">重启XCode</h3>
<p>重新安装证书后，需要完全重启XCode，因为XCode不会自动更新证书情况。</p>
<p>一切正常的话，应该是这样子：<br>
<img src="/content/images/2021/08/no-signing-certificate-iOS-distribution-found-03.png" alt="no-signing-certificate-iOS-distribution-found-03"></p>
<h3 id="">参考</h3>
<ul>
<li><a href="https://www.jianshu.com/p/55706a64d5b2">https://www.jianshu.com/p/55706a64d5b2</a></li>
<li><a href="https://www.jianshu.com/p/af6acf3cd484">https://www.jianshu.com/p/af6acf3cd484</a></li>
<li><a href="https://stackoverflow.com/questions/45050902/no-signing-certificate-ios-distribution-found">https://stackoverflow.com/questions/45050902/no-signing-certificate-ios-distribution-found</a></li>
</ul>
<!--kg-card-end: markdown-->