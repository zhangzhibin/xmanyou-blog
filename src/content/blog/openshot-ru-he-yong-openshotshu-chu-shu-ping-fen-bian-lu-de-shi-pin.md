---
title: "#OpenShot# 如何用OpenShot输出竖屏分辨率的视频"
description: "如何使用开源视频编辑软件OpenShot输出1080x1920的竖屏格式视频呢？"
pubDate: 2019-03-13T05:03:36.000Z
author: "阿斌"
tags: ["开发笔记", "openshot"]
tagSlugs: ["dev", "openshot"]
draft: false
type: post
slug: "openshot-ru-he-yong-openshotshu-chu-shu-ping-fen-bian-lu-de-shi-pin"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>OpenShot 是一个开源的视频编辑软件。</p>
<pre><code>官网 https://www.openshot.org
</code></pre>
<p><img src="/content/images/2019/03/7a060e09-6595-417d-96cb-7562fdd4a873.jpg" alt="7a060e09-6595-417d-96cb-7562fdd4a873"></p>
<h2 id="">问题</h2>
<p>OpenShot默认是不支持输出竖屏分辨率的视频的。<br>
比如常用的1080P格式的视频分辨率是1920x1080。<br>
如果游戏是竖屏的，想要输出1080x1920怎么办呢？</p>
<h2 id="">答案</h2>
<p>答案是用Cusotm profile，自定义设置。</p>
<p>参考</p>
<pre><code>https://www.openshot.org/static/files/user-guide/profiles.html#custom-profile
</code></pre>
<h2 id="">方法</h2>
<ol>
<li>找一个模板，比如 “HDV 1080 25p 1080x1920”。在Windows上的位置是：</li>
</ol>
<pre><code>&lt;安装路径&gt;\profiles
C:\Program Files\OpenShot Video Editor\profiles
</code></pre>
<ol start="2">
<li>用编辑器打开</li>
</ol>
<pre><code>description=HDV 1080 25p 1080x1920
frame_rate_num=25
frame_rate_den=1
width=1080
height=1920
progressive=1
sample_aspect_num=1
sample_aspect_den=1
display_aspect_num=16
display_aspect_den=9
</code></pre>
<ol start="3">
<li>修改 width 和 height，以及description</li>
</ol>
<pre><code>description=HDV 1080 25p 1920x1080 &lt;--- 改成想要的名字
width=1920
height=1080
</code></pre>
<ol start="4">
<li>保存到自定义模板位置，Windows下是</li>
</ol>
<pre><code>C:\Users\&lt;用户名&gt;\.openshot_qt\profiles
</code></pre>
<p>取个好识别的名字</p>
<ol start="5">
<li>重启OpenShot, 然后在菜单中选择刚刚修改的配置:<br>
<img src="/content/images/2019/03/Snipaste_2019-03-13_12-59-31.png" alt="Snipaste_2019-03-13_12-59-31"></li>
</ol>
<p>显示如下，尺寸为 1080x1920<br>
<img src="/content/images/2019/03/ba62b487-0cc6-4f73-84f4-d26d6f09d0a9.png" alt="ba62b487-0cc6-4f73-84f4-d26d6f09d0a9"></p>
<ol start="6">
<li>输出测试，完。</li>
</ol>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->