---
title: "使用软件一键自动为Windows 10配置DoH功能"
description: "不想自己修改注册表？好吧，试试用这个开源软件Simple DNSCrypt开启DoH吧"
pubDate: 2021-11-26T16:32:38.000Z
author: "阿斌"
tags: ["DoH", "杂七杂八"]
tagSlugs: ["doh", "za-qi-za-ba"]
draft: false
type: post
slug: "enable-dns-over-https-on-windows-with-simple-dnscrypt"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>上一篇介绍了什么是DoH(DNS Over Https)，以及如何开启windows 10自带的DoH功能。</p>
<blockquote>
<p><a href="https://xmanyou.com/how-to-enable-dns-over-https-on-windows/">https://xmanyou.com/how-to-enable-dns-over-https-on-windows/</a></p>
</blockquote>
<p>先复习一下：</p>
<ul>
<li>什么是DoH?<br>
DoH 全称是 DNS over HTTPS 基于HTTPS的DNS查询服务。</li>
<li>什么是DNS？<br>
DNS：Domain Name System<br>
域名解析服务，用于将域名与IP地址相互映射，方便访问互联网。</li>
<li>什么是HTTPS？<br>
HTTPS：Hyper Text Transfer Protocol over SecureSocket Layer<br>
简单说就是，对于传输数据加密的超文本传输协议（HTTP）。</li>
<li>为什么要用DNS over HTTPS？<br>
DoH通过加密DNS请求，保证了域名的正常解析。</li>
</ul>
<p>手动修改注册表开启DoH还是比较麻烦的，那么有没有什么简便的方法呢？<br>
答案是有的。</p>
<p>本篇介绍一个非常简单好用的开源小软件：Simple DNSCrypt</p>
<h1 id="windows10doh">如何使用软件自动为Windows10配置DoH功能</h1>
<p>详细步骤：</p>
<h2 id="1simplednscrypt">1. 下载Simple DNSCrypt</h2>
<p>下载地址：<a href="https://simplednscrypt.org/">https://simplednscrypt.org/</a></p>
<p><img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-13.jpg" alt="enable-doh-dns-over-https-on-windows-13"></p>
<h2 id="2simplednscrypt">2. 安装Simple DNSCrypt</h2>
<p>如果你是从官网下载的，那么一路Next就可以了。</p>
<p><img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-14.png" alt="enable-doh-dns-over-https-on-windows-14"></p>
<p><img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-15.png" alt="enable-doh-dns-over-https-on-windows-15"></p>
<p>看到这个界面就表示安装完成了。<br>
<img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-16.png" alt="enable-doh-dns-over-https-on-windows-16"></p>
<h2 id="3simplednscrypt">3. 启动 Simple DNSCrypt</h2>
<p>安装完毕后，点Finish会自动启动Simple DNSCrypt，或者自己从桌面或者开始菜单里启动 Simple DNSCrypt。</p>
<p>如果缺少必要的软件，会自动安装，并检查版本。</p>
<p><img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-17.jpg" alt="enable-doh-dns-over-https-on-windows-17"></p>
<p>然后就进入应用的主界面。</p>
<h2 id="4simplednscrypt">4. 配置Simple DNSCrypt</h2>
<h3 id="">切换语言</h3>
<p>如果不熟悉英文，可以点界面的右上角English按钮，从列表中选择Chinese Simp.改为简体中文。<br>
<img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-18.png" alt="enable-doh-dns-over-https-on-windows-18"></p>
<h3 id="dnscrypt">开启DNSCrypt服务</h3>
<p><img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-19.png" alt="enable-doh-dns-over-https-on-windows-19"></p>
<h3 id="doh">开启DoH功能</h3>
<p>勾选要开启DoH功能的网卡</p>
<p><img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-20.png" alt="enable-doh-dns-over-https-on-windows-20"></p>
<p>如果不知道是哪个，就全部选上。</p>
<p>然后，稍等一会，Simple DNSCrypt会自动查询可用的DNS服务器，等列表刷新完毕，就配置完成了。</p>
<h2 id="5">5. 关闭自动更新</h2>
<p>软件在启动的时候会自动检查版本，如果你不希望自动更新，可以从设置中关掉。<br>
<img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-21.png" alt="enable-doh-dns-over-https-on-windows-21"></p>
<p>以上。</p>
<p>是不是很方便呢？</p>
<h1 id="">参考</h1>
<ul>
<li><a href="https://dnsprivacy.org/dns_privacy_clients/#desktop">https://dnsprivacy.org/dns_privacy_clients/#desktop</a></li>
</ul>
<!--kg-card-end: markdown-->