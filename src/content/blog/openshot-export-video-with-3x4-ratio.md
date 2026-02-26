---
title: "#OpenShot 如何导出任意分辨率"
description: "用这个方法可以导出任意分辨率的视频。"
pubDate: 2021-04-16T16:21:23.000Z
author: "阿斌"
tags: ["openshot", "杂七杂八"]
draft: false
type: post
slug: "openshot-export-video-with-3x4-ratio"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>之前发过一篇文章《<a href="https://xmanyou.com/openshot-ru-he-yong-openshotshu-chu-shu-ping-fen-bian-lu-de-shi-pin/">如何用OpenShot输出竖屏分辨率的视频</a>》，使用的自定义配置文件的方法。</p>
<p>不过，有同学反映说，这个方法不是太好用，没法导出1080x1440(比例3:4)或者750x1080(比例25:36)等分辨率。</p>
<p>于是又做了一番调研，发现了更方便的设置OpenShot导出分辨率的方法。</p>
<h1 id="">解决方法</h1>
<p>根据github上的一个issue的介绍，设置导出分辨率的步骤：</p>
<ul>
<li>1). 在导出视频的设置中，选择Advance页（中文是“高级”）</li>
<li>2). 在Profile（中文是“配置”）页中，选择一个分辨率与目标分辨率最接近的配置文件格式，比如要导出3:4比例分辨率的话，可以选择“VGA NTSC (640x480)”。</li>
<li>3). 修改导出视频的宽度width和高度height为想要的分辨率</li>
<li>4). 导出视频</li>
</ul>
<p><img src="/images/2021/04/openshot-change-export-ratio.png" alt="openshot-change-export-ratio"></p>
<p><img src="/images/2021/04/openshot-export-1080x1440.png" alt="openshot-export-1080x1440"></p>
<ul>
<li>5). 检查导出结果</li>
</ul>
<h1 id="">其他</h1>
<h2 id="1openshot">1). 修改OpenShot显示语言为中文</h2>
<p>Mac版本，选择 preference -&gt; General -&gt; Language，选择中文，然后重启OpenShot即可。</p>
<p><img src="/images/2021/04/openshot-change-language.png" alt="openshot-change-language"></p>
<h2 id="2">2). 黑边问题</h2>
<p>如果素材的分辨率与导出分辨率不一致，容易出现黑边的情况，这时候需要怎么办呢？</p>
<p>如果素材的比例跟目标比例不一致，OpenShotb不知道该怎么处理，就会产生黑边。比如要导出 300x400, 但是素材是 280x400，那左右两边少的20个像素就会被黑边填充。</p>
<p>可以用拉伸或者等比例扩大素材，或者自定义背景图的方法来填充黑边。</p>
<p><img src="/images/2021/04/openshot-scale-assets.png" alt="openshot-scale-assets"></p>
<h1 id="">参考</h1>
<ul>
<li><a href="https://github.com/OpenShot/openshot-qt/issues/731">https://github.com/OpenShot/openshot-qt/issues/731</a></li>
</ul>
<!--kg-card-end: markdown-->