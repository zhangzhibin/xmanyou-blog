---
title: "#群晖 百度网盘下载的文件找不到了怎么办？"
description: "在NAS中用百度网盘客户端下载的小视频找不到了可怎么办？"
pubDate: 2021-07-23T14:39:25.000Z
author: "阿斌"
tags: ["群晖", "百度网盘", "dockder", "杂七杂八"]
tagSlugs: ["qun-hui", "bai-du-wang-pan", "dockder", "za-qi-za-ba"]
draft: false
type: post
slug: "synology-baidu-netdisk-usage"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>用群晖自带的CloudSync来同步百度网盘有很多局限性，比如</p>
<ul>
<li>1). 只能同步特定文件夹</li>
<li>2). 空间比较小，只能500M</li>
</ul>
<p>于是安装了第三方的百度网盘客户端套件：</p>
<blockquote>
<p>群晖百度网盘客户端套件地址<br>
<a href="https://github.com/john-shine/synology-baiduNetdisk-package/releases">https://github.com/john-shine/synology-baiduNetdisk-package/releases</a></p>
</blockquote>
<p>这个方法的原理是利用docker运行一个百度网盘客户端容器，然后用vnc来控制。</p>
<p><img src="/content/images/2021/07/synology-baidu-netdisk-usage-01.jpeg" alt="synology-baidu-netdisk-usage-01"></p>
<p><img src="/content/images/2021/07/synology-baidu-netdisk-usage-02.jpeg" alt="synology-baidu-netdisk-usage-02"></p>
<p><img src="/content/images/2021/07/synology-baidu-netdisk-usage-03.jpeg" alt="synology-baidu-netdisk-usage-03"></p>
<p>可以看到，使用这个套件，基本上跟在电脑上使用百度网盘客户端是一样一样的，包括网速……</p>
<p>如果你跟我一样没有开通会员，就只好忍受龟速下载。</p>
<p>不过，不着急的话，也不是大问题。</p>
<p>但是，如果你跟我一样，兴冲冲地直接下载，耐心地等待了一晚上以后，会发现：</p>
<p>咦？我下载的视频哪里去了？？</p>
<h1 id="">解决方法</h1>
<h2 id="">首先，下载的文件去哪里了？</h2>
<p>百度网盘客户端套件安装完毕后，默认的下载地址是docker容器中的home/baidu目录，而不是群晖的home目录。</p>
<p><img src="/content/images/2021/07/synology-baidu-netdisk-usage-04.png" alt="synology-baidu-netdisk-usage-04"></p>
<p>如果没有特别指定的卷(volume)，那么这个home目录是没法直接从群晖的文件管理器中找到的。</p>
<p>所以，在首次下载文件前，需要先指定一个群晖的挂载目录(volume)，该套件默认已经帮忙挂载了一个群晖目录BDdownload，套件中的地址是</p>
<pre><code>/home/baidu/baidunetdiskdownload/
</code></pre>
<p><img src="/content/images/2021/07/synology-baidu-netdisk-usage-06.png" alt="synology-baidu-netdisk-usage-06"></p>
<p>指定这个目录为默认下载目录，然后下载的文件，就会显示在群晖的BDdownload目录里了。<br>
<img src="/content/images/2021/07/synology-baidu-netdisk-usage-05.png" alt="synology-baidu-netdisk-usage-05"></p>
<h2 id="">其次，已经下载的文件怎么找回来？</h2>
<p>简单说一下原理：</p>
<ul>
<li>1). 用ssh连接到群晖</li>
<li>2). 进入docker容器</li>
<li>3). 将文件移动到挂载的目录</li>
</ul>
<p>命令行示例：</p>
<ul>
<li>1). 用有管理员权限的用户连接到群晖</li>
</ul>
<pre><code>ssh &lt;用户名&gt;@&lt;群晖ip&gt;
</code></pre>
<ul>
<li>2). 查看运行的docker容器</li>
</ul>
<pre><code>sudo docker ps
&lt;按照提示输入密码&gt;

CONTAINER ID        IMAGE                                         COMMAND             CREATED             STATUS              PORTS                                              NAMES
9d1bc70f8025        johnshine/baidunetdisk-crossover-vnc:latest   &quot;/entrypoint.sh&quot;    32 hours ago        Up 32 hours         5901/tcp, 0.0.0.0:6900-&gt;6080/tcp                   recursing_shaw
ed5bc7887765        johnshine/baidunetdisk-crossover-vnc:latest   &quot;/entrypoint.sh&quot;    32 hours ago        Up 32 hours         0.0.0.0:32769-&gt;5901/tcp, 0.0.0.0:32768-&gt;6080/tcp   johnshine-baidunetdisk-crossover-vnc1
</code></pre>
<p>其中recursing_shaw就是百度网盘客户端docker容器名</p>
<ul>
<li>3). 连接到容器</li>
</ul>
<pre><code>sudo docker exec -it recursing_shaw bash

# 连接成功后，就进入到了容器的/home/baidu目录，也就是默认的下载目录
</code></pre>
<ul>
<li>4). 将之前下载的文件或者文件夹移动到挂载目录，也就是baidunetdiskdownload</li>
</ul>
<pre><code>baidu@9d1bc70f8025:~$ ls
baidunetdiskdownload  李狗嗨全集

baidu@9d1bc70f8025:~$ mv 李狗嗨全集 ./baidunetdiskdownload/
# 如果文件比较多，移动需要花一点时间。

baidu@9d1bc70f8025:~$ ls
baidunetdiskdownload

baidu@9d1bc70f8025:~$ exit
</code></pre>
<p><strong>注意</strong><br>
如果文件比较多，移动需要花一点时间。</p>
<p>然后回到群晖检查一下BDdownload目录，就看到我之前下载的李狗嗨全集了。</p>
<p>完成。</p>
<!--kg-card-end: markdown-->