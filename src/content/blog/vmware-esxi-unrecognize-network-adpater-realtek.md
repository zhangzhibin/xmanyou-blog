---
title: "#VMWare ESXi 无法识别RealTek网卡怎么办？"
description: "遇到网卡无法识别问题，需要自己制作ESXi镜像来解决。"
pubDate: 2021-03-29T09:27:21.000Z
author: "阿斌"
tags: ["vmware"]
tagSlugs: ["vmware"]
draft: false
type: post
slug: "vmware-esxi-unrecognize-network-adpater-realtek"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>最近在一台闲置的PC上安装VMWare ESXi 6.7。安装过程中，收到一个提示：无法识别网卡，或者找不到驱动。</p>
<p>怎么办呢？</p>
<h2 id="">解决方法</h2>
<p>网上搜了一下，遇到这种问题的解决方法只有一个：<br>
找一个有网卡驱动的ESXi镜像文件。</p>
<p>如果找不到现成的，就自己做一个，具体步骤如下：</p>
<h3 id="1">1. 准备材料</h3>
<p>制作一个包含自定义网卡驱动的ESXi镜像文件，需要以下材料：</p>
<ul>
<li>
<p>0). 带有PowerShell的Windows系统，例如Windows 10</p>
</li>
<li>
<p>1). ESXi系统的离线安装包<br>
这个可以在VMWare网站上下载。需要登录自己的VMWare账号。</p>
</li>
<li>
<p>2). 适用于ESXi系统的网卡驱动<br>
找网卡驱动的一个方法是，先安装Windows10，然后根据显示的网卡信息去搜索驱动。<br>
我的这个网卡驱动的是Net55-r8168：<a href="https://vibsdepot.v-front.de/wiki/index.php/Net55-r8168">https://vibsdepot.v-front.de/wiki/index.php/Net55-r8168</a></p>
</li>
<li>
<p>3). VMWare PowerCLI命令行工具<br>
这个可以在VMWare网站上下载。需要登录自己的VMWare账号。</p>
</li>
<li>
<p>4). ESXi-Customizer-PS-v2.6.0.ps1 自定义镜像的PowerShell脚本</p>
</li>
</ul>
<blockquote>
<p><a href="https://www.v-front.de/p/esxi-customizer-ps.html#download">https://www.v-front.de/p/esxi-customizer-ps.html#download</a></p>
</blockquote>
<h3 id="2esxi">2. 制作ESXi镜像</h3>
<h4 id="21powercli">2.1. 安装PowerCLI</h4>
<p>安装时会提示需要用管理员权限打开PowerShell，执行以下命令来设置权限：</p>
<pre><code>Set-ExecutionPolicy RemoteSigned
</code></pre>
<blockquote>
<p><a href="https://docs.vmware.com/en/vRealize-Automation/7.6/com.vmware.vra.install.upgrade.doc/GUID-C86DCF49-F23B-4B9C-9FD5-95524FB74F01.html">https://docs.vmware.com/en/vRealize-Automation/7.6/com.vmware.vra.install.upgrade.doc/GUID-C86DCF49-F23B-4B9C-9FD5-95524FB74F01.html</a></p>
</blockquote>
<p>提示：设置完毕后，关闭PowerShell，然后继续安装 VMWare PowerCLI。</p>
<h4 id="22">2.2. 制作镜像</h4>
<p>以管理员身份运行PowerShell，<br>
假设<br>
离线包所在的路径：esxi-offline-bundle.zip<br>
网卡驱动统一放在目录：pkg-folder<br>
镜像文件输出的目录：output</p>
<p>则命令为</p>
<pre><code>.\ESXi-Customizer-PS-v2.6.0.ps1 -izip &lt;esxi-offline-bundle.zip&gt; -pkgDir &lt;pkg-folder&gt; -outDir &lt;output&gt;
</code></pre>
<p>例如</p>
<pre><code>.\ESXi-Customizer-PS-v2.6.0.ps1 -izip .\ESXi670-offline-bundle-201912001.zip -pkgDir .\pkg -outDir .\out
</code></pre>
<h3 id="3esxi">3. 重新安装ESXi系统</h3>
<p>将制作好的iso镜像文件，烧录到u盘，然后重新安装即可。</p>
<h2 id="">参考文献</h2>
<ul>
<li>1). <a href="https://www.v-front.de/p/esxi-customizer-ps.html">https://www.v-front.de/p/esxi-customizer-ps.html</a></li>
<li>2). <a href="https://blog.csdn.net/calvin555555/article/details/100657527">https://blog.csdn.net/calvin555555/article/details/100657527</a></li>
</ul>
<!--kg-card-end: markdown-->