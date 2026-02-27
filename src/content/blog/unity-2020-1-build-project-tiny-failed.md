---
title: "Unity 2020.1 中国版无法编译 Tiny Project"
description: "Unity中国特供版居然有特供的bug?"
pubDate: 2020-08-09T15:11:17.000Z
author: "阿斌"
tags: ["开发笔记", "Unity", "h5 小游戏开发"]
tagSlugs: ["dev", "unity", "h5"]
draft: false
type: post
slug: "unity-2020-1-build-project-tiny-failed"
image: "/content/images/2020/08/Unity_Project_Tiny_error_05-1.png"
authorSlug: "dev"
---

<!--kg-card-begin: markdown--><p>Unity什么时候能打微信小游戏包？或者说H5游戏包？<br>
这个问题困扰了我很久。</p>
<p>最近看到Unity官方微信公众号推了不少关于小游戏的文章，本着眼见为实的原则，亲自去Unity论坛看了一下。</p>
<p>发现目前还是0.28 preview版本，不过跟去年比确实也增加了一些功能，只是进度比预期的要慢不少。</p>
<p>参考公众号文章：《<a href="https://mp.weixin.qq.com/s?__biz=MzI0OTQzMTM4NQ==&amp;mid=2247484429&amp;idx=1&amp;sn=5e1fefc1714f70fcf70e64b7ec1f0084&amp;chksm=e990d03bdee7592d2b02f7e6dee1faf26870db28872c1eefd9f8ed6fce8d581c26aa5b122347&amp;scene=126&amp;sessionid=1596986329&amp;key=2449a805bf282387879160a803e77568e6233eb257909c50d08b05c7d1ea2ef5ee118699c2011296c7810a432e34fabe54ba28fda6b1a4622f66cd3c26698844ec152bfbcde6a25bc7400995997017cb&amp;ascene=1&amp;uin=MTA3OTE4NzQyMA%3D%3D&amp;devicetype=Windows+10+x64&amp;version=62090070&amp;lang=zh_CN&amp;exportkey=AbtMswiNTkfzQNKrr%2FJwfDg%3D&amp;pass_ticket=Nu0CgypqFKpgDf%2BkVNiGoXa4BgNeuDnHkJ4E1CLxqNsR4c68CfbzBD4XpzH7e%2BpK">2020年了，Unity能打微信小游戏包了吗？</a>》。</p>
<p>刚好有合作伙伴在调研能否用Unity打包输出Facebook小游戏，于是，我也试了一下Project Tiny的最新版本 0.28preview。</p>
<p>官方文档：</p>
<blockquote>
<p><a href="https://docs.google.com/document/d/1A8hen2hLFY5FLkC5gd3JP2Z-IpHfnAX-CpYLK3aOdwA/edit">https://docs.google.com/document/d/1A8hen2hLFY5FLkC5gd3JP2Z-IpHfnAX-CpYLK3aOdwA/edit</a></p>
</blockquote>
<p>官方示例：</p>
<blockquote>
<p><a href="https://github.com/Unity-Technologies/ProjectTinySamples">https://github.com/Unity-Technologies/ProjectTinySamples</a></p>
</blockquote>
<p>最新的0.28preview需要使用Unity 2020.1。</p>
<p>在测试的时候遇到2个编译问题：</p>
<h2 id="1">1). 编译进度无法完成</h2>
<p>卡在 Download and unpack .StevedoreVersion，如下图</p>
<p><img src="/content/images/2020/08/Unity_Project_Tiny_error_05.png" alt="Unity_Project_Tiny_error_05"></p>
<h3 id="">解决方法</h3>
<p>这是网络问题，需要使用vpn。</p>
<h2 id="2">2). 修改项目后，无法编译。</h2>
<p>报错：</p>
<pre><code>FormatException: Input string was not in a correct format.
</code></pre>
<p><img src="/content/images/2020/08/Unity_Project_Tiny_error_01.png" alt="Unity_Project_Tiny_error_01"></p>
<p>这个问题说起来就很奇葩了：<br>
<strong>为什么刚打开工程时可以正常编译，但是修改以后就不行了呢？</strong></p>
<p>打开发生错误的代码：<br>
<img src="/content/images/2020/08/Unity_Project_Tiny_error_04.png" alt="Unity_Project_Tiny_error_04"></p>
<p>这分明是Unity自带的代码啊。</p>
<p>仔细阅读一下，猜测好像是跟Unity Editor（也就是编辑器）的版本有关系。又看了一下我的Unity版本：<br>
2020.1.1f1c1</p>
<p><img src="/content/images/2020/08/Unity_Project_Tiny_error_02.png" alt="Unity_Project_Tiny_error_02"></p>
<p>把版本号 2020.1.1f1c1 代入到代码里……<br>
出错是显然的……</p>
<h3 id="">解决方法</h3>
<p>可能得换国际版了……<br>
下载国际版的方法是，手动下载，不通过Unity Hub，否则又自动下载中国版。</p>
<blockquote>
<p><a href="https://unity3d.com/get-unity/download/archive">https://unity3d.com/get-unity/download/archive</a></p>
</blockquote>
<p><img src="/content/images/2020/08/Unity_Project_Tiny_error_03.png" alt="Unity_Project_Tiny_error_03"></p>
<p><img src="/content/images/2020/08/Unity_Project_Tiny_error_06.png" alt="Unity_Project_Tiny_error_06"></p>
<p><strong>实测结果</strong>：国际版没有这个问题。</p>
<!--kg-card-end: markdown-->