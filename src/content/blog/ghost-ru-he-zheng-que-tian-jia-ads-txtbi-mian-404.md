---
title: "#Ghost 如何正确添加ads.txt避免404错误?"
description: "本文介绍如何不配置网关，直接使用ghost建站工具解析静态文件。"
pubDate: 2023-06-08T18:43:26.000Z
author: "阿斌"
tags: ["ghost"]
draft: false
type: post
slug: "ghost-ru-he-zheng-que-tian-jia-ads-txtbi-mian-404"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>ghost是一款开源的建站工具，与历史悠久的wordpress不同，它使用Node.js开发。wordpress经过了这么多年，已经建立了非常完善的生态系统，这是ghost做为后起之秀，相比之下最为薄弱的环节。</p>
<p>ads.txt是网站进行广告变现很重要的工具，它可以用来证明你对网站的所有权，只有添加到该文件中的广告账号才可以在该网站进行变现。</p>
<p>通常ads.txt需要添加到网站的域名根目录，比如<code>https://xmanyou.com/ads.txt</code></p>
<p>那么，问题来了，ghost要如何添加ads.txt呢？</p>
<p>特别的，如果没有正确添加，ghost默认会把<br>
<code>https://xmanyou.com/ads.txt</code><br>
重定向到<br>
<code>https://xmanyou.com/ads.txt/</code><br>
从而出现404错误。</p>
<h2 id="">解决方法</h2>
<h3 id="1nginxadstxt">方法1. 使用nginx等自行解析ads.txt</h3>
<p>如果你使用nginx作为ghost的网关，那么，你可以在nginx里自己添加一条ads.txt的解析。</p>
<p>例如：假设你的ads.txt文件存放在<code>/var/www/html/ads.txt</code>，那么</p>
<pre><code>    location ~ ^/(ads.txt) {
        add_header Content-Type text/plain;
        root /var/www/html;
    }
</code></pre>
<h3 id="2ghostadstxt">方案2. 使用ghost解析ads.txt</h3>
<p>其实，ghost官方也支持静态文件解析，默认的路径是当前主题所在的目录，所以只需要将ads.txt添加到主题包里，然后重新激活就可以了。</p>
<p>具体步骤如下：</p>
<ul>
<li>1). 下载当前所用的主题zip包</li>
<li>2). 解压，并添加ads.txt到解压后的主题目录</li>
<li>3). 重新打包主题zip包</li>
<li>4). 上传添加了ads.txt的主题包</li>
<li>5). 激活该主题</li>
</ul>
<p>这样就完成了。</p>
<p>同样的，利用该方法，还可以让ghost解析别的静态文件，比如app-ads.txt等。</p>
<!--kg-card-end: markdown-->