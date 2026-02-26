---
title: "#VMWare #ESXi 遇到挂载的磁盘格式不正确怎么办？"
description: "在ESXi主机上安装openwrt koolshare lede版本时，很容易遇到这个格式不对的问题。\n这时候，需要用vmkfstools进行格式转换。"
pubDate: 2021-03-19T06:56:17.000Z
author: "阿斌"
tags: ["vmware"]
tagSlugs: ["vmware"]
draft: false
type: post
slug: "vmware-esxi-unsupported-disk-type"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>在VMWare ESXi虚拟机上安装openwrt系统时，通常是用直接挂载openwrt磁盘的方法。</p>
<p>但是，有时候下载下来的磁盘文件挂载后，并不能启动：</p>
<p><img src="/images/2021/03/vmware-esxi-openwrt-lede-disk-type-not-supported.png" alt="vmware-esxi-openwrt-lede-disk-type-not-supported"></p>
<pre><code>Unsupported and/or invalid disk type
</code></pre>
<p>这是因为，这个.vmdk文件并不是ESXi的格式，而是VMWare Player、VMWare Fushion或者VMware Workstation的磁盘文件，需要进行格式转换。</p>
<h1 id="">解决方法</h1>
<p>根据vmware的官方文档，</p>
<blockquote>
<p><a href="https://kb.vmware.com/s/article/1028943">https://kb.vmware.com/s/article/1028943</a></p>
</blockquote>
<ul>
<li>1). ESXi服务器开启ssh连接功能</li>
</ul>
<blockquote>
<p>开启方法参考：<a href="https://xmanyou.com/vmware-esxi-enable-ssh-connection/">https://xmanyou.com/vmware-esxi-enable-ssh-connection/</a></p>
</blockquote>
<ul>
<li>2). ssh到ESXi服务器</li>
<li>3). cd到该.vmdk文件所在目录</li>
</ul>
<pre><code>cd /vmfs/volumes
ls
</code></pre>
<ul>
<li>4). 用vmkfstools进行转换</li>
</ul>
<pre><code>vmkfstools -i &lt;旧的.vmdk&gt; &lt;新的.vmdk&gt;
</code></pre>
<p>例如</p>
<pre><code>vmkfstools -i ./openwrt-koolshare-mod-v2.36-r14941-
67f6fa0a30-x86-64-generic-squashfs-combined-efi.vmdk ./openwrt-koolshare-new.vmdk

Destination disk format: VMFS zeroedthick

Cloning disk './openwrt-koolshare-mod-v2.36-r14941-67f6fa0a30-x86-64-generic-squashfs-combined-efi.vmdk'...

Clone: 100% done.
</code></pre>
<p>出现100%done，表示转换完成，然后重新挂载，就可以了。</p>
<!--kg-card-end: markdown-->