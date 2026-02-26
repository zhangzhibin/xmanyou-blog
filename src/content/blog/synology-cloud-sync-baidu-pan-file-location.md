---
title: "群晖CloudSync同步百度云盘后，文件去哪里了？"
description: "同步以后，文件居然找不到了，奇怪。"
pubDate: 2021-01-31T16:02:24.000Z
author: "阿斌"
tags: ["群晖", "杂七杂八"]
tagSlugs: ["qun-hui", "za-qi-za-ba"]
draft: false
type: post
slug: "synology-cloud-sync-baidu-pan-file-location"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>群晖的CloudSync套件支持百度云盘做远程数据同步的。<br>
设置也很简单，首先选择群晖本地的目录，然后登录云盘，就可以了。</p>
<p>但是，问题来了，群晖好像并没有把百度云盘的整个目录同步下来，这是怎么回事呢？</p>
<h1 id="">解决方法</h1>
<p>经过一番折腾，这才发现，原来，群晖CloudSync并不能直接同步整个百度云盘，而是在百度云盘上创建了一个自己的文件夹CloudSync，只有这个文件夹下的文件会被同步。</p>
<p>不过这个文件夹的位置还挺隐蔽的，</p>
<ul>
<li>
<p>1). 首先，找到&quot;<strong>我的应用数据</strong>&quot;<br>
<img src="/images/2021/01/synology-cloud-sync-baidu-pan-location-apps.png" alt="synology-cloud-sync-baidu-pan-location-apps"></p>
</li>
<li>
<p>2). 然后，找到&quot;<strong>Cloud Sync</strong>&quot;，就可以找到同步到百度盘的文件了<br>
<img src="/images/2021/01/synology-cloud-sync-baidu-pan-location-apps-02.png" alt="synology-cloud-sync-baidu-pan-location-apps-02"></p>
</li>
</ul>
<p>需要注意的是，“我的应用数据”这个文件夹的实际名字，其实是“apps”。</p>
<p>是不是很坑？</p>
<h1 id="">其他</h1>
<ul>
<li>1). 2020年起，百度云盘对群晖的配额限制为100G</li>
</ul>
<p><img src="/images/2021/01/synology-cloud-sync-baidu-pan-100g-limit.png" alt="synology-cloud-sync-baidu-pan-100g-limit"></p>
<!--kg-card-end: markdown-->