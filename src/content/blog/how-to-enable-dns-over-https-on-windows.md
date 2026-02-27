---
title: "如何为Windows 10开启DoH功能"
description: "如何开启Windows 10系统自带的DoH功能？"
pubDate: 2021-11-26T16:21:59.000Z
author: "阿斌"
tags: ["杂七杂八", "DoH"]
tagSlugs: ["za-qi-za-ba", "doh"]
draft: false
type: post
slug: "how-to-enable-dns-over-https-on-windows"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="doh">什么是DoH?</h2>
<p>DoH 全称是 DNS over HTTPS 基于HTTPS的DNS查询服务。</p>
<h3 id="dns">什么是DNS？</h3>
<p>DNS：Domain Name System<br>
域名解析服务，用于将域名与IP地址相互映射，方便访问互联网。</p>
<h3 id="https">什么是HTTPS？</h3>
<p>HTTPS：Hyper Text Transfer Protocol over SecureSocket Layer<br>
简单说就是，对于传输数据加密的超文本传输协议（HTTP）。</p>
<h3 id="dnsoverhttps">为什么要用DNS over HTTPS？</h3>
<p>一般在使用DNS服务时，传输的数据是纯文本，很容易被识别，然后被劫持并篡改，导致无法访问。<br>
而使用DoH，传输的数据被加密了，因为无法得知所发的请求是什么，所以无法被篡改。</p>
<p>所以，简单说，DoH通过加密DNS请求，保证了域名的正常解析。</p>
<h2 id="doh">如何配置DoH？</h2>
<p>以Windows 10为例，Windows 10 2004 build 之后，系统已经自带DoH功能，只是默认没有打开，可以手动开启DoH。</p>
<h3 id="windows10doh">手动开启Windows 10的DoH功能的详细步骤</h3>
<h4 id="">第一步，修改注册表</h4>
<p>按下 <code>Windows + R</code> 组合键，调出“运行”窗口，然后输入regedit.exe</p>
<p><img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-01.png" alt="enable-doh-dns-over-https-on-windows-01"></p>
<p>即可打开注册表编辑器。</p>
<p>从左边的树形结构中，找到以下键：</p>
<pre><code>HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Dnscache\Parameters
</code></pre>
<p>然后，创建一个新的DWORD类型键 EnableAutoDoh，值为2<br>
具体步骤：</p>
<ul>
<li>1). 在Parameters右边的空白区域点右键，选择<code>新建-&gt;DWORD</code></li>
</ul>
<p><img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-02.png" alt="enable-doh-dns-over-https-on-windows-02"></p>
<ul>
<li>2). 输入名字：EnableAutoDoh</li>
</ul>
<p><img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-03.png" alt="enable-doh-dns-over-https-on-windows-03"></p>
<ul>
<li>
<p>3). 新创建的键，默认值是0，双击刚刚添加的EnableAutoDoh，修改值为2<br>
<img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-04.png" alt="enable-doh-dns-over-https-on-windows-04"></p>
</li>
<li>
<p>4). 确认修改正确后，就可以关闭注册表了。<br>
<img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-05.png" alt="enable-doh-dns-over-https-on-windows-05"></p>
</li>
</ul>
<h4 id="dns">第二步，配置DNS</h4>
<p>开启了DoH以后，还要配置一个支持DoH的DNS服务器。</p>
<p>具体步骤</p>
<ul>
<li>1). 打开Windows设置<br>
按下Windows键，或者直接点击左下角Windows图标，打开“开始”菜单，然后点击“设置”</li>
</ul>
<p><img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-06.jpg" alt="enable-doh-dns-over-https-on-windows-06"></p>
<ul>
<li>
<p>2). 打开网络与Internet选项<br>
从Windows设置中选中“网络与Internet”。<br>
<img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-07.png" alt="enable-doh-dns-over-https-on-windows-07"></p>
</li>
<li>
<p>3). 点击左侧的<strong>以太网选项</strong>，然后选择右侧相关设置中的<strong>更改适配器选项</strong><br>
<img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-08.jpg" alt="enable-doh-dns-over-https-on-windows-08"></p>
</li>
<li>
<p>4). 打开以太网卡的DNS设置页面<br>
从<strong>网络连接</strong>列表中，选择你的以太网卡<br>
<img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-09.png" alt="enable-doh-dns-over-https-on-windows-09"></p>
</li>
</ul>
<p>双击，打开以太网卡状态<br>
点击<strong>属性</strong>按钮，打开<strong>以太网属性</strong><br>
在<strong>网络</strong>页面的列表中，选择<strong>Internet协议版本4(TCP/IPv4)</strong><br>
双击，打开<strong>Internet协议版本4(TCP/IPv4)属性页</strong>，可以看到DNS服务器设置<br>
<img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-10.png" alt="enable-doh-dns-over-https-on-windows-10"></p>
<ul>
<li>5). 手动设置DNS服务器地址<br>
首选，CloudFlare的1.1.1.1<br>
备选，谷歌的8.8.8.8<br>
<img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-11.png" alt="enable-doh-dns-over-https-on-windows-11"></li>
</ul>
<p>配置好后，点击确定关闭。</p>
<h4 id="3dnsclient">3. 重启DNS Client客户端服务</h4>
<p>由于DNS Client服务无法直接手动重启，所以，直接重启电脑。<br>
<img src="/content/images/2021/11/enable-doh-dns-over-https-on-windows-12.jpg" alt="enable-doh-dns-over-https-on-windows-12"></p>
<p>顺利的话，就完成了。</p>
<h3 id="doh">有没有自动配置DoH的方法呢？</h3>
<p>有的，请看下一篇: 《使用软件一键自动为Windows 10配置DoH功能》</p>
<blockquote>
<p><a href="https://xmanyou.com/enable-dns-over-https-on-windows-with-simple-dnscrypt/">https://xmanyou.com/enable-dns-over-https-on-windows-with-simple-dnscrypt/</a></p>
</blockquote>
<h2 id="">参考文献</h2>
<ul>
<li><a href="http://woshub.com/enable-dns-over-https-windows/">http://woshub.com/enable-dns-over-https-windows/</a></li>
</ul>
<!--kg-card-end: markdown-->