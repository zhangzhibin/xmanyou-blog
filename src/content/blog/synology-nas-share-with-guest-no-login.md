---
title: "群晖NAS不登录共享文件夹"
description: "开启群晖NAS匿名访问，两个步骤一个都不能少。"
pubDate: 2021-01-26T01:20:06.000Z
author: "阿斌"
tags: ["NAS", "群晖", "杂七杂八"]
tagSlugs: ["nas", "qun-hui", "za-qi-za-ba"]
draft: false
type: post
slug: "synology-nas-share-with-guest-no-login"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>最近入手了一台群晖NAS，用来做数据中心和文件共享，但是，当我想创建一个无需登录的匿名共享文件夹时，却发现被拒绝了：</p>
<pre><code>对服务器 &quot;xxxxxxxx&quot; 上您账户的访问已经被拒绝。
</code></pre>
<p><img src="/content/images/2021/01/Synology-nas-share-01.png" alt="Synology-nas-share-01"></p>
<p><img src="/content/images/2021/01/Synology-nas-share-02.png" alt="Synology-nas-share-02"></p>
<p>这就奇怪了啊，我明明在共享文件夹中配置了guest权限呀：<br>
<img src="/content/images/2021/01/Synology-nas-share-08.png" alt="Synology-nas-share-08"></p>
<h2 id="">解决方法</h2>
<p>经过一阵折腾，终于到到了原因，原来是因为群晖默认将guest用户停用了。</p>
<p><img src="/content/images/2021/01/Synology-nas-share-03.png" alt="Synology-nas-share-03"></p>
<p>所以，解决方法就是：<strong>启用guest用户</strong><br>
在<strong>控制面板</strong>-&gt;<strong>用户账号</strong>-&gt;<strong>guest</strong>-&gt;<strong>编辑</strong>-&gt;取消<strong>停用此账户</strong><br>
<img src="/content/images/2021/01/Synology-nas-share-04.png" alt="Synology-nas-share-04"></p>
<p>返回到账户列表，可以看到状态已经从“<strong>停用</strong>”变成了“<strong>正常</strong>”<br>
<img src="/content/images/2021/01/Synology-nas-share-09.png" alt="Synology-nas-share-09"></p>
<p>然后就可以用无密码的访客访问了。<br>
<img src="/content/images/2021/01/Synology-nas-share-06.png" alt="Synology-nas-share-06"></p>
<h2 id="">配置总结</h2>
<ol>
<li>在<strong>控制面板</strong>-&gt;<strong>用户账号</strong>中，启用guest账户</li>
<li>为要共享的文件夹设置guest访问权限，为了安全起见，通常guest的权限应该设置为<strong>只读</strong></li>
<li>使用访客或者匿名方式连接服务器</li>
</ol>
<!--kg-card-end: markdown-->