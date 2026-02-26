---
title: "Laya 1.x Unity插件无法在Mac Catalina 10.15+上使用？"
description: "旧版开发工具与新版操作系统的冲突"
pubDate: 2020-11-02T05:12:20.000Z
author: "阿斌"
tags: ["Unity", "laya", "开发笔记", "h5 小游戏开发"]
draft: false
type: post
slug: "laya-unity-plugin-incompatible-with-mac-catalina-10-15"
---

<!--kg-card-begin: markdown--><h1 id="">问题背景</h1>
<p>根据Laya官方文档，Laya 1.7对应的Unity插件需要使用Unity5.6版本。</p>
<p><img src="/images/2020/11/Laya1.x_Unity_plugin_dependency.png" alt="Laya1.x_Unity_plugin_dependency"></p>
<p>在2020年，要下载Unity 5.6版本，需要找到Unity官方的下载页面</p>
<blockquote>
<p><a href="https://unity.cn/releases">https://unity.cn/releases</a><br>
或者<br>
<a href="https://unity.cn/releases/full/5">https://unity.cn/releases/full/5</a></p>
</blockquote>
<p>Unity Hub 2.4.2版本上也有快捷入口：</p>
<p><img src="/images/2020/11/Unity_hub_official_download_page.png" alt="Unity_hub_official_download_page"></p>
<p>但是，在Mac Catalina上启动Unity 5.6时，发现怎么打不开Unity Editor……</p>
<p>这是什么情况呢？是不是因为Unity版本太老了呢？</p>
<h1 id="">原因</h1>
<p>搜索“Unity 5.x Catalina”，发现网上有人遇到类似问题：<br>
<img src="/images/2020/11/Unity5.x-incompatible-with-mac-catalina-10.15_issue.png" alt="Unity5.x-incompatible-with-mac-catalina-10.15_issue"></p>
<p>参考：<a href="https://forum.unity.com/threads/installing-unity-on-macos-catalina.689089/">https://forum.unity.com/threads/installing-unity-on-macos-catalina.689089/</a></p>
<p>简而言之，由于新版本的Mac系统已经全面放弃32位应用，而Unity 5.x版本中包含了32位应用组件，所以无法在Mac Catalina 10.15及以上系统中运行。</p>
<p><img src="/images/2020/11/Unity5.x-incompatible-with-mac-catalina-10.15.png" alt="Unity5.x-incompatible-with-mac-catalina-10.15"></p>
<p>受这个影响，Laya 1.x的Unity插件，也将无法<strong>直接</strong>在Mac Catalina 10.15+系统上使用。</p>
<h1 id="">解决方法</h1>
<p>为什么说不能直接使用呢？是说，间接，或者非官方做法可能可行？</p>
<p>因为Unity 5.x之后的版本，也就是2017起，是支持Mac Catalina的，所以也许Laya插件也可以在高版本Unity上运行呢？</p>
<p><img src="/images/2020/11/Unity-compatible-with-mac-catalina-10.15.png.png" alt="Unity-compatible-with-mac-catalina-10.15.png"></p>
<p>从Laya官方论坛的教程来看，似乎是没问题的：</p>
<blockquote>
<p><a href="https://ask.layabox.com/question/4242">https://ask.layabox.com/question/4242</a></p>
</blockquote>
<p>导入插件时需要进行升级：<br>
<img src="/images/2020/11/Laya1.x_unity_plugin_with_unity_2017.png" alt="Laya1.x_unity_plugin_with_unity_2017"></p>
<p>实际测试时，导入插件升级后，没有遇到其他问题。<br>
<img src="/images/2020/11/Laya1.x_unity_plugin_with_unity_2017_01.png" alt="Laya1.x_unity_plugin_with_unity_2017_01"></p>
<p><img src="/images/2020/11/Laya1.x_unity_plugin_with_unity_2017_02.png" alt="Laya1.x_unity_plugin_with_unity_2017_02"></p>
<p><img src="/images/2020/11/Laya1.x_unity_plugin_with_unity_2017_03.png" alt="Laya1.x_unity_plugin_with_unity_2017_03"></p>
<p>如果你在使用中遇到问题，欢迎联系我。</p>
<h1 id="">其他</h1>
<ul>
<li>1). Laya 1.7 Unity插件<strong>真正</strong>的下载地址</li>
</ul>
<blockquote>
<p><a href="https://ask.layabox.com/question/4242">https://ask.layabox.com/question/4242</a></p>
</blockquote>
<ul>
<li>2). Laya 1.7 Unity插件使用教程</li>
</ul>
<blockquote>
<p><a href="https://ldc.layabox.com/doc/?nav=zh-ts-4-0-1">https://ldc.layabox.com/doc/?nav=zh-ts-4-0-1</a><br>
<a href="https://ask.layabox.com/question/4242">https://ask.layabox.com/question/4242</a></p>
</blockquote>
<p>以上。</p>
<!--kg-card-end: markdown-->