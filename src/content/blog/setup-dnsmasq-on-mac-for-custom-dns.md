---
title: "使用dnsmasq搭建dns服务器解决内网域名测试问题"
description: "有时候需要在内网环境里进行域名相关的测试，而hosts文件使用起来不方便，这时候就可以用dnsmasq了。"
pubDate: 2021-09-14T04:00:17.000Z
author: "阿斌"
tags: ["开发笔记", "网络相关", "mac", "dnsmasq"]
tagSlugs: ["dev", "wang-luo-xiang-guan", "mac", "dnsmasq"]
draft: false
type: post
slug: "setup-dnsmasq-on-mac-for-custom-dns"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>有时候需要在内网环境里进行域名相关的测试。</p>
<p>如果是简单域名，可以通过修改/etc/hosts文件来实现，比如</p>
<pre><code>127.0.0.1 test.xmanyou.com
</code></pre>
<p>但是如果是通配符域名呢？hosts文件是不支持下边这边配置来解析通配符的：</p>
<pre><code>127.0.0.1 *.apps.xmanyou.com
</code></pre>
<h1 id="">解决方法</h1>
<p>解决方法，就是搭建一个自己的dns服务器。dnsmasq就是这样一个dns服务器。</p>
<p>下边详细介绍一下在MacOS环境下，利用dnsmasq搭建内网域名测试环境的方法。</p>
<h1 id="dnsmasq">关于 dnsmasq</h1>
<blockquote>
<p><a href="https://thekelleys.org.uk/dnsmasq/doc.html">https://thekelleys.org.uk/dnsmasq/doc.html</a></p>
</blockquote>
<p>Dnsmasq provides network infrastructure for small networks: DNS, DHCP, router advertisement and network boot.<br>
Dnsmasq是一个开源的轻量级DNS转发和DHCP、TFTP服务器，使用C语言编写。Dnsmasq针对家庭局域网等小型局域网设计，资源占用低，易于配置。</p>
<h1 id="dnsmasq">安装 dnsmasq</h1>
<pre><code>brew install dnsmasq
</code></pre>
<p><img src="/content/images/2021/09/setup-dnsmasq-on-mac-for-custom-dns-01.png" alt="setup-dnsmasq-on-mac-for-custom-dns-01"></p>
<h1 id="dnsmasq">使用 dnsmasq</h1>
<h2 id="">一些命令</h2>
<ul>
<li>启动/重启<br>
<strong>注意1</strong> 需要用sudo启动</li>
</ul>
<pre><code>sudo brew services restart dnsmasq
</code></pre>
<ul>
<li>停止</li>
</ul>
<pre><code>sudo brew services stop dnsmasq
</code></pre>
<h2 id="dnsmasq">配置 dnsmasq</h2>
<p>dnsmasq的配置文件</p>
<pre><code>/usr/local/etc/dnsmasq.conf
</code></pre>
<p><strong>注意2</strong> 修改配置后，需要重启服务来生效</p>
<h3 id="">参数</h3>
<ul>
<li>strict-order</li>
<li>listen-address <ip1>,<ip2></li>
</ul>
<p><strong>示例</strong></p>
<pre><code># 严格按照/etc/resolv.conf文件指定的dsn解析器的顺序进行解析
strict-order
# 服务监听地址，设置为127.0.0.1仅限本机使用
listen-address=127.0.0.1
</code></pre>
<h3 id="dns">添加dns解析记录</h3>
<pre><code># 不使用通配符
address=/test.xmanyou.com/127.0.0.1
# 使用通配符
address=/.apps.xmanyou.com/127.0.0.1
</code></pre>
<h2 id="dns">指定dns服务器</h2>
<p><img src="/content/images/2021/09/setup-dnsmasq-on-mac-for-custom-dns-02.png" alt="setup-dnsmasq-on-mac-for-custom-dns-02"></p>
<h2 id="">测试</h2>
<pre><code>dig test.xmanyou.com
</code></pre>
<p><img src="/content/images/2021/09/setup-dnsmasq-on-mac-for-custom-dns-03.png" alt="setup-dnsmasq-on-mac-for-custom-dns-03"></p>
<pre><code>dig  123.apps.xmanyou.com
</code></pre>
<p><img src="/content/images/2021/09/setup-dnsmasq-on-mac-for-custom-dns-04.png" alt="setup-dnsmasq-on-mac-for-custom-dns-04"></p>
<h2 id="usrlocaletcdnsmasqconf">/usr/local/etc/dnsmasq.conf 配置文件完整示例</h2>
<pre><code># 严格按照/etc/resolv.conf文件指定的dsn解析器的顺序进行解析
strict-order
# 服务监听地址，设置为127.0.0.1仅限本机使用
listen-address=127.0.0.1
# 不使用通配符
address=/test.xmanyou.com/127.0.0.1
# 使用通配符解析 *.apps.xmanyou.com
address=/.apps.xmanyou.com/127.0.0.1
</code></pre>
<p>好了，现在可以在内网进行域名测试了，测试完毕后再部署到生产环境就很省心了。</p>
<h1 id="">参考</h1>
<ul>
<li><a href="http://xintq.net/2017/05/16/mac-dnsmasq/">http://xintq.net/2017/05/16/mac-dnsmasq/</a></li>
</ul>
<!--kg-card-end: markdown-->