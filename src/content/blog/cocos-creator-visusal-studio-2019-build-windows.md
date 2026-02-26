---
title: "#Cocos Creator# 正确使用Visual Studio Community 2019把Cocos Creator工程发布到Windows平台"
description: "怎样正确使用Visual Studio把Cocos Creator项目发布到Windows平台？"
pubDate: 2019-08-13T08:20:02.000Z
author: "阿斌"
tags: ["开发笔记", "cocos creator", "windows", "visual studio"]
draft: false
type: post
slug: "cocos-creator-visusal-studio-2019-build-windows"
---

<!--kg-card-begin: markdown--><h2 id="">问题背景</h2>
<p>Cocos Creator支持输出Windows平台，但是每个版本都只在特定的Visual Studio版本中做过兼容性测试。所以，最好是使用官方测试的VS版本打开工程，否则可能会遇到奇怪的问题。</p>
<p>比如，Cocos Creator 2.0.9 是在VS2017中测试的，所以，如果，你直接用Visual Studio Community 2019打开的话，会提示是否升级：</p>
<p><img src="/images/2019/08/CocosCreator-VS2019-upgrade.png" alt="CocosCreator-VS2019-upgrade"></p>
<p>如果选择升级的话，后边打包的时候，可能会遇到很多奇怪的错误，比如：</p>
<p><img src="/images/2019/08/CocosCreator-VS2019-Error.png" alt="CocosCreator-VS2019-Error"></p>
<h2 id="">费劲的解决方法</h2>
<p>通常遇到问题，我们的解决方法是，一个个错误去解决。</p>
<p>例如，对于这个错误:</p>
<pre><code>function: 不是 &quot;std&quot; 的成员
</code></pre>
<p>当然是可以通过一些方法来解决，比如添加</p>
<pre><code>#include &lt;functional&gt;
</code></pre>
<p>但是，除此之外，还有很多头疼的问题，不要问我怎么知道的……</p>
<p>有没有更快捷的解决方式呢？</p>
<h2 id="">快捷解决方式</h2>
<p>更快捷的方式是，启动时候，选择“<strong>不升级</strong>”，如图：</p>
<p><img src="/images/2019/08/CocosCreator-VS2019-do-not-upgrade.png" alt="CocosCreator-VS2019-do-not-upgrade"></p>
<p>如果还有错误，可以在项目属性里，手动选择：</p>
<ul>
<li>Windows SDK版本：10.0.17763.0</li>
<li>平台工具集：Visual Studio 2017 (v141)</li>
</ul>
<p><img src="/images/2019/08/CocosCreator-VS2019-upgrade-error-sdk-version.png" alt="CocosCreator-VS2019-upgrade-error-sdk-version"></p>
<h2 id="">参考</h2>
<ul>
<li><a href="http://forum.cocos.com/t/windows/77043">构建出来的windows版本编译不通过</a><br>
<a href="http://forum.cocos.com/t/windows/77043">http://forum.cocos.com/t/windows/77043</a></li>
</ul>
<!--kg-card-end: markdown-->