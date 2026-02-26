---
title: "#Unity# Unity 2019.2版本双击cs无法自动跳转的解决方法"
description: "Unity2019.2beta无法正常打开VSCode的一个解决方法"
pubDate: 2019-05-27T12:49:14.000Z
author: "阿斌"
tags: ["开发笔记", "Unity"]
draft: false
type: post
slug: "unity-unity-2019ban-ben-shuang-ji-cs"
---

<!--kg-card-begin: markdown--><!--kg-card-begin: markdown--><p>最新的Unity2019.2.0beta出了一个非常讨厌的大bug：双击脚本文件的时候，无法正常打开Visual Studio Code或者VS。有的用户甚至无法正常代码提示。</p>
<p>这是一件非常乌龙的事情。在Unity的官方论坛上，已经有不少用户在抱怨：</p>
<blockquote>
<p>Visual studio 2017 no longer opens in a13<br>
<a href="https://forum.unity.com/threads/visual-studio-2017-no-longer-opens-in-a13.668059">https://forum.unity.com/threads/visual-studio-2017-no-longer-opens-in-a13.668059</a></p>
</blockquote>
<p>在经过了各种折腾以后，最终找了2个解决方法：</p>
<ol>
<li>
<p>使用Rider<br>
Rider是JetBrain公司出的.Net的IDE。经测试发现，Rider可以与Unity2019.2正常工作。<br>
不过，这意味着：<br>
1). 你要放弃宇宙最强IDE VS<br>
2). 30天试用期结束后，你需要为Rider买单</p>
</li>
<li>
<p>是否继续使用VS的方案呢？<br>
当然是有，不然我也不会写这篇文章了。<br>
方法就是，在Unity Preference -&gt; External Tools -&gt; External Script Editor，选择Open by file extension<br>
<img src="/images/2019/05/Snip20190527_38.png" alt="Snip20190527_38"></p>
</li>
</ol>
<p>然后，你需要在操作系统中设置.cs文件的默认打开方式，我用的是VS Code。<br>
改用这种方式以后，双击.cs文件，就能正常在VS Code中打开了，而且双击错误信息时，也能跳转到正确的位置。</p>
<p>稍微不完美一点的地方是，每次打开一个文件时，都会在Unity的Console中报一个错误：</p>
<pre><code>Exception thrown while invoking [OnOpenAssetAttribute] method 'Unity.CodeEditor.CodeEditor:OnOpenAsset (int,int,int)' : Win32Exception: Cannot find the specified file
</code></pre>
<p><img src="/images/2019/05/Snip20190527_39.png" alt="Snip20190527_39"></p>
<p>不过，这个错误并不影响使用，直接Clear清除即可。</p>
<!--kg-card-end: markdown--><!--kg-card-end: markdown-->