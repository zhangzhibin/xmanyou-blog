---
title: "#Nginx 如何配置单文件路由"
description: "想要使用一些第三方服务，比如Facebook或者谷歌广告，往往需要进行验证一个特殊文件，只需要配置一条Nginx的location规则就可以了。"
pubDate: 2021-11-30T09:47:16.000Z
author: "阿斌"
tags: ["Nginx", "反向代理", "开发笔记"]
draft: false
type: post
slug: "nginx-set-location-for-single-file"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>想要使用一些第三方服务，比如Facebook或者谷歌广告，往往需要进行域名验证。而域名验证的一种方法是在域名所在网站的根目录下提供一个文件。例如:</p>
<pre><code>http://mydomain.com/site-verification.txt
</code></pre>
<p>如果使用Nginx作为反向代理，要怎么进行配置呢？</p>
<h1 id="">解决方法</h1>
<p>基本方法就是为这些单文件配置location路由规则。</p>
<p><strong>注意</strong><br>
要注意Nginx的location匹配规则，需要让这条规则被优先匹配。</p>
<p>最简单的就是不使用正则表达式，采用精准匹配。</p>
<p>有两种配置方法:</p>
<h2 id="root">使用root</h2>
<p>示例</p>
<pre><code>location =/site-verification.txt {
    root &lt;site-verification文件所在目录&gt;;
}
</code></pre>
<h2 id="alias">使用alias</h2>
<p>示例</p>
<pre><code>location =/site-verification.txt {
    alias &lt;site-verification文件的绝对路径&gt;;
}
</code></pre>
<!--kg-card-end: markdown-->