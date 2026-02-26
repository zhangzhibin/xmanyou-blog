---
title: "如何在#VMWare #ESXi 6.7上安装OpenWrt虚拟机充当旁路由"
description: "在24小时开机的EXSi服务器上安装一个OpenWrt作为旁路由怎么样呢？"
pubDate: 2021-03-20T09:46:42.000Z
author: "阿斌"
tags: ["OpenWrt", "vmware", "杂七杂八"]
tagSlugs: ["openwrt", "vmware", "za-qi-za-ba"]
draft: false
type: post
slug: "vmware-esxi-install-openwrt"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>生命在于折腾~</p>
<h1 id="1openwrt">1. 从哪里下载OpenWrt固件</h1>
<p>可以从很多地方下载OpenWrt，也可以选择自己编译。<br>
本指南选用的是Lean的Openwrt版本，里边已经集成了一些常用的ipk插件。</p>
<p>选择已经编译好的固件：</p>
<blockquote>
<p><a href="https://github.com/coolsnowwolf/lede/releases">https://github.com/coolsnowwolf/lede/releases</a></p>
</blockquote>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-01.png" alt="VMWare-ESXi-Install-OpenWrt-01"></p>
<p>关于这个版本的一些信息：</p>
<ul>
<li>默认登陆IP 192.168.1.1</li>
<li>用户 root</li>
<li>密码 password</li>
<li>内核 4.19.108</li>
</ul>
<h1 id="2openwrtimgvmwareexsivmdk">2. 将OpenWrt固件镜像(.img)转换为VMWare EXSi支持的.vmdk格式文件</h1>
<p>下载rar解压后，得到的是.img镜像文件, 例如</p>
<blockquote>
<p>openwrt-R20.4.8-x64-combined-squashfs.img</p>
</blockquote>
<p>由于VMWare EXSi并不支持直接从img镜像创建虚拟机，我们需要先将.img文件转换为.vmdk文件。</p>
<h2 id="imgvmdk">如何将img文件转换为vmdk呢？</h2>
<p>使用qemu-img工具，可以将.img镜像文件转换为.vmdk VMWare磁盘文件。</p>
<h3 id="1qemuimg">1). 安装qemu-img</h3>
<ul>
<li>MacOS 安装qemu-img</li>
</ul>
<pre><code>brew install qemu-img
</code></pre>
<ul>
<li>Linux安装qemu-img</li>
</ul>
<pre><code>yum -y install qemu-img
</code></pre>
<ul>
<li>Windows 安装 qemu-img</li>
</ul>
<blockquote>
<p><a href="https://cloudbase.it/qemu-img-windows/">https://cloudbase.it/qemu-img-windows/</a></p>
</blockquote>
<h3 id="2qemuimgimgvmdk">2). 使用qemu-img命令来转换img文件为.vmdk文件</h3>
<p>打开命令行，然后输入</p>
<pre><code>qemu-img convert -f raw -O vmdk &lt;OpenWrt固件镜像&gt;.img &lt;目标新文件名&gt;.vmdk
例如
qemu-img convert -f raw -O vmdk openwrt-R20.4.8-x64-combined-squashfs.img openwrt-R20.4.8-x64-combined-squashfs.img.vmdk
</code></pre>
<p><strong>注意</strong><br>
qmeu-img只能将.img文件转换为VMWare Player、VMWare Fushion或者VMware Workstation支持的磁盘文件格式。</p>
<p>对于ESXi，直接使用的话，是会报错的，需要按照以下步骤再次转换。</p>
<pre><code>无法打开虚拟机的电源。磁盘类型不受支持或无效。请确保磁盘已导入。
</code></pre>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-02.png" alt="VMWare-ESXi-Install-OpenWrt-02"></p>
<p>参考: <a href="https://xmanyou.com/vmware-esxi-unsupported-disk-type/">https://xmanyou.com/vmware-esxi-unsupported-disk-type/</a></p>
<h3 id="3vmwareexsi">3). 上传到VMWare EXSi主机的数据存储空间。</h3>
<p>打开数据存储浏览器，把刚刚转换好的.vmdk文件上传到数据存储空间。<br>
假设路径是</p>
<blockquote>
<p>hdd-&gt;iso-&gt;openwrt-&gt;openwrt-R20.4.8-x64-combined-squashfs.img.vmdk</p>
</blockquote>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-03.png" alt="VMWare-ESXi-Install-OpenWrt-03"></p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-04.png" alt="VMWare-ESXi-Install-OpenWrt-04"></p>
<h3 id="4sshesxiopenwrtvmdk">4). 用SSH连接ESXi服务器，并找到上传的OpenWrt的.vmdk文件</h3>
<p>首先，如果没有开启ssh服务，找到 导航器-&gt;主机-&gt;管理-&gt;服务-&gt;TSM-SSH，如果是已停止状态，则启动TSM-SSH服务。</p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-05.png" alt="VMWare-ESXi-Install-OpenWrt-05"></p>
<pre><code>ssh &lt;用户&gt;@&lt;ESXi主机&gt;
</code></pre>
<p>找到刚刚上传的OpenWrt的.vmdk文件</p>
<pre><code>ssh root@192.168.1.11
cd vmfs/volumes/hdd/iso/openwrt/
ls openwrt-R20.4.8-x64-combined-squashfs.img.vmdk
</code></pre>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-06.png" alt="VMWare-ESXi-Install-OpenWrt-06"></p>
<h3 id="5vmkfstoolsvmdkesxivmdk">5). 使用vmkfstools将不支持的.vmdk转换为ESXi支持的.vmdk格式</h3>
<pre><code>vmkfstools -i &lt;旧的.vmdk&gt; &lt;新的.vmdk&gt;
</code></pre>
<p>例如</p>
<pre><code>vmkfstools -i openwrt-R20.4.8-x64-combined-squashfs.img.vmdk openwrt-R20.4.8-x64-combined-squashfs.img.exsi6.vmdk
</code></pre>
<p>注意，如果不是用ESXi虚拟机，而是VMWare Player等软件，则不需进行这一步。</p>
<h3 id="6vmdk">6). 备份.vmdk文件</h3>
<p>到这一步，ESXi虚拟机支持的OpenWrt镜像文件就准备完成了。<br>
但是为了避免出现问题需要重装，最好是将转换好的.vmdk文件，在数据存储中做个备份。</p>
<h1 id="3openwrt">3. 安装OpenWrt虚拟机</h1>
<h2 id="31">3.1. 创建系统</h2>
<p>选择Linux/其他Linux(64位)</p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-07.png" alt="VMWare-ESXi-Install-OpenWrt-07"></p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-08.png" alt="VMWare-ESXi-Install-OpenWrt-08"></p>
<h2 id="32cpu">3.2. 删掉默认的硬盘，设置好cpu和内存</h2>
<p>默认的硬盘可以删掉。<br>
CPU和内存根据需要设置。我设置的1CPU和2G内存。</p>
<h2 id="33openwrtvmdk">3.3. 添加OpenWrt vmdk文件作为硬盘</h2>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-09.png" alt="VMWare-ESXi-Install-OpenWrt-09"></p>
<p>选择刚刚已经转好的ESXi支持的OpenWrt vmdk文件。</p>
<p><strong>注意：</strong> 最好是做个备份。</p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-10.png" alt="VMWare-ESXi-Install-OpenWrt-10"></p>
<p>再检查一下选择的vmdk是ESXi支持的那个。</p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-11.png" alt="VMWare-ESXi-Install-OpenWrt-11"></p>
<p>完成创建，就可以打开电源了。</p>
<p>等控制台不再刷新以后，按下回车，如果出现下边的画面，表示安装成功了。</p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-12.png" alt="VMWare-ESXi-Install-OpenWrt-12"></p>
<h2 id="34exsiopenwrtip">3.4. 在EXSi控制台中修改OpenWrt的网卡ip</h2>
<p>OpenWrt系统启动以后，由于默认是192.168.1.1。这个ip一般是不可用的，需要在ESXi控制台中进行修改。</p>
<pre><code>vi /etc/config/network
</code></pre>
<p>找到 192.168.1.1，修改成可用的ip，并重启OpenWrt系统。</p>
<p>不熟悉vi命令的同学，可以按照以下步骤操作：</p>
<ul>
<li>移动光标到192.168.1.1</li>
<li>按下i，进入编辑模式</li>
<li>把192.168.1.1 改成你的ip，比如我用192.168.1.5</li>
<li>按下ESC，退出编辑模式</li>
<li>按下冒号和wq(:wq)，保存并退出</li>
<li>输入reboot重启</li>
</ul>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-13.png" alt="VMWare-ESXi-Install-OpenWrt-13"></p>
<p>重启后，输入以下命令，确认ip修改完成。</p>
<pre><code>cat /etc/config/network
</code></pre>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-14.png" alt="VMWare-ESXi-Install-OpenWrt-14"></p>
<h2 id="35openwrt">3.5. 通过浏览器访问OpenWrt管理界面</h2>
<p>ip修改成功后，就可以在浏览器里访问OpenWrt管理界面了。<br>
在浏览器里输入刚刚修改的OpenWrt IP，例如192.168.1.5。看到登录界面，就表示之前的设置正常：<br>
默认的用户是 root，密码 password</p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-15.png" alt="VMWare-ESXi-Install-OpenWrt-15"></p>
<p>登录后，可以看到系统的状态</p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-16.png" alt="VMWare-ESXi-Install-OpenWrt-16"></p>
<h1 id="4dnsopenwrtipv4wan">4. 设置网关和DNS，解决OpenWrt IPv4 WAN 未连接状态</h1>
<p>在系统状态中可以看到，IPv4 WAN 状态为：未连接</p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-17.png" alt="VMWare-ESXi-Install-OpenWrt-17"></p>
<p>如果在OpenWrt管理界面中，使用网络-&gt;诊断，进行网络诊断，发现报错: 错误的地址</p>
<pre><code>ping: bad address 'openwrt.org'
</code></pre>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-18.png" alt="VMWare-ESXi-Install-OpenWrt-18"></p>
<p>如果在OpenWrt诊断工具中，直接ping ip，则报错：网络无法连接</p>
<pre><code>PING 139.59.209.225 (139.59.209.225): 56 data bytes
ping: sendto: Network unreachable
</code></pre>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-19.png" alt="VMWare-ESXi-Install-OpenWrt-19"></p>
<p>这表明，OpenWrt无法进行域名解析，也无法与外网联通。</p>
<p>需要打开网络-&gt;接口，为OpenWrt的网络接口添加网关和DNS。</p>
<p>将默认的LAN接口的网关和DNS都配置为物理路由器所在地址，例如 192.168.1.1。</p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-20.png" alt="VMWare-ESXi-Install-OpenWrt-20"></p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-21.png" alt="VMWare-ESXi-Install-OpenWrt-21"></p>
<p>配置好后，返回到系统状态，可以看到IPv4 WAN状态是已连接。</p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-22.png" alt="VMWare-ESXi-Install-OpenWrt-22"></p>
<p>再次进行网络诊断，可以正常解析域名和访问了。</p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-23.png" alt="VMWare-ESXi-Install-OpenWrt-23"></p>
<p>OpenWrt的配置就算完成了。</p>
<h1 id="5openwrt">5. 如何使用OpenWrt充当旁路由</h1>
<p>安装了OpenWrt虚拟机之后，网络上存在2个路由器：</p>
<ul>
<li>物理路由器 192.168.1.1</li>
<li>OpenWrt路由器 192.168.1.5</li>
</ul>
<p>要使用OpenWrt作为旁路由，来绕过一些网络限制，最简单的方法是：</p>
<h2 id="1ipopenwrtipopenwrt">方法1. 将客户端的ip设置为静态，并将网关设置为OpenWrt的ip使用OpenWrt作为路由器</h2>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-24.png" alt="VMWare-ESXi-Install-OpenWrt-24"></p>
<p>修改网关后，能正常访问网络，表示配置成功。</p>
<p>使用traceroute命令，可以看到，首先走的是OpenWrt的ip</p>
<p><img src="/images/2021/03/VMWare-ESXi-Install-OpenWrt-25.png" alt="VMWare-ESXi-Install-OpenWrt-25"></p>
<h2 id="2openwrtip">方法2. 在主路由上设置客户端连接时的默认网关为OpenWrt的ip，则可以实现自动路由。</h2>
<p>这个方法，需要主路由器支持，不是所有的都可以。</p>
<p>以上，在EXSi上安装OpenWrt虚拟机并充当旁路由，就完成了。</p>
<h1 id="6">6. 参考文献</h1>
<ul>
<li><a href="https://openwrt.org/docs/guide-user/virtualization/vmware">https://openwrt.org/docs/guide-user/virtualization/vmware</a></li>
<li><a href="https://kb.vmware.com/s/article/1028943">https://kb.vmware.com/s/article/1028943</a></li>
<li><a href="https://github.com/coolsnowwolf/lede">https://github.com/coolsnowwolf/lede</a></li>
</ul>
<p>本文同步发表在公众号上：<a href="https://mp.weixin.qq.com/s/fExmkKRukGfdxU5gNEa0og">https://mp.weixin.qq.com/s/fExmkKRukGfdxU5gNEa0og</a></p>
<!--kg-card-end: markdown-->