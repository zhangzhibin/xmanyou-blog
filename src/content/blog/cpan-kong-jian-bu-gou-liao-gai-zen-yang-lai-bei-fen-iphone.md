---
title: "Window系统C盘空间不够了，该怎样来备份iPhone?"
description: "如果C盘的空间不足，在使用iTunes对iPhone进行本地备份的时候，很可能会遇到“C盘空间不足”的错误，导致备份失败。\n这里介绍一个简单有效的办法。"
pubDate: 2017-11-13T12:37:31.000Z
author: "阿斌"
tags: ["IT", "杂七杂八"]
draft: false
type: post
slug: "cpan-kong-jian-bu-gou-liao-gai-zen-yang-lai-bei-fen-iphone"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>随着iPhone的手机硬盘越来越大，备份所需的空间也越来越大。</p>
<p>如果C盘的空间不足，在使用iTunes对iPhone进行本地备份的时候，很可能会遇到“C盘空间不足”的错误，导致备份失败。</p>
<p>除了删除一些不要的文件，腾出更多空间，还有什么办法能解决这个问题呢？</p>
<p>有！</p>
<p>办法就是修改备份文件的保存位置。</p>
<p>步骤：</p>
<ol>
<li>删除上次备份失败的文件目录，通常是这里：</li>
</ol>
<blockquote>
<p>&quot;C:\Users\自己电脑名\AppData\Roaming\Apple Computer\MobileSync\Backup&quot;</p>
</blockquote>
<ol start="2">
<li>在空间足够的分区创建新的备份目录（文件名无关），比如：</li>
</ol>
<blockquote>
<p>&quot;D:\iPhone\Backup&quot;</p>
</blockquote>
<ol start="3">
<li>为新的备份目录，创建一个快捷方式，命名为Backup。</li>
<li>把快捷方式拷贝到以下位置：</li>
</ol>
<blockquote>
<p>&quot;C:\Users\自己电脑名\AppData\Roaming\Apple Computer\MobileSync&quot;</p>
</blockquote>
<ol start="5">
<li>搞定，备份。</li>
</ol>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->